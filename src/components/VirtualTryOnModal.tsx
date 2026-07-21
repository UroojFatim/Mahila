/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Upload, Sparkles, Download, Loader2, Clock } from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  garmentUrl: string;
  productTitle?: string;
};

const VirtualTryOnModal = ({ open, onOpenChange, garmentUrl, productTitle }: Props) => {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [serviceDownOpen, setServiceDownOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const personPreview = uploadPreview;

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    setUploadFile(f);
    setUploadPreview(URL.createObjectURL(f));
    setResult("");
  };

  const clearUpload = () => {
    setUploadFile(null);
    setUploadPreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const runTryOn = async () => {
    if (!garmentUrl) {
      toast.error("No product image available for try-on.");
      return;
    }
    if (!uploadFile) {
      toast.error("Please upload your photo first.");
      return;
    }
    setLoading(true);
    setResult("");
    setStatusMsg("Submitting…");
    try {
      const fd = new FormData();
      fd.append("garmentUrl", garmentUrl);
      fd.append("personFile", uploadFile);

      // 1) Submit the job (fast) — returns a job id.
      const res = await fetch("/api/tryon", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data?.jobId) {
        throw new Error(data?.message || "Try-on failed. Please try again.");
      }

      // 2) Poll until the GPU finishes. Generous timeout to cover a cold start.
      const jobId: string = data.jobId;
      const startedAt = Date.now();
      const TIMEOUT_MS = 15 * 60 * 1000; // 15 min
      setStatusMsg("Waiting for a GPU…");

      // eslint-disable-next-line no-constant-condition
      while (true) {
        await new Promise((r) => setTimeout(r, 4000));
        if (Date.now() - startedAt > TIMEOUT_MS) {
          throw new Error("Timed out waiting for the GPU. Please try again.");
        }

        const sres = await fetch(`/api/tryon/status?id=${encodeURIComponent(jobId)}`);
        const sdata = await sres.json();

        if (sdata?.status === "COMPLETED" && sdata?.result) {
          setResult(sdata.result);
          break;
        }
        if (!sres.ok || ["FAILED", "CANCELLED", "TIMED_OUT"].includes(sdata?.status)) {
          throw new Error(sdata?.message || "Try-on failed. Please try again.");
        }

        const elapsed = Math.floor((Date.now() - startedAt) / 1000);
        setStatusMsg(
          sdata?.status === "IN_PROGRESS"
            ? `Generating your try-on… (${elapsed}s)`
            : `Warming up the GPU — first run can take a few minutes… (${elapsed}s)`,
        );
      }
    } catch (err) {
      console.error(err);
      setServiceDownOpen(true);
    } finally {
      setLoading(false);
      setStatusMsg("");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-3xl max-h-[92vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-5 sm:p-6 shadow-xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-300">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="flex items-center gap-2 text-lg sm:text-xl font-bold text-[#861010]">
                 AI Virtual Mirror
              </Dialog.Title>
              <Dialog.Description className="text-xs sm:text-sm text-gray-500 mt-1">
                Upload your photo to see {productTitle ? `"${productTitle}"` : "this outfit"} worn on you.
              </Dialog.Description>
            </div>
            <Dialog.Close className="rounded-full p-1 text-gray-500 hover:bg-gray-100" aria-label="Close">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          {/* Upload photo */}
          <div className="mt-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:border-[#861010] hover:text-[#861010]"
              >
                <Upload className="h-4 w-4" /> Upload your photo
              </button>
              {uploadFile && (
                <span className="text-xs text-gray-500">
                  {uploadFile.name} ·{" "}
                  <button onClick={clearUpload} className="underline hover:text-[#861010]">remove</button>
                </span>
              )}
              <input ref={fileRef} type="file" accept="image/*" onChange={onPick} className="hidden" />
            </div>
          </div>

          {/* Preview row: person | garment | result */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            <figure className="text-center">
              <div className="relative h-72 w-full rounded-lg bg-gray-50 overflow-hidden flex items-center justify-center">
                {personPreview ? (
                  <img src={personPreview} alt="You" className="h-full w-full object-contain" />
                ) : (
                  <span className="text-xs text-gray-400 px-2 text-center">Upload your photo to preview</span>
                )}
              </div>
              <figcaption className="mt-1 text-xs text-gray-500">Your photo</figcaption>
            </figure>
            <figure className="text-center">
              <img src={garmentUrl} alt="Garment" className="h-72 w-full rounded-lg object-contain bg-gray-50" />
              <figcaption className="mt-1 text-xs text-gray-500">Outfit</figcaption>
            </figure>
            <figure className="text-center">
              <div className="relative h-72 w-full rounded-lg bg-gray-50 overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-2 text-gray-500 px-2 text-center"
                    >
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span className="text-xs">{statusMsg || "Generating…"}</span>
                    </motion.div>
                  ) : result ? (
                    <motion.img
                      key="result"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      src={result}
                      alt="Try-on result"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span key="empty" className="text-xs text-gray-400 px-2 text-center">Your try-on result appears here</span>
                  )}
                </AnimatePresence>
              </div>
              <figcaption className="mt-1 text-xs text-gray-500">Result</figcaption>
            </figure>
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.03 }}
              whileTap={{ scale: loading ? 1 : 0.97 }}
              onClick={runTryOn}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#861010] px-5 py-3 text-sm font-bold text-white shadow hover:bg-[#6e0d0d] disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {loading ? "Generating…" : "Try It On"}
            </motion.button>
            {result && (
              <a
                href={result}
                download={`tryon-${(productTitle || "outfit").replace(/\s+/g, "-").toLowerCase()}.jpg`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:border-gray-500"
              >
                <Download className="h-4 w-4" /> Download
              </a>
            )}
          </div>

          <p className="mt-3 text-[11px] leading-snug text-gray-400">
            AI-generated preview for illustration. Actual fit and colour may vary.
          </p>
        </Dialog.Content>
      </Dialog.Portal>

      {/* AI service unavailable notice */}
      <Dialog.Root open={serviceDownOpen} onOpenChange={setServiceDownOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[60] w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <Dialog.Title className="mt-4 text-base font-bold text-gray-900">
                AI Virtual Mirror Temporarily Unavailable
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-relaxed text-gray-500">
                Our AI try-on runs on compute that&apos;s billed by the hour, so it&apos;s only active during scheduled
                windows to keep costs in check. It&apos;s offline right now — please check back a little later.
              </Dialog.Description>
              <Dialog.Close asChild>
                <button className="mt-5 w-full rounded-lg bg-[#861010] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#6e0d0d]">
                  Got it
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Dialog.Root>
  );
};

export default VirtualTryOnModal;
