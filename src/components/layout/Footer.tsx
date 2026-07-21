"use client";

import React from "react";
import { Instagram } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

const Footer = () => {
  return (
    <footer className="bg-ink text-[#c9c9c1] mt-10 sm:mt-14">
      <StaggerGroup
        stagger={0.1}
        amount={0.15}
        className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-12 py-14 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 lg:gap-12"
      >
        {/* Logo & Description */}
        <StaggerItem className="space-y-5">
          <img
            src="/mahila-logo.png"
            alt="Mahila"
            className="h-14 w-auto object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="text-sm leading-relaxed max-w-[280px] text-[#9b9b92]">
            Timeless grace, crafted for every moment — considered womenswear
            designed in small seasonal batches.
          </p>
        </StaggerItem>

        {/* Shop */}
        <StaggerItem>
          <h3 className="text-xs font-medium uppercase tracking-[0.08em] text-cream mb-4">
            Shop
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link href="/all-products" className="hover:text-white transition-colors">
                Kalaam Collection
              </Link>
            </li>
            <li>
              <Link href="/all-products" className="hover:text-white transition-colors">
                Luxury Collection
              </Link>
            </li>
            <li>
              <Link href="/all-products" className="hover:text-white transition-colors">
                Semi Formal Collection
              </Link>
            </li>
            <li>
              <Link href="/all-products" className="hover:text-white transition-colors">
                Virasal Collection
              </Link>
            </li>
          </ul>
        </StaggerItem>

        {/* Help */}
        <StaggerItem>
          <h3 className="text-xs font-medium uppercase tracking-[0.08em] text-cream mb-4">
            Help
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Shipping &amp; Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Size Guide
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Track Order
              </a>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </StaggerItem>

        {/* Contact */}
        <StaggerItem>
          <h3 className="text-xs font-medium uppercase tracking-[0.08em] text-cream mb-4">
            Contact
          </h3>
          <div className="flex flex-col gap-2.5 text-sm text-[#9b9b92]">
            <a
              href="mailto:aivirtualtryonmirror@gmail.com"
              className="hover:text-white transition-colors"
            >
              aivirtualtryonmirror@gmail.com
            </a>
            <Link
              href="https://www.instagram.com/mahila_studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all"
            >
              <Instagram className="w-4 h-4" />
              @mahila_studio
            </Link>
          </div>
        </StaggerItem>
      </StaggerGroup>

      <Reveal direction="fade" className="border-t border-[#333]">
        <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-12 py-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-[#7a7a72]">
          <span>© 2026 Mahila. All rights reserved.</span>
          <span>
            Made for those who dress with intention.
          </span>
        </div>
      </Reveal>
    </footer>
  );
};

export default Footer;
