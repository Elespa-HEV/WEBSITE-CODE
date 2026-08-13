"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Zap, RefreshCcw, Fuel, ArrowRight, BrainCircuit } from "lucide-react";

// --- Custom Animated Components ---

const SplitText = ({ text, className = "" }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden mr-[0.25em] pb-1">
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
            className="inline-block"
          >
            {word}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

const BlurText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  return (
    <motion.p
      initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {text}
    </motion.p>
  );
};

// --- Feature Data ---

const features = [
  { 
    icon: Zap, 
    title: "Electric Mode", 
    subtitle: "Zero Emission",
    color: "#4ADE80"
  },
  { 
    icon: RefreshCcw, 
    title: "Hybrid Mode", 
    subtitle: "Smart Efficiency",
    color: "#F5B800"
  },
  { 
    icon: Fuel, 
    title: "Petrol Backup", 
    subtitle: "Unlimited Range",
    color: "#38BDF8"
  },
  { 
    icon: BrainCircuit, 
    title: "AI Assistance", 
    subtitle: "Always Learning",
    color: "#A78BFA"
  },
];

export default function MobilitySection() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={containerRef}
      className="bg-[#F5F5F3] text-[#0A0A0A] relative overflow-hidden"
      style={{ paddingTop: '40px', paddingBottom: '48px' }}
    >
      {/* Subtle dot grid background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "28px 28px"
        }}
      />

      <div className="container relative z-10">
        
        {/* 3-column layout on desktop, stacked on mobile */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-0">

          {/* LEFT COLUMN: Text Content (~30%) */}
          <div className="w-full lg:w-[30%] flex flex-col items-start text-left lg:pr-8 order-1">
            <SplitText 
              text="Redefining Urban Mobility" 
              className="font-display font-black text-[2.5rem] md:text-[3rem] lg:text-[3.25rem] leading-[1.05] mb-6 tracking-tight text-[#0A0A0A]"
            />
            
            <BlurText 
              text="We combine electric performance with petrol reliability, intelligent software and connected tech to create a seamless ride experience." 
              delay={0.4}
              className="text-[15px] text-[#6B6B6B] mb-8 leading-[1.7] font-normal max-w-[340px]"
            />
            
            <div className="h-0" />
          </div>

          {/* CENTER COLUMN: Scooter Image (~40%) */}
          <div className="w-full lg:w-[40%] relative flex items-center justify-center order-2 py-6 lg:py-0">
            
            {/* Large faint "HEV" watermark behind scooter */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
            >
              <span 
                className="font-display font-black text-[12rem] md:text-[16rem] lg:text-[18rem] tracking-[0.05em] text-transparent"
                style={{
                  WebkitTextStroke: '1.5px rgba(0,0,0,0.04)',
                  lineHeight: 1,
                }}
              >
                HEV
              </span>
            </motion.div>
            
            {/* Scooter Video */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 w-full max-w-[520px]"
            >
              <video 
                src="/assets/vid_elespa_gwr_video_1080p_enhanced.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
              />
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Features (~30%) */}
          <div className="w-full lg:w-[30%] flex flex-col gap-7 lg:gap-8 order-3 lg:pl-8">
            {features.map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.12 + 0.2 }}
                className="group flex items-start gap-4 cursor-default"
              >
                {/* Icon */}
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
                  style={{ 
                    backgroundColor: `${feature.color}15`,
                    color: feature.color 
                  }}
                >
                  <feature.icon size={20} strokeWidth={2} />
                </motion.div>
                
                {/* Text */}
                <div className="flex flex-col">
                  <h3 className="font-bold text-[15px] text-[#0A0A0A] font-display tracking-wide leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] text-[#888] font-normal mt-0.5 italic">
                    {feature.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
