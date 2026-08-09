"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, PlayCircle, Leaf, BatteryCharging, MapPin, Cpu, ArrowDown } from "lucide-react";
import { Button } from "./ui/Button";

// Custom curved arrow SVG
const CurvedArrow = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -left-12 -top-8 rotate-12">
    <path d="M10 90 Q 30 10 90 20" stroke="white" strokeWidth="2" fill="none" strokeDasharray="5 5" />
    <path d="M75 10 L 90 20 L 75 30" stroke="white" strokeWidth="2" fill="none" />
  </svg>
);

export default function Hero() {
  const containerRef = useRef(null);
  
  // Parallax on scroll
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  // Mousemove parallax
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  // Shift from -1% to 1% (roughly -10px to +10px depending on screen)
  const bgX = useTransform(smoothX, [0, 1], ["-1%", "1%"]);
  const bgY = useTransform(smoothY, [0, 1], ["-1%", "1%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth);
    mouseY.set(clientY / innerHeight);
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100vh] w-full overflow-hidden flex flex-col justify-center pt-24 pb-8"
      onMouseMove={handleMouseMove}
    >
      {/* Background Image & Overlay */}
      <motion.div 
        className="absolute inset-0 z-0 bg-[#0A0A0A]"
        style={{ 
          scale,
          opacity,
          x: bgX,
          y: bgY
        }}
      >
        {/* Placeholder from Unsplash: "helmet rider motorcycle" or "electric scooter urban alley" */}
        <div 
          className="absolute inset-0 bg-no-repeat bg-[center_top] md:bg-[right_center]"
          style={{ 
            backgroundImage: "url('/images/hero-bg.jpg'), url('https://images.unsplash.com/photo-1508344928928-7137b29de216?q=80&w=3000&auto=format&fit=crop')",
            backgroundSize: "auto 100%"
          }}
        />
        {/* Gradient Overlay for text legibility on the left */}
        <div className="absolute top-0 bottom-0 left-0 w-full md:w-[60%] bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
      </motion.div>



      <div className="container relative z-10 flex-1 flex flex-col justify-center translate-y-[-5%]">
        <div className="max-w-[550px]">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-3 text-[10px] font-semibold tracking-[0.2em] uppercase text-white/80"
          >
            India's Next Mobility
          </motion.div>

          {/* Headline */}
          <h1 className="font-display font-bold leading-[1.02] md:leading-[0.98] tracking-tight mb-5 text-white text-[2.75rem] md:text-5xl lg:text-[3.5rem]">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="block"
            >
              Bringing
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="block"
            >
              Hybrid <span className="text-[var(--accent-yellow)]">Mobility</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="block"
            >
              Into a Smarter Future
            </motion.div>
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base md:text-lg text-white/70 mb-8 max-w-[480px]"
          >
            Smarter rides. Cleaner cities. Greater freedom.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <a
              href="#technology-modes"
              className="inline-flex items-center justify-center rounded-full px-7 py-2.5 text-sm font-bold text-black bg-[var(--accent-yellow)] border-none transition-colors duration-300 hover:bg-[#E0A800]"
            >
              Explore ELESPA
            </a>
            <Button variant="outline" className="!rounded-full px-7 py-2.5 text-sm font-medium border-white/30 text-white hover:bg-white/10 group">
              Our Technology 
              <PlayCircle className="w-4 h-4 ml-2 opacity-80 group-hover:opacity-100 transition-opacity" />
            </Button>
          </motion.div>

          {/* Descriptive Para */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-start gap-4 max-w-[380px]"
          >
            <div className="w-[2px] h-[3.5rem] bg-[var(--accent-yellow)] shrink-0 mt-1" />
            <p className="text-[13px] text-white/60 leading-relaxed font-medium">
              ELESPA HEV builds intelligent hybrid electric mobility solutions for a cleaner, smarter and more connected tomorrow.
            </p>
          </motion.div>
        </div>


      </div>

      {/* Bottom Floating Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-0 right-0 z-20 pointer-events-none"
      >
        <div className="container flex flex-col md:flex-row items-end justify-between gap-4 pointer-events-auto">
          
          <div className="flex items-center gap-4 mb-2 md:mb-0">
            <motion.button 
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <ArrowDown size={20} strokeWidth={1.5} />
            </motion.button>
            <span className="text-xs text-white/50 font-normal tracking-wide">
              Scroll to explore
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 items-center bg-black/20 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4">
            {[
              { icon: Leaf, label: "Lower Emissions" },
              { icon: BatteryCharging, label: "Longer Range" },
              { icon: MapPin, label: "Connected Rides" },
              { icon: Cpu, label: "AI Enabled" }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                {i > 0 && <div className="hidden md:block w-[1px] h-4 bg-white/10 mr-3" />}
                <feature.icon size={18} className="text-white" strokeWidth={1.5} />
                <span className="text-xs font-semibold text-white/90 tracking-wide">{feature.label}</span>
              </div>
            ))}
          </div>

        </div>
      </motion.div>
      
      {/* Hand-written font import */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');
      `}} />
    </section>
  );
}
