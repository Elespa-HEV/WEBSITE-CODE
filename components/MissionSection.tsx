"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, RotateCcw, Recycle, Globe, Target, Droplets, Zap, Heart, ShoppingBag } from "lucide-react";

const pillars = [
  {
    icon: Leaf,
    title: "Reduce",
    description: "Cut fossil fuel consumption by up to 90% through intelligent hybrid power management. Lower emissions, lower costs, cleaner air.",
    color: "#4ADE80",
  },
  {
    icon: RotateCcw,
    title: "Reuse",
    description: "Don't scrap your existing vehicle — retrofit it. Our universal kits transform petrol two-wheelers into high-performance hybrids, extending their lifecycle.",
    color: "#F5B700",
  },
  {
    icon: Recycle,
    title: "Recycle",
    description: "Modular battery packs designed for second-life applications and responsible end-of-life recycling. Circular economy by design.",
    color: "#60A5FA",
  },
];

const sdgAlignments = [
  { number: 7, title: "Affordable & Clean Energy", icon: Zap },
  { number: 9, title: "Industry, Innovation & Infrastructure", icon: Target },
  { number: 11, title: "Sustainable Cities & Communities", icon: Globe },
  { number: 3, title: "Good Health & Well-Being", icon: Heart },
  { number: 12, title: "Responsible Consumption & Production", icon: ShoppingBag },
  { number: 13, title: "Climate Action", icon: Droplets },
];

export default function MissionSection() {
  const [activePillar, setActivePillar] = useState(0);

  return (
    <section id="mission" className="bg-[#0a0a0c] text-white relative overflow-hidden pt-10 lg:pt-12 pb-12 lg:pb-16">
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[var(--accent-yellow)] opacity-[0.02] rounded-full blur-[200px] pointer-events-none" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--accent-yellow)] text-[11px] font-bold tracking-[0.2em] uppercase mb-4 inline-block"
          >
            Our Purpose
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6 tracking-tight"
          >
            Our Mission &amp; SDGs
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-[16px] max-w-2xl mx-auto leading-relaxed"
          >
            Bridging the gap between ICE vehicles and full EVs through our 3R philosophy — Reduce, Reuse, Recycle — aligned with the United Nations Sustainable Development Goals.
          </motion.p>
        </div>

        {/* 3R Stepper */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start mb-20 lg:mb-28">
          {/* Left: Pillar selector */}
          <div className="flex flex-col gap-3">
            {pillars.map((pillar, i) => {
              const isActive = activePillar === i;
              return (
                <motion.button
                  key={pillar.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setActivePillar(i)}
                  className={`group relative flex items-center gap-5 p-5 rounded-2xl text-left transition-all duration-300 border ${
                    isActive
                      ? "bg-white/[0.04] border-white/[0.08]"
                      : "bg-transparent border-transparent hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activePillar"
                      className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                      style={{ backgroundColor: pillar.color }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                    style={{
                      backgroundColor: isActive ? pillar.color + "15" : "rgba(255,255,255,0.03)",
                      borderWidth: 1,
                      borderColor: isActive ? pillar.color + "30" : "rgba(255,255,255,0.06)",
                    }}
                  >
                    <pillar.icon
                      size={22}
                      strokeWidth={2}
                      className="transition-colors duration-300"
                      style={{ color: isActive ? pillar.color : "rgba(255,255,255,0.3)" }}
                    />
                  </div>

                  {/* Text */}
                  <div>
                    <h3
                      className="font-display font-bold text-lg transition-colors duration-300"
                      style={{ color: isActive ? pillar.color : "rgba(255,255,255,0.5)" }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className={`text-[13px] leading-relaxed mt-1 transition-all duration-300 ${
                        isActive ? "text-white/50 max-h-20 opacity-100" : "text-white/25 max-h-0 opacity-0 overflow-hidden"
                      }`}
                    >
                      {pillar.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right: Active pillar detail */}
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 lg:p-12 overflow-hidden"
          >
            {/* Accent glow */}
            <div
              className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[150px] opacity-[0.08] pointer-events-none"
              style={{ backgroundColor: pillars[activePillar].color }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                {React.createElement(pillars[activePillar].icon, {
                  size: 32,
                  strokeWidth: 1.5,
                  style: { color: pillars[activePillar].color },
                })}
                <h3
                  className="font-display font-black text-4xl md:text-5xl"
                  style={{ color: pillars[activePillar].color }}
                >
                  {pillars[activePillar].title}
                </h3>
              </div>

              <p className="text-white/60 text-[16px] leading-relaxed max-w-lg mb-8">
                {pillars[activePillar].description}
              </p>

              {/* Progress indicator */}
              <div className="flex items-center gap-2">
                {pillars.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full transition-all duration-500"
                    style={{
                      width: activePillar === i ? 40 : 12,
                      backgroundColor: activePillar === i ? pillars[i].color : "rgba(255,255,255,0.1)",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* SDG Alignment Strip */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white/30 text-[12px] font-bold tracking-[0.2em] uppercase mb-8"
          >
            UN SDG Alignment
          </motion.h3>

          <div className="flex justify-center overflow-x-auto pb-1">
            <div className="flex flex-row gap-3">
              {sdgAlignments.map((sdg, i) => (
                <motion.div
                  key={sdg.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex flex-col items-center text-center px-4 py-3.5 rounded-xl border border-white/[0.04] hover:border-[var(--accent-yellow)]/20 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 w-[120px] shrink-0"
                >
                  <span className="text-[var(--accent-yellow)] font-black font-display text-2xl mb-1">
                    {sdg.number}
                  </span>
                  <span className="text-white/40 text-[10px] font-medium leading-snug group-hover:text-white/60 transition-colors">
                    {sdg.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
