"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Zap, RefreshCw, Fuel, ArrowRight, ChevronRight } from "lucide-react";

const modes = [
  {
    id: "electric",
    title: "Electric Mode",
    shortTitle: "EV",
    description: "Silent, zero-emission commuting for your daily city rides. Save the environment and your wallet.",
    longDescription: "Pure electric power delivers whisper-quiet performance with zero tailpipe emissions. Ideal for daily commutes, school runs, and city errands — significantly reducing your fuel costs while contributing to cleaner air.",
    icon: Zap,
    accent: "#4ADE80",
    stats: [
      { label: "Emissions", value: "Zero" },
      { label: "Best For", value: "City" },
      { label: "Noise", value: "Silent" },
    ],
  },
  {
    id: "petrol",
    title: "Petrol Mode",
    shortTitle: "ICE",
    description: "Eradicate range anxiety completely. Switch to ICE for long highway stretches and instant refuelling.",
    longDescription: "When you need unlimited range for long highway stretches or quick refuelling on the go, switch to pure petrol mode. Zero range anxiety, instant access to any fuel station, and the confidence to go anywhere without planning.",
    icon: Fuel,
    accent: "#60A5FA",
    stats: [
      { label: "Range", value: "Unlimited" },
      { label: "Best For", value: "Highway" },
      { label: "Refuel", value: "Instant" },
    ],
  },
  {
    id: "hybrid",
    title: "Hybrid Mode",
    shortTitle: "HEV",
    description: "Combined power of electricity and petrol for maximum acceleration, high torque performance and extended range.",
    longDescription: "Our patented parallel hybrid system seamlessly combines electric and petrol power on a single throttle twist. Get explosive acceleration, unmatched torque, and dramatically extended range — the best of both worlds, intelligently managed.",
    icon: RefreshCw,
    accent: "#F5B700",
    stats: [
      { label: "Power", value: "Max" },
      { label: "Best For", value: "All" },
      { label: "Range", value: "Extended" },
    ],
  },
];

