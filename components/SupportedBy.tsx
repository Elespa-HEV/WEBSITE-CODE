"use client";

import React, { useState, useEffect, useCallback } from "react";
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

const TOTAL = supporters.length;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

/**
 * Returns the shortest circular distance from activeIndex to index.
 * Result is in the range (-TOTAL/2, TOTAL/2].
 */
function getRelPos(index: number, activeIndex: number): number {
  let d = index - activeIndex;
  if (d > TOTAL / 2) d -= TOTAL;
  if (d <= -TOTAL / 2) d += TOTAL;
  return d;
}

/**
 * Compute the pixel step (center-to-center distance between cards) from
 * the current viewport width, matching the responsive Tailwind card sizes.
 */
function computeStep(): number {
  if (typeof window === "undefined") return 280;
  const vw = window.innerWidth;
  // Center card intrinsic widths (matching Tailwind classes below)
  let cw: number;
  if (vw < 768) {
    cw = Math.min(220, vw * 0.42); // w-[min(220px,42vw)]
  } else if (vw < 1024) {
    cw = 256; // md:w-64
  } else {
    cw = 288; // lg:w-72
  }
  // step = half-center + gap(20px) + half-side-visual (side visual = cw * 0.8)
  return Math.round(cw / 2 + 20 + (cw * 0.8) / 2);
}

// Shared easing — premium smooth ease-in-out
const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const TRANSITION = { duration: 0.82, ease: EASE };
// Opacity slightly faster so cards don't ghost at edges
const OPACITY_TRANSITION = { duration: 0.55, ease: EASE };

export default function SupportedBy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused]       = useState(false);
  const [step, setStep]               = useState(280);

  // Recompute step on mount + window resize
  useEffect(() => {
    setStep(computeStep());
    const onResize = () => setStep(computeStep());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const advance = useCallback((dir: 1 | -1) => {
    setActiveIndex((prev) => mod(prev + dir, TOTAL));
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => advance(1), 3600);
    return () => clearInterval(id);
  }, [advance, isPaused]);

  return (
    <section
      id="supported-by"
      className="bg-[#FAFAFA] text-[#0A0A0A] relative overflow-hidden pt-10 lg:pt-12 pb-10 lg:pb-14 scroll-mt-20"
    >
      <div className="container relative z-10">

        {/* ── Section Header — unchanged ───────────────────────────────── */}
        <div className="text-center mb-12 lg:mb-16">
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

        {/* ── Carousel ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative flex items-center justify-center gap-4 md:gap-6 lg:gap-8 select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Prev arrow */}
          <button
            onClick={() => advance(-1)}
            aria-label="Previous supporter"
            className="hidden sm:flex flex-shrink-0 w-9 h-9 rounded-full border border-gray-200 bg-white shadow-sm hover:border-[var(--accent-yellow)] hover:shadow-md transition-all duration-200 items-center justify-center z-20"
          >
            <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/*
            ── Sliding track ────────────────────────────────────────────
            All 10 cards live here with STABLE KEYS (index never changes).
            Each card is absolutely positioned at the track centre, then
            translated by (relPos × step) so they spread left/right.
            When activeIndex changes framer smoothly interpolates x, scale
            and opacity — giving a real physical slide.
          */}
          <div
            className="relative w-full max-w-4xl overflow-hidden
                        h-[min(160px,30vw)] md:h-44 lg:h-52"
          >
            {supporters.map((supporter, i) => {
              const relPos   = getRelPos(i, activeIndex);
              const isCenter = relPos === 0;
              const isVisible = Math.abs(relPos) <= 1;

              return (
                /*
                  Outer wrapper — fills the track, flex-centres its child.
                  Translating this div moves the card left/right inside
                  the overflow-hidden track.
                */
                <motion.div
                  key={i}                       /* ← STABLE KEY — never remounts */
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    zIndex: isCenter ? 10 : isVisible ? 5 : 0,
                    pointerEvents: isVisible ? "auto" : "none",
                  }}
                  animate={{ x: relPos * step }}
                  transition={TRANSITION}
                >
                  {/* Inner card — scale + opacity animate here */}
                  <motion.div
                    className={`
                      group relative bg-white rounded-3xl border
                      shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]
                      flex items-center justify-center overflow-hidden
                      transition-[border-color,box-shadow] duration-300
                      w-[min(220px,42vw)] h-[min(160px,30vw)] md:w-64 md:h-44 lg:w-72 lg:h-52
                      flex-shrink-0
                      ${isCenter
                        ? "border-[var(--accent-yellow)]/40 hover:border-[var(--accent-yellow)]/70 hover:shadow-xl cursor-default"
                        : "border-gray-200 hover:border-[var(--accent-yellow)]/50 hover:shadow-md cursor-pointer"
                      }
                    `}
                    animate={{
                      scale:   isCenter ? 1 : 0.8,
                      opacity: isCenter ? 1 : isVisible ? 0.62 : 0,
                    }}
                    transition={{
                      scale:   TRANSITION,
                      opacity: OPACITY_TRANSITION,
                    }}
                    /*
                      Side-card hover: nudge scale slightly upward so the
                      existing hover zoom still feels responsive.
                      whileHover overrides the animate scale only while hovering.
                    */
                    whileHover={!isCenter ? { scale: 0.85 } : undefined}
                    onClick={!isCenter ? () => advance(relPos > 0 ? 1 : -1) : undefined}
                    style={{ willChange: "transform, opacity" }}
                  >
                    {/* Hover lift layer — same as original */}
                    <div className="absolute inset-0 rounded-3xl transition-transform duration-300 group-hover:-translate-y-1 pointer-events-none" />

                    {/* Card content — identical to original */}
                    {supporter.logo ? (
                      <img
                        src={supporter.logo}
                        alt={`${supporter.name} logo — ELESPA HEV supporter`}
                        className={`
                          object-contain grayscale group-hover:grayscale-0
                          opacity-70 group-hover:opacity-100 group-hover:scale-105
                          transition-all duration-300
                          ${isCenter ? "w-[60%] max-h-[60%]" : "w-[55%] max-h-[55%]"}
                        `}
                        draggable={false}
                      />
                    ) : (
                      <span className={`
                        font-bold text-[#525252] group-hover:text-[#0A0A0A]
                        transition-colors tracking-wide text-center leading-snug
                        group-hover:scale-105 inline-block transition-transform duration-300
                        ${isCenter ? "text-[14px]" : "text-[12px]"}
                      `}>
                        {supporter.name}
                      </span>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Next arrow */}
          <button
            onClick={() => advance(1)}
            aria-label="Next supporter"
            className="hidden sm:flex flex-shrink-0 w-9 h-9 rounded-full border border-gray-200 bg-white shadow-sm hover:border-[var(--accent-yellow)] hover:shadow-md transition-all duration-200 items-center justify-center z-20"
          >
            <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>

        {/* ── Dot indicators — unchanged ───────────────────────────────── */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {supporters.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to ${supporters[i].name}`}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 h-2 bg-[var(--accent-yellow)]"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
