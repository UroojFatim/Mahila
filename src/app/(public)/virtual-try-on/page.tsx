/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Upload,
  Sparkles,
  Eye,
  ShieldCheck,
  RotateCcw,
  Layers,
  Cpu,
  Puzzle,
  ImageOff,
  Globe2,
  Users,
  Mail,
} from "lucide-react";
import { BRAND_NAME, toAbsoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Virtual Try-On",
  description:
    "Why Mahila built AI Virtual Try-On — an AI model that renders complete Pakistani eastern-wear outfits on you, before you buy.",
  alternates: { canonical: "/virtual-try-on" },
  openGraph: {
    title: `AI Virtual Try-On | ${BRAND_NAME}`,
    description:
      "Why Mahila built AI Virtual Try-On — an AI model that renders complete Pakistani eastern-wear outfits on you, before you buy.",
    url: toAbsoluteUrl("/virtual-try-on"),
  },
};

const pipeline = [
  {
    icon: Upload,
    title: "You tap Try On",
    body: "From any product page, upload one clear photo of yourself.",
  },
  {
    icon: Cpu,
    title: "Our AI gets to work",
    body: "Your photo and the outfit are sent to a model we fine-tuned specifically on Pakistani eastern wear — built on IDM-VTON, trained on our own dataset of two- and three-piece outfits.",
  },
  {
    icon: Layers,
    title: "The full outfit is rendered on you",
    body: "Not one garment stitched onto a photo — the kameez, trousers and drape are generated together as one coherent outfit.",
  },
  {
    icon: Eye,
    title: "You see it, then decide",
    body: "The result appears right in the try-on window, ready to compare, download, or share before you add to cart.",
  },
];

const stats = [
  { value: "80–90%", label: "Rendering accuracy in our latest testing" },
  { value: "1,500+", label: "Paired training images, and growing" },
  { value: "2–3 min", label: "Typical render time once the model is warm" },
  { value: "Live", label: "Running in production on Mahila today" },
];

const roadmap = [
  {
    icon: Puzzle,
    title: "Plug-and-play widget",
    body: "For any e-commerce storefront",
  },
  {
    icon: ImageOff,
    title: "No flat-lay required",
    body: "Support for brands without clean flat-lay product shots",
  },
  {
    icon: Globe2,
    title: "Beyond Mahila",
    body: "Expansion to other eastern-wear brands",
  },
  {
    icon: Users,
    title: "Wider testing",
    body: "Across more body types and sizes",
  },
];

const journey = [
  {
    label: "Live on Mahila",
    desc: "AI Virtual Try-On running in production",
    state: "done" as const,
  },
  {
    label: "Widget in development",
    desc: "Plug-and-play for any storefront",
    state: "current" as const,
  },
  {
    label: "B2B SaaS platform",
    desc: "Serving eastern-wear brands beyond Mahila",
    state: "next" as const,
  },
];

const results = Array.from({ length: 19 }, (_, i) => {
  const n = i + 1;
  return {
    src: `/tryon-results/${n}.jpeg`,
    alt: `AI Virtual Try-On result ${n} — outfit rendered on an uploaded photo`,
    caption: `Try-On Result ${n}`,
  };
});

