"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const products = [
  {
    id: "01",
    title: "Electric Mode",
    description: "Silent, zero-emission commuting powered entirely by our advanced lithium-ion battery system.",
    bg: "/assets/x6.png"
  },
  {
    id: "02",
    title: "Petrol Mode",
    description: "Switch to ICE for long highway stretches. No range anxiety, instant refuelling anywhere.",
    bg: "/assets/x5.png"
  },
  {
    id: "03",
    title: "Hybrid Mode",
    description: "Combined electric and petrol power for maximum torque, acceleration and extended range.",
    bg: "/assets/hybrid_pic.jpeg"
  }
];

export default function EcosystemGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Register ScrollTrigger in this component's context before use
    gsap.registerPlugin(ScrollTrigger);

    if (gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-[#F5F5F5] text-[#0A0A0A] pt-10 lg:pt-12 pb-10 lg:pb-14 overflow-hidden relative">
      <div className="container relative z-10">

        {/* White Bordered Container */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-[var(--border-subtle)] shadow-sm relative overflow-hidden">

          {/* Yellow left accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent-yellow)] opacity-60" />

          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative z-10">
            <div className="flex flex-col gap-2 max-w-xl">
              <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight text-[#0A0A0A]">
                Our Product Lineup
              </h2>
              <p className="text-[14px] text-[#525252] leading-relaxed">
                India’s first parallel hybrid electric scooter. Three riding modes, one intelligent platform — designed for the way you move.
              </p>
            </div>
            <p className="text-[14px] text-[#525252] font-medium tracking-wide text-left md:text-right md:pb-2">
              Three modes. <span className="text-[var(--accent-yellow)] font-bold">One smart scooter.</span>
            </p>
          </div>

          {/* Cards Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:h-[420px] min-h-[350px]">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative rounded-2xl overflow-hidden bg-[#1A1A1A] isolation-isolate flex flex-col justify-between p-6 cursor-pointer border border-white/10 hover:border-[var(--accent-yellow)]/40 transition-colors duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0c] to-[#1a1a1e] z-0" />
                <div className="absolute inset-0 z-0 overflow-hidden opacity-85 group-hover:opacity-100 transition-opacity duration-500">
                  <img
                    src={product.bg}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[var(--ease-standard)] scale-[1.20] group-hover:scale-[1.28]"
                  />
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 z-10 pointer-events-none" />

                {/* Top Content */}
                <div className="relative z-20 flex flex-col items-start transform transition-transform duration-500 ease-[var(--ease-standard)] group-hover:translate-y-1">
                  <div className="text-white/60 font-display text-[13px] tracking-widest mb-3 transition-colors duration-300 group-hover:text-[var(--accent-yellow)]">
                    {product.id}
                  </div>
                  <h3 className="text-[17px] font-bold text-white mb-2 font-display leading-tight">{product.title}</h3>
                  <p className="text-[12px] text-white/60 font-medium leading-relaxed max-w-full">
                    {product.description}
                  </p>
                </div>

                {/* Bottom Arrow */}
                <div className="relative z-20 mt-8">
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-all duration-300 ease-out group-hover:bg-[var(--accent-yellow)] shadow-lg">
                    <ArrowRight size={16} strokeWidth={2.5} className="transform transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