export default function HybridTechnology() {
  const [activeMode, setActiveMode] = useState(2); // Default to hybrid (now index 2)
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      id="technology-modes"
      ref={containerRef}
      className="bg-[#0a0a0c] text-white relative overflow-hidden pt-6 lg:pt-8 pb-10 lg:pb-14"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow from active mode accent */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-[0.06] pointer-events-none"
        animate={{ backgroundColor: modes[activeMode].accent }}
        transition={{ duration: 0.8 }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--accent-yellow)] text-[11px] font-bold tracking-[0.2em] uppercase mb-4 inline-block"
          >
            Hybrid Technology
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6 tracking-tight"
          >
            Three Intelligent Modes.
            <br />
            <span className="text-white/40">One Seamless Experience.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-[16px] max-w-lg mx-auto leading-relaxed"
          >
            Switch between electric, hybrid, and petrol modes with a single twist of the throttle. No compromise.
          </motion.p>
        </div>

        {/* Interactive Mode Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-10"
        >
          <div className="relative flex items-center bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-full p-1.5">
            {/* Sliding indicator */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-full"
              animate={{
                left: `${activeMode * 33.33 + 0.5}%`,
                width: "32.33%",
                backgroundColor: modes[activeMode].accent + "20",
                borderColor: modes[activeMode].accent + "40",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ borderWidth: 1 }}
            />

            {modes.map((mode, i) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(i)}
                className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-300 ${
                  activeMode === i ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                <mode.icon size={16} strokeWidth={2.5} style={activeMode === i ? { color: mode.accent } : {}} />
                <span className="hidden sm:inline">{mode.title}</span>
                <span className="sm:hidden">{mode.shortTitle}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Mode Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Active mode details */}
          <div className="order-2 lg:order-1">
            {/* Fixed-height container prevents layout shift when switching modes */}
            <div className="relative min-h-[560px] md:min-h-[480px] lg:min-h-[460px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMode}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 top-0"
                >
                  {/* Mode badge */}
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
                    style={{
                      borderColor: modes[activeMode].accent + "30",
                      backgroundColor: modes[activeMode].accent + "08",
                    }}
                  >
                    {React.createElement(modes[activeMode].icon, {
                      size: 16,
                      style: { color: modes[activeMode].accent },
                    })}
                    <span
                      className="text-xs font-bold tracking-widest uppercase"
                      style={{ color: modes[activeMode].accent }}
                    >
                      {modes[activeMode].title}
                    </span>
                  </div>

                  {/* Description */}
                  <h3 className="font-display font-black text-3xl md:text-4xl leading-[1.15] mb-6 tracking-tight">
                    {modes[activeMode].description}
                  </h3>

                  <p className="text-white/50 text-[15px] leading-relaxed mb-10 max-w-md">
                    {modes[activeMode].longDescription}
                  </p>

                  {/* Stats row */}
                  <div className="flex gap-8 mb-10">
                    {modes[activeMode].stats.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 + 0.15 }}
                        className="flex flex-col"
                      >
                        <span
                          className="text-2xl font-black font-display"
                          style={{ color: modes[activeMode].accent }}
                        >
                          {stat.value}
                        </span>
                        <span className="text-xs text-white/40 font-medium tracking-wider uppercase mt-1">
                          {stat.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA removed to preserve clean layout */}
                  <div className="h-0" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Visual throttle indicator */}
          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]"
            >
              {/* Outer ring — pointer-events-none so clicks pass through to buttons */}
              <div className="absolute inset-0 rounded-full border border-white/[0.06] pointer-events-none" />
              <div className="absolute inset-4 rounded-full border border-white/[0.04] pointer-events-none" />

              {/* Mode indicators on the ring */}
              {modes.map((mode, i) => {
                const angle = -90 + i * 120; // Distribute 3 modes around circle
                const rad = (angle * Math.PI) / 180;
                const radius = 45; // % from center
                const x = 50 + radius * Math.cos(rad);
                const y = 50 + radius * Math.sin(rad);
                const isActive = activeMode === i;

                return (
                  <motion.button
                    key={mode.id}
                    onClick={() => setActiveMode(i)}
                    className="absolute z-10 flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="relative">
                      {/* Pulsing ring on active node */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-[-4px] rounded-full"
                          style={{ borderColor: mode.accent + "40", borderWidth: 1 }}
                          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                      <motion.div
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 transition-colors duration-300"
                        animate={{
                          backgroundColor: isActive ? mode.accent + "20" : "rgba(255,255,255,0.03)",
                          borderColor: isActive ? mode.accent : "rgba(255,255,255,0.08)",
                          boxShadow: isActive ? `0 0 30px ${mode.accent}30` : "none",
                        }}
                      >
                        <mode.icon
                          size={22}
                          strokeWidth={2}
                          className="transition-colors duration-300"
                          style={{ color: isActive ? mode.accent : "rgba(255,255,255,0.3)" }}
                        />
                      </motion.div>
                    </div>
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase transition-colors duration-300"
                      style={{ color: isActive ? mode.accent : "rgba(255,255,255,0.25)" }}
                    >
                      {mode.shortTitle}
                    </span>
                  </motion.button>
                );
              })}

              {/* Center hub */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 flex flex-col items-center justify-center"
                  animate={{
                    borderColor: modes[activeMode].accent + "40",
                    boxShadow: `0 0 60px ${modes[activeMode].accent}15, inset 0 0 30px ${modes[activeMode].accent}08`,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ backgroundColor: "rgba(10,10,12,0.9)" }}
                >
                  <motion.span
                    className="text-[10px] font-bold tracking-widest uppercase mb-1"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Mode
                  </motion.span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeMode}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-lg md:text-xl font-black font-display"
                      style={{ color: modes[activeMode].accent }}
                    >
                      {modes[activeMode].shortTitle}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Connecting lines from center to active node */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                {modes.map((mode, i) => {
                  const angle = -90 + i * 120;
                  const rad = (angle * Math.PI) / 180;
                  const radius = 45;
                  const x = 50 + radius * Math.cos(rad);
                  const y = 50 + radius * Math.sin(rad);
                  const isActive = activeMode === i;

                  return (
                    <motion.line
                      key={mode.id}
                      x1="50"
                      y1="50"
                      x2={x}
                      y2={y}
                      strokeWidth="0.3"
                      animate={{
                        stroke: isActive ? mode.accent : "rgba(255,255,255,0.05)",
                        opacity: isActive ? 0.5 : 0.15,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  );
                })}
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
