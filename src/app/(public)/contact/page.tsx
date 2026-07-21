/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Mail, Phone, Instagram, Code2, MessageCircle } from "lucide-react";
import { BRAND_NAME, toAbsoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Mahila — for orders, AI Virtual Try-On support, or the team behind the site.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact Us | ${BRAND_NAME}`,
    description:
      "Get in touch with Mahila — for orders, AI Virtual Try-On support, or the team behind the site.",
    url: toAbsoluteUrl("/contact"),
  },
};

const generalContacts = [
  {
    icon: Mail,
    label: "AI Virtual Try-On Support",
    value: "aivirtualtryonmirror@gmail.com",
    href: "mailto:aivirtualtryonmirror@gmail.com",
  },
  {
    icon: Instagram,
    label: "Follow along",
    value: "@mahila_studio",
    href: "https://www.instagram.com/mahila_studio/",
  },
];

const developers = [
  {
    name: "Urooj Fatima",
    role: "Developer",
    phone: "+92 344 8302253",
    phoneHref: "tel:+923448302253",
    email: "urooj.fatim2004@gmail.com",
  },
  {
    name: "Muhammad Adnan Nasir",
    role: "Developer",
    phone: "+92 312 2386670",
    phoneHref: "tel:+923122386670",
    email: "adnasir607@gmail.com",
  },
];

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-olive-dark text-cream px-6 py-20 lg:py-[100px]">
        <div className="max-w-[760px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-cream/30 rounded-full px-4 py-1.5 text-[11px] tracking-[0.12em] uppercase text-sage mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
            Get in touch
          </div>
          <h1 className="font-serif text-3xl lg:text-[46px] leading-[1.15] mb-6">
            We&apos;d love to <span className="italic text-sage">hear from you</span>
          </h1>
          <p className="text-sm lg:text-base leading-relaxed text-[#d8dccb] max-w-[560px] mx-auto">
            Questions about an order, our AI Virtual Try-On, or the site
            itself — here&apos;s how to reach the right person.
          </p>
        </div>
      </section>

      {/* General contact */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-12 py-16 lg:py-20">
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <div className="text-[13px] tracking-[0.18em] uppercase text-olive-light mb-2.5">
            General inquiries
          </div>
          <h2 className="font-serif text-2xl lg:text-[32px] text-ink">
            Orders, support &amp; everything else
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-[820px] mx-auto">
          {generalContacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group bg-white border border-hairline p-7 flex items-start gap-4 transition-all duration-200 hover:border-olive/40 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-full bg-olive/10 flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-olive">
                <c.icon
                  className="h-4.5 w-4.5 text-olive transition-colors duration-200 group-hover:text-white"
                  strokeWidth={1.6}
                />
              </div>
              <div>
                <div className="text-[11px] tracking-[0.1em] uppercase text-ink/45 mb-1.5">
                  {c.label}
                </div>
                <div className="text-sm font-medium text-ink break-all">
                  {c.value}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Developers */}
      <section className="bg-tint-1 px-6 py-16 lg:py-20">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center max-w-[640px] mx-auto mb-14">
            <div className="text-[13px] tracking-[0.18em] uppercase text-olive-light mb-2.5">
              Behind the site
            </div>
            <h2 className="font-serif text-2xl lg:text-[32px] text-ink mb-4">
              Meet the developers
            </h2>
            <p className="text-sm text-ink/60 leading-relaxed max-w-[520px] mx-auto">
              Mahila and its AI Virtual Try-On experience are built and
              maintained by this team — reach out directly for anything
              technical.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-[820px] mx-auto">
            {developers.map((dev) => (
              <div
                key={dev.name}
                className="bg-white border border-hairline p-7 lg:p-8"
              >
                <div className="w-11 h-11 rounded-full bg-olive/10 flex items-center justify-center mb-5">
                  <Code2 className="h-4.5 w-4.5 text-olive" strokeWidth={1.6} />
                </div>
                <div className="text-[11px] tracking-[0.1em] uppercase text-olive-light mb-1.5">
                  {dev.role}
                </div>
                <div className="font-serif text-xl text-ink mb-4">
                  {dev.name}
                </div>
                <div className="flex flex-col gap-2.5 text-sm">
                  <a
                    href={dev.phoneHref}
                    className="inline-flex items-center gap-2.5 text-ink/70 hover:text-olive transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5" strokeWidth={1.6} />
                    {dev.phone}
                  </a>
                  <a
                    href={`mailto:${dev.email}`}
                    className="inline-flex items-center gap-2.5 text-ink/70 hover:text-olive transition-colors break-all"
                  >
                    <Mail className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.6} />
                    {dev.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 lg:py-[90px] text-center">
        <div className="max-w-[560px] mx-auto">
          <MessageCircle className="h-6 w-6 text-olive mx-auto mb-5" strokeWidth={1.6} />
          <h2 className="font-serif text-2xl lg:text-[30px] text-ink mb-4">
            Still have a question?
          </h2>
          <p className="text-sm text-ink/60 leading-relaxed mb-8">
            Drop us a line at{" "}
            <a
              href="mailto:aivirtualtryonmirror@gmail.com"
              className="text-olive hover:underline"
            >
              aivirtualtryonmirror@gmail.com
            </a>{" "}
            and we&apos;ll get back to you shortly.
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
