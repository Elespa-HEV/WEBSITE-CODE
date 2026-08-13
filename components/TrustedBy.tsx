"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cloud, Database, Cpu, Wifi, MessageSquare } from "lucide-react";

const partners = [
  { name: "AWS", displayName: "aws", icon: Cloud, color: "#FF9900" },
  { name: "Supabase", displayName: "supabase", icon: Database, color: "#3ECF8E" },
  { name: "Raspberry Pi", displayName: "Raspberry Pi", icon: Cpu, color: "#C51A4A" },
  { name: "Espressif", displayName: "ESPRESSIF", icon: Wifi, color: "#E7352C" },
  { name: "MQTT", displayName: "MQTT", icon: MessageSquare, color: "#660066" },
];

// Radxa is rendered separately as it uses its official SVG mark + wordmark
const RADXA_COLOR = "#74BC1F";

export default function TrustedBy() {
  return (
    <section className="bg-[#0a0a0c] border-t border-b border-white/[0.04] py-12 lg:py-16 relative overflow-hidden">
      {/* Subtle glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-yellow)]/20 to-transparent" />

      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-shrink-0 text-center lg:text-left"
          >
            <h3 className="font-display font-bold text-white/80 text-[15px] tracking-tight mb-1">
              Trusted By Innovators
            </h3>
            <p className="text-white/30 text-[12px]">Our technology partners</p>
          </motion.div>

          {/* Divider */}
          <div className="hidden lg:block w-[1px] h-10 bg-white/[0.08]" />

          {/* Logos */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-10 lg:gap-14 flex-1">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group flex items-center gap-2.5 cursor-default"
              >
                <partner.icon
                  size={20}
                  strokeWidth={2}
                  className="text-white/25 transition-colors duration-400"
                  style={{ }}
                />
                <span className="text-white/25 group-hover:text-white/90 transition-colors duration-400 font-semibold text-[14px] tracking-wide"
                  style={{}}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.color = partner.color;
                    const icon = el.previousElementSibling as HTMLElement;
                    if (icon) icon.style.color = partner.color;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.color = '';
                    const icon = el.previousElementSibling as HTMLElement;
                    if (icon) icon.style.color = '';
                  }}
                >
                  {partner.name === "AWS" ? (
                    <span className="text-lg leading-none italic font-black">aws</span>
                  ) : partner.name === "Supabase" ? (
                    <span className="lowercase font-bold tracking-tighter">supabase</span>
                  ) : partner.name === "Espressif" ? (
                    <span className="uppercase font-bold tracking-widest text-[11px]">ESPRESSIF</span>
                  ) : (
                    partner.displayName
                  )}
                </span>
              </motion.div>
            ))}

            {/* Radxa — official diamond mark SVG + wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: partners.length * 0.08, duration: 0.4 }}
              className="group flex items-center gap-2.5 cursor-default"
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                const img = el.querySelector("img") as HTMLElement | null;
                const span = el.querySelector("span") as HTMLElement | null;
                if (img) img.style.filter = "brightness(0) saturate(100%) invert(63%) sepia(68%) saturate(450%) hue-rotate(51deg) brightness(94%)";
                if (span) span.style.color = RADXA_COLOR;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                const img = el.querySelector("img") as HTMLElement | null;
                const span = el.querySelector("span") as HTMLElement | null;
                if (img) img.style.filter = "";
                if (span) span.style.color = "";
              }}
            >
              <img
                src="/assets/radxa_Radxa.svg"
                alt="Radxa logo mark"
                width={20}
                height={20}
                className="opacity-25 group-hover:opacity-90 transition-all duration-400"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <span className="text-white/25 group-hover:text-white/90 transition-colors duration-400 font-semibold text-[14px] tracking-wide">
                Radxa
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
