import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
// A single fast status check — well under any free-tier limit.
export const maxDuration = 30;

// Poll a RunPod job by id. The browser calls this every few seconds until the
// job COMPLETEs (then we return the result image) or fails.
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "Missing job id" }, { status: 400 });
  }

  const endpoint = process.env.RUNPOD_TRYON_ENDPOINT_ID;
  const apiKey = process.env.RUNPOD_API_KEY;
  if (!endpoint || !apiKey) {
    return NextResponse.json({ message: "Try-on backend not configured." }, { status: 503 });
  }

  try {
    const rp = await fetch(`https://api.runpod.ai/v2/${endpoint}/status/${id}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    });
    const data = await rp.json();
    const status = data?.status;
    const out = data?.output ?? {};

    if (status === "COMPLETED") {
      const result_b64 = out.result_b64 || out.image_b64 || out.result;
      if (!result_b64) {
        return NextResponse.json({ status, message: "No image returned by AI service", detail: data }, { status: 502 });
      }
      const dataUrl = result_b64.startsWith("data:") ? result_b64 : `data:image/jpeg;base64,${result_b64}`;
      return NextResponse.json({ status, result: dataUrl });
    }

    if (status === "FAILED" || status === "CANCELLED" || status === "TIMED_OUT") {
      return NextResponse.json(
        { status, message: out.error || data?.error || `Try-on job ${String(status).toLowerCase()}`, detail: data },
        { status: 502 },
      );
    }

    // IN_QUEUE / IN_PROGRESS — keep polling.
    return NextResponse.json({ status: status || "IN_QUEUE" });
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Status check failed" },
      { status: 500 },
    );
  }
}
