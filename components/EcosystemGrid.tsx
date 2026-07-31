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
    title: "Scooters",
    description: "Smart city commuting with zero range anxiety and maximum fuel savings for your daily rides.",
    bg: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Bikes",
    description: "High torque performance and dual-power efficiency for all types of motorcycles and mopeds.",
    bg: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Three Wheelers",
    description: "Reliable commercial and passenger solutions designed to significantly reduce operational costs.",
    bg: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Four Wheelers",
    description: "Parallel hybrid kits for efficient last-mile delivery vans and passenger commercial vehicles.",
    bg: "https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "05",
    title: "Busses & Trucks",
    description: "Industrial-scale kits to electrify heavy-duty logistics and public transportation fleets.",
    bg: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800&auto=format&fit=crop"
  }
];

export default function EcosystemGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
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
    <section ref={containerRef} className="bg-[#F5F5F5] text-[#0A0A0A] py-16 lg:py-24 overflow-hidden relative">
      <div className="container relative z-10">
        
        {/* Bordered Container */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-[var(--border-subtle)] shadow-sm relative overflow-hidden">
          
          {/* Subtle yellow left border accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent-yellow)] opacity-60"></div>
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative z-10">
            <div className="flex flex-col gap-2 max-w-xl">
              <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight text-[#0A0A0A]">
                Universal Retrofitting Kits
              </h2>
              <p className="text-[14px] text-[#525252] leading-relaxed">
                We provide hybrid conversion solutions for a wide range of vehicles. Upgrade your existing ride to high-performance, ultra-economical parallel hybrid mobility.
              </p>
            </div>
            <p className="text-[14px] text-[#525252] font-medium tracking-wide text-left md:text-right md:pb-2">
              Five vehicles. <span className="text-[var(--accent-yellow)] font-bold">One hybrid solution.</span>
            </p>
          </div>

          {/* Cards Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:h-[420px] min-h-[350px]">
            {products.map((product) => (
              <div 
                key={product.id}
                className="group relative rounded-2xl overflow-hidden bg-[#1A1A1A] isolation-isolate flex flex-col justify-between p-6 cursor-pointer border border-white/10 hover:border-[var(--accent-yellow)]/40 transition-colors duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0c] to-[#1a1a1e] z-0" />
                <div className="absolute inset-0 z-0 overflow-hidden opacity-50 group-hover:opacity-70 transition-opacity duration-500">
                  <img 
                    src={product.bg} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[var(--ease-standard)] group-hover:scale-[1.08]"
                    style={{ filter: 'grayscale(30%)' }}
                  />
                </div>
                
                {/* Overlays for better readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/30 to-black/90 z-10 pointer-events-none" />

                {/* Top Content (Number, Title, Desc) */}
                <div className="relative z-20 flex flex-col items-start transform transition-transform duration-500 ease-[var(--ease-standard)] group-hover:translate-y-1">
                  <div className="text-white/60 font-display text-[13px] tracking-widest mb-3 transition-colors duration-300 group-hover:text-[var(--accent-yellow)]">
                    {product.id}
                  </div>
                  <h3 className="text-[17px] font-bold text-white mb-2 font-display leading-tight">{product.title}</h3>
                  <p className="text-[12px] text-white/60 font-medium leading-relaxed max-w-full">
                    {product.description}
                  </p>
                </div>

                {/* Bottom Content (Icon) */}
                <div className="relative z-20 mt-8">
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center 
                                transition-all duration-300 ease-out group-hover:bg-[var(--accent-yellow)] shadow-lg">
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
