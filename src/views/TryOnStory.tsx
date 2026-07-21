import React from "react";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon } from "lucide-react";

const points = [
  "Online eastern-wear shopping is guesswork — outfits rarely look the way they did in the photos.",
  "Two- and three-piece festive wear is the hardest to judge from a photo, which is why apparel returns run 20–40% industry-wide.",
  "So we built AI Virtual Try-On: upload your photo, see the full outfit rendered on you before you buy.",
  "Less guessing for you, fewer returns for us — and next, a plug-and-play version of this for other small brands.",
];

const TryOnStory = () => {
  return (
    <section
      id="try-on"
      className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-12 py-16 lg:py-[90px] scroll-mt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: why we built Mahila, in bullets */}
        <div>
          <div className="text-[13px] tracking-[0.18em] uppercase text-olive-light mb-4">
            Why We Built Mahila
          </div>
          <h2 className="font-serif text-2xl lg:text-[34px] text-ink mb-6 leading-[1.2]">
            AI Virtual Try-On
          </h2>
          <ul className="space-y-4 mb-8">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-olive flex-shrink-0" />
                <span className="text-[15px] leading-relaxed text-ink/65">
                  {point}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/virtual-try-on"
            className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase text-ink border-b border-ink pb-1 hover:text-olive hover:border-olive transition-colors"
          >
            See the Full Story &amp; More Results
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
          </Link>
        </div>

        {/* Right: one result image */}
        <div>
          <div className="aspect-[3/4] bg-tint-1 flex flex-col items-center justify-center gap-2">
            <ImageIcon className="h-6 w-6 text-ink/25" strokeWidth={1.4} />
            <span className="text-[11px] tracking-[0.06em] uppercase text-ink/35">
              Result coming soon
            </span>
          </div>
          <div className="text-[11px] tracking-[0.06em] uppercase text-ink/40 mt-3 text-center">
            An AI Virtual Try-On result
          </div>
        </div>
      </div>
    </section>
  );
};

export default TryOnStory;
