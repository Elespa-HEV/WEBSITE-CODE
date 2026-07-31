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
    <section className="bg-[#FAFAFA] text-[#0A0A0A] relative overflow-hidden py-16 lg:py-24">
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--accent-yellow)] text-[11px] font-bold tracking-[0.2em] uppercase mb-4 inline-block"
          >
            Backed By The Best
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-3xl md:text-4xl tracking-tight text-[#0A0A0A]"
          >
            Supported By
          </motion.h2>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 max-w-5xl mx-auto">
          {supporters.map((supporter, i) => (
            <motion.div
              key={supporter.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative bg-white rounded-2xl border border-black/[0.06] hover:border-[var(--accent-yellow)]/30 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center p-6 h-28 overflow-hidden"
            >
              {supporter.logo ? (
                <img
                  src={supporter.logo}
                  alt={`${supporter.name} logo — ELESPA HEV supporter`}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
                />
              ) : (
                <span className="text-[14px] font-bold text-[#525252] group-hover:text-[#0A0A0A] transition-colors tracking-wide text-center">
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
