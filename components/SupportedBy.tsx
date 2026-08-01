"use client";

import React from "react";
import { motion } from "framer-motion";

const supporters = [
  { name: "ARAI", logo: "/assets/WhatsApp Image 2026-04-10 at 2.15.31 PM.jpeg" },
  { name: "ARAI-AMTIF", logo: "/assets/WhatsApp Image 2026-04-10 at 2.16.24 PM.jpeg" },
  { name: "JADE Incubation Centre", logo: "/assets/jade.jpeg" },
  { name: "BHAU Incubation Centre", logo: "/assets/bhaulogo.jpeg" },
  { name: "JSCOE", logo: "/assets/WhatsApp Image 2026-04-10 at 2.18.53 PM.jpeg" },
  { name: "Startup India", logo: "/assets/WhatsApp Image 2026-04-10 at 2.19.54 PM.jpeg" },
  { name: "DPIIT", logo: "/assets/img1.jpeg" },
  { name: "MSME", logo: "/assets/img2jpeg.jpeg" },
  { name: "MSINS", logo: null },
  { name: "CII-ZIP Start", logo: null },
];

export default function SupportedBy() {
  return (
    <section id="supported-by" className="bg-[#FAFAFA] text-[#0A0A0A] relative overflow-hidden py-16 lg:py-24 scroll-mt-20">
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--accent-yellow)] text-[14px] md:text-[16px] font-bold tracking-[0.1em] uppercase mb-4 inline-block"
          >
            Backed By The Best
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl md:text-5xl tracking-tight text-[#0A0A0A]"
          >
            Supported By
          </motion.h2>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 max-w-7xl mx-auto px-4 md:px-0">
          {supporters.map((supporter, i) => (
            <motion.div
              key={supporter.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative bg-white rounded-3xl border border-gray-200 hover:border-[var(--accent-yellow)]/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center p-8 md:p-10 h-40 md:h-48 overflow-hidden"
            >
              {supporter.logo ? (
                <img
                  src={supporter.logo}
                  alt={`${supporter.name} logo — ELESPA HEV supporter`}
                  className="w-[60%] max-h-[60%] object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:scale-105"
                />
              ) : (
                <span className="text-[14px] font-bold text-[#525252] group-hover:text-[#0A0A0A] transition-colors tracking-wide text-center leading-snug">
                  {supporter.name}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