export default function VirtualTryOnPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-olive-dark text-cream px-6 py-20 lg:py-[100px]">
        <div className="max-w-[760px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-cream/30 rounded-full px-4 py-1.5 text-[11px] tracking-[0.12em] uppercase text-sage mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
            Live on Mahila &nbsp;·&nbsp; Still actively in development
          </div>
          <h1 className="font-serif text-3xl lg:text-[46px] leading-[1.15] mb-6">
            See it on you, <span className="italic text-sage">before you buy</span>
          </h1>
          <p className="text-sm lg:text-base leading-relaxed text-[#d8dccb] max-w-[560px] mx-auto">
            Mahila exists to showcase something we built ourselves: an AI
            Virtual Try-On model designed for Pakistani and South Asian
            eastern wear — outfits no existing try-on tool was built to
            handle.
          </p>
        </div>
      </section>

      {/* The problem */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16">
          <div>
            <div className="font-serif text-5xl lg:text-6xl text-olive leading-none mb-3">
              20–40%
            </div>
            <p className="text-xs uppercase tracking-[0.1em] text-ink/50">
              of apparel bought online is returned — fit and appearance are
              the leading reasons
            </p>
          </div>
          <div>
            <div className="text-[13px] tracking-[0.18em] uppercase text-olive-light mb-3">
              Why this exists
            </div>
            <h2 className="font-serif text-2xl lg:text-[30px] text-ink mb-5 leading-[1.2]">
              Buying eastern wear online is still a guessing game
            </h2>
            <p className="text-[15px] leading-relaxed text-ink/60 mb-4 max-w-[640px]">
              A kameez, trouser and dupatta rarely read as separate pieces —
              they have to work as one outfit, on one body. Product photos on
              a model tell you very little about how that same outfit will
              actually sit on you. Every existing virtual try-on tool was
              built for Western retail: a single garment, on a standard pose,
              with a clean flat-lay photo to work from. Pakistani brands
              publish on-model photography almost exclusively, and outfits
              are rarely just one piece — so none of those tools transfer.
            </p>
            <p className="text-[15px] leading-relaxed text-ink/60 max-w-[640px]">
              That gap is expensive for everyone: shoppers lose trust in
              online eastern wear, and brands absorb the cost of returns that
              often can&apos;t be resold as new. We built AI Virtual Try-On
              to close it.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-tint-1 px-6 py-16 lg:py-20">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center max-w-[640px] mx-auto mb-14">
            <div className="text-[13px] tracking-[0.18em] uppercase text-olive-light mb-2.5">
              How it works
            </div>
            <h2 className="font-serif text-2xl lg:text-[32px] text-ink">
              From your photo to a full outfit render
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-16 items-center">
            {/* Timeline */}
            <div>
              {pipeline.map((step, i) => (
                <div key={step.title} className="relative flex gap-5">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full border border-olive bg-white flex items-center justify-center relative z-10">
                      <step.icon className="h-5 w-5 text-olive" strokeWidth={1.6} />
                    </div>
                    {i < pipeline.length - 1 && (
                      <div className="w-px flex-1 bg-olive/25 my-1.5" />
                    )}
                  </div>
                  <div className={i < pipeline.length - 1 ? "pb-9" : ""}>
                    <div className="text-[11px] tracking-[0.1em] uppercase text-ink/40 mb-1.5">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="font-serif text-lg text-ink mb-1.5 leading-snug">
                      {step.title}
                    </div>
                    <div className="text-[13px] text-ink/60 leading-relaxed max-w-[440px]">
                      {step.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Proof: real render stack */}
            <div className="relative hidden lg:block h-[360px]">
              <div className="absolute top-0 right-0 w-full max-w-[420px] aspect-[27/10] -rotate-3 shadow-xl border-[6px] border-white bg-white">
                <img
                  src="/tryon-results/7.jpeg"
                  alt="AI Virtual Try-On result example"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full max-w-[420px] aspect-[27/10] rotate-2 shadow-xl border-[6px] border-white bg-white">
                <img
                  src="/tryon-results/14.jpeg"
                  alt="AI Virtual Try-On result example"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-olive-dark text-cream text-[11px] tracking-[0.1em] uppercase px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg z-10">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={1.6} />
                AI Rendered
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-12 py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-3xl lg:text-4xl text-olive mb-2">
                {s.value}
              </div>
              <div className="text-[12px] leading-relaxed text-ink/55 max-w-[180px] mx-auto">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why it matters — trust & returns */}
      <section className="bg-olive-dark text-cream px-6 py-16 lg:py-20">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="text-[13px] tracking-[0.14em] uppercase text-sage mb-3">
              Why we built it this way
            </div>
            <h3 className="font-serif italic text-2xl lg:text-[28px] mb-4">
              Built for trust, not just novelty
            </h3>
            <p className="text-sm lg:text-[15px] leading-relaxed text-[#d8dccb] max-w-[520px]">
              This isn&apos;t a gimmick — it&apos;s how we want online eastern
              wear to work. When shoppers can see an outfit on themselves
              first, they buy with more confidence and return less. That&apos;s
              better for the customer, and better for every small brand that
              can&apos;t absorb high return costs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full border border-cream/40 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-4 w-4 text-cream" strokeWidth={1.6} />
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Builds trust</div>
                <div className="text-xs text-[#d8dccb] leading-relaxed">
                  Fewer surprises when the order arrives.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full border border-cream/40 flex items-center justify-center flex-shrink-0">
                <RotateCcw className="h-4 w-4 text-cream" strokeWidth={1.6} />
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Cuts returns</div>
                <div className="text-xs text-[#d8dccb] leading-relaxed">
                  Fit and drape are checked before checkout, not after.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results gallery */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-12 py-16 lg:py-20">
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <div className="text-[13px] tracking-[0.18em] uppercase text-olive-light mb-2.5">
            See it in action
          </div>
          <h2 className="font-serif text-2xl lg:text-[32px] text-ink">
            Real Try-On Results
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {results.map((r) => (
            <figure key={r.src} className="bg-white border border-hairline p-3">
              <img
                src={r.src}
                alt={r.alt}
                loading="lazy"
                className="w-full h-auto"
              />
              <figcaption className="text-[12px] text-ink/50 text-center pt-3">
                {r.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Roadmap: SaaS widget */}
      <section className="bg-tint-1 px-6 py-16 lg:py-20">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 border border-olive/30 rounded-full px-4 py-1.5 text-[11px] tracking-[0.12em] uppercase text-olive mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-olive animate-pulse" />
                Currently in development
              </div>
              <h2 className="font-serif text-2xl lg:text-[32px] text-ink mb-5 leading-[1.2]">
                Next: a Try-On widget any brand can install
              </h2>
              <p className="text-[15px] leading-relaxed text-ink/60 mb-4 max-w-[520px]">
                Mahila is where we&apos;re proving this works end to end, on a
                real storefront, with real customers. The next step is
                packaging the same technology into a plug-and-play widget that
                any small independent fashion brand can drop into their own
                store — no engineering team required.
              </p>
              <p className="text-[15px] leading-relaxed text-ink/60 max-w-[520px] mb-8">
                Over time, that widget is the foundation for a B2B SaaS
                product serving eastern-wear brands beyond Mahila. We&apos;re
                actively building this right now — this page will grow as it
                does.
              </p>

              <div className="bg-olive-dark text-cream p-6 lg:p-7 max-w-[480px]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-cream/40 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-cream" strokeWidth={1.6} />
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1.5">
                      Interested in an early pilot?
                    </div>
                    <p className="text-xs text-[#d8dccb] leading-relaxed mb-3">
                      We&apos;re taking on a small number of brands to pilot
                      the widget before wider release.
                    </p>
                    <a
                      href="mailto:aivirtualtryonmirror@gmail.com"
                      className="inline-block text-[12px] tracking-[0.08em] uppercase border border-cream/50 px-4 py-2 hover:bg-cream hover:text-olive-dark transition-colors"
                    >
                      aivirtualtryonmirror@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-hairline p-8 lg:p-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                <div className="text-[13px] tracking-[0.1em] uppercase text-ink/50">
                  On the roadmap
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roadmap.map((item, i) => (
                  <div
                    key={item.title}
                    className="group relative bg-tint-1 border border-hairline p-5 transition-all duration-200 hover:border-olive/40 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <span className="absolute top-3 right-3 text-[10px] tracking-[0.1em] text-ink/25 font-medium">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-olive/10 flex items-center justify-center mb-4 transition-colors duration-200 group-hover:bg-olive group-hover:text-white">
                      <item.icon
                        className="h-4 w-4 text-olive transition-colors duration-200 group-hover:text-white"
                        strokeWidth={1.6}
                      />
                    </div>
                    <div className="text-sm font-medium text-ink mb-1.5">
                      {item.title}
                    </div>
                    <div className="text-xs text-ink/55 leading-relaxed">
                      {item.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Journey stepper */}
          <div className="mt-14 pt-10 border-t border-olive/15">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-0">
              {journey.map((stage, i) => (
                <React.Fragment key={stage.label}>
                  <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2.5 flex-1">
                    <span
                      className={
                        "h-2.5 w-2.5 rounded-full flex-shrink-0 " +
                        (stage.state === "next"
                          ? "bg-olive/25"
                          : stage.state === "current"
                          ? "bg-olive animate-pulse"
                          : "bg-olive")
                      }
                    />
                    <div>
                      <div
                        className={
                          "text-sm font-medium " +
                          (stage.state === "next" ? "text-ink/40" : "text-ink")
                        }
                      >
                        {stage.label}
                      </div>
                      <div className="text-xs text-ink/50 leading-relaxed">
                        {stage.desc}
                      </div>
                    </div>
                  </div>
                  {i < journey.length - 1 && (
                    <div className="hidden sm:block flex-1 h-px bg-olive/20 mx-4" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 lg:py-[90px] text-center">
        <div className="max-w-[560px] mx-auto">
          <Sparkles className="h-6 w-6 text-olive mx-auto mb-5" strokeWidth={1.6} />
          <h2 className="font-serif text-2xl lg:text-[30px] text-ink mb-4">
            Try it on a Mahila piece
          </h2>
          <p className="text-sm text-ink/60 leading-relaxed mb-8">
            Open any product page and look for &ldquo;Try It On&rdquo; to see
            AI Virtual Try-On for yourself.
          </p>
          <Link
            href="/all-products"
            className="inline-block bg-ink text-cream px-9 py-3.5 text-[13px] tracking-[0.08em] uppercase transition-transform hover:scale-[1.03]"
          >
            Shop the Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
