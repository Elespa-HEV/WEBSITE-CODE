"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const pressItems = [
  {
    publication: "The Hindu BusinessLine",
    logo: "/assets/businessline_logo_white.svg",
    headline: "Pune startup bets on ₹60,000 hybrid retrofit, undercutting ₹9 lakh Kawasaki bikes",
    strap: "ELESPA HEV's affordable retrofitting kits promise to bring hybrid mobility to India's massive petrol two-wheeler market at a fraction of the cost.",
    url: "https://www.thehindubusinessline.com/companies/pune-startup-bets-on-60000-hybrid-retrofit-undercutting-9-lakh-kawasaki-bikes/article70796022.ece",
  },
  {
    publication: "ZigWheels",
    logo: "/assets/zigwheels_logo_white.svg",
    headline: "Exclusive: Pune-based Startup Creates India's First Hybrid Scooter",
    strap: "ELESPA's patented plug-in parallel hybrid technology allows seamless switching between electric, hybrid, and petrol modes on a single throttle.",
    url: "https://www.zigwheels.com/news-features/general-news/exclusive-pune-based-startup-creates-indias-first-hybrid-scooter/49049/",
  },
];

export default function InTheMedia() {
  return (
    <section id="media" className="bg-[#0a0a0c] text-white relative overflow-hidden pt-10 lg:pt-12 pb-12 lg:pb-16">
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[var(--accent-yellow)] text-[11px] font-bold tracking-[0.2em] uppercase mb-4 inline-block"
            >
              Press Coverage
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight"
            >
              In The Media
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-[14px] max-w-xs text-left md:text-right"
          >
            What leading publications are saying about ELESPA&apos;s hybrid revolution.
          </motion.p>
        </div>

        {/* Press Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pressItems.map((item, i) => (
            <motion.a
              key={item.publication}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative block rounded-2xl border border-white/[0.06] hover:border-[var(--accent-yellow)]/20 bg-white/[0.02] hover:bg-white/[0.04] p-8 lg:p-10 transition-all duration-500"
            >
              {/* Publication logo */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center h-8">
                  <img
                    src={item.logo}
                    alt={`${item.publication} logo`}
                    className="h-6 md:h-7 w-auto object-contain"
                  />
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-white/20 group-hover:text-[var(--accent-yellow)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>

              {/* Headline */}
              <h3 className="font-display font-bold text-xl md:text-2xl text-white leading-snug mb-4 group-hover:text-[var(--accent-yellow)] transition-colors duration-300">
                &ldquo;{item.headline}&rdquo;
              </h3>

              {/* Strap */}
              <p className="text-white/40 text-[14px] leading-relaxed mb-6">
                {item.strap}
              </p>

              {/* Read more */}
              <span className="inline-flex items-center gap-2 text-[var(--accent-yellow)] text-[13px] font-bold tracking-wide">
                Read More
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
