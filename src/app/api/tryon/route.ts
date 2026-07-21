import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
// This route only SUBMITS the job (async) and returns fast — the browser then
// polls /api/tryon/status. That keeps every request short, so it fits inside
// free-tier serverless limits (e.g. Vercel Hobby's 60s cap). 60s is plenty to
// read the garment image + submit.
export const maxDuration = 60;

const PUBLIC_DIR = path.join(process.cwd(), "public");
const PRESET_DIR = path.join(PUBLIC_DIR, "tryon-models");

async function readPresetB64(presetId: string): Promise<string> {
  // whitelist: only a bare filename like "model1.jpg"
  const safe = path.basename(presetId);
  if (!/^model[0-9]+\.(jpe?g|png)$/i.test(safe)) {
    throw new Error("Invalid model selection");
  }
  const buf = await fs.readFile(path.join(PRESET_DIR, safe));
  return buf.toString("base64");
}

// Resolve the garment image to base64 WITHOUT self-fetching the dev server
// (which deadlocks Next dev). Inventory images come from MongoDB; static files
// from disk; only genuinely external URLs are fetched over HTTP.
async function getGarmentB64(garmentUrl: string): Promise<string> {
  const invMatch = garmentUrl.match(/\/api\/inventory\/images\/([a-f0-9]{24})/i);
  if (invMatch) {
    const db = await getDatabase();
    const doc = await db.collection("uploaded_images").findOne({ _id: new ObjectId(invMatch[1]) });
    if (!doc?.base64Data) throw new Error("Product image not found");
    return doc.base64Data.split(",")[1] || doc.base64Data;
  }
  if (garmentUrl.startsWith("/")) {
    const safeRel = path.normalize(garmentUrl).replace(/^([/\\])+/, "");
    const buf = await fs.readFile(path.join(PUBLIC_DIR, safeRel));
    return buf.toString("base64");
  }
  const r = await fetch(garmentUrl);
  if (!r.ok) throw new Error("Could not load product image");
  return Buffer.from(await r.arrayBuffer()).toString("base64");
}

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const garmentUrl = (form.get("garmentUrl") as string) || "";
    const presetId = (form.get("presetId") as string) || "";
    const personFile = form.get("personFile") as File | null;

    if (!garmentUrl) {
      return NextResponse.json({ message: "Missing product image" }, { status: 400 });
    }

    // person base64 (uploaded file takes priority over preset)
    let person_b64: string;
    if (personFile && typeof personFile.arrayBuffer === "function") {
      person_b64 = Buffer.from(await personFile.arrayBuffer()).toString("base64");
    } else if (presetId) {
      person_b64 = await readPresetB64(presetId);
    } else {
      return NextResponse.json({ message: "Choose a model or upload a photo" }, { status: 400 });
    }

    const garment_b64 = await getGarmentB64(garmentUrl);

    const endpoint = process.env.RUNPOD_TRYON_ENDPOINT_ID;
    const apiKey = process.env.RUNPOD_API_KEY;

    if (!endpoint || !apiKey) {
      return NextResponse.json(
        { message: "Try-on backend not configured (set RUNPOD_TRYON_ENDPOINT_ID and RUNPOD_API_KEY)." },
        { status: 503 },
      );
    }

    // Submit the job asynchronously (RunPod /run) and return the job id.
    // The browser polls /api/tryon/status?id=<jobId> until it completes.
    const rp = await fetch(`https://api.runpod.ai/v2/${endpoint}/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ input: { person_b64, garment_b64, category: "dresses", steps: 30 } }),
    });
    const data = await rp.json();
    if (!rp.ok || !data?.id) {
      return NextResponse.json({ message: data?.error || "AI service error", detail: data }, { status: 502 });
    }
    return NextResponse.json({ jobId: data.id, status: data.status || "IN_QUEUE" });
  } catch (err) {
    console.error("tryon error:", err);
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Try-on failed" },
      { status: 500 },
    );
  }
}
