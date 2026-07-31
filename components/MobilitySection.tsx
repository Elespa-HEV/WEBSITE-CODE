"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Zap, RefreshCcw, Fuel, ArrowRight } from "lucide-react";

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

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-full perspective-1000 group hidden md:block"
    >
      <div className="absolute inset-0 rounded-3xl transition-shadow duration-500 group-hover:shadow-[0_0_40px_-10px_rgba(245,183,0,0.3)] pointer-events-none" />
      {children}
    </motion.div>
  );
};

// --- Main Component ---

const features = [
  { 
    icon: Zap, 
    title: "Electric Mode", 
    description: "Silent, zero-emission commuting for your daily city rides. Save the environment and your wallet." 
  },
  { 
    icon: RefreshCcw, 
    title: "Hybrid Mode", 
    description: "Combined power of electricity and petrol for maximum acceleration, high torque performance and extended range." 
  },
  { 
    icon: Fuel, 
    title: "Petrol Mode", 
    description: "Eradicate range anxiety completely. Switch to ICE for long highway stretches and instant refuelling." 
  },
];

export default function MobilitySection() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Scroll progress for the vertical line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      ref={containerRef}
      className="bg-[#FAFAFA] text-[#0A0A0A] relative overflow-hidden py-20 lg:py-32"
    >
      {/* Background DotGrid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      <div className="container relative z-10 flex flex-col xl:flex-row gap-12 xl:gap-16 items-center">
        
        {/* LEFT COLUMN: Scooter Image (45%) */}
        <div className="w-full xl:w-[45%] flex-shrink-0 relative flex items-center justify-center order-2 xl:order-1 z-10">
          
          {/* Mobile view without TiltCard */}
          <div className="w-full relative md:hidden flex justify-center items-center">
            <div className="relative w-full h-[400px] bg-gradient-to-br from-[#1a1a1e] to-[#0a0a0c] rounded-[24px] shadow-2xl p-6 flex justify-center items-center overflow-hidden border border-white/5">
              <div className="absolute inset-[-20px] bg-[var(--accent-yellow)] opacity-10 blur-2xl rounded-full" />
              <img 
                src="/assets/elespa_scooter_front.png"
                alt="ELESPA Technology Overview"
                className="w-full h-full object-contain filter drop-shadow-xl relative z-10"
              />
            </div>
          </div>
          
          {/* Desktop view with TiltCard */}
          <TiltCard>
            <div className="relative w-full h-[480px] lg:h-[560px] hidden md:block">
              {/* Soft amber glow behind/around the card edges */}
              <div className="absolute inset-[-10px] bg-[var(--accent-yellow)] opacity-15 blur-2xl rounded-[30px]" />
              
              {/* Product Spotlight Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full h-full bg-gradient-to-br from-[#1a1a1e] to-[#0a0a0c] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 lg:p-12 flex justify-center items-center overflow-hidden border border-white/5"
                style={{ transform: 'translateZ(40px)' }}
              >
                <img 
                  src="/assets/elespa_scooter_front.png"
                  alt="ELESPA Technology Overview"
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                />
              </motion.div>
            </div>
          </TiltCard>
        </div>

        {/* RIGHT COLUMN: Content (Text + Features) (55%) */}
        <div className="w-full xl:w-[55%] flex flex-col lg:flex-row gap-12 lg:gap-8 order-1 xl:order-2 items-center lg:items-start justify-between">
           
          {/* Text Content */}
          <div className="flex flex-col items-start w-full lg:w-[55%] text-left">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[var(--accent-yellow)] text-[11px] font-bold tracking-[0.2em] uppercase mb-4"
            >
              Our Technology
            </motion.span>
            
            <SplitText 
              text="Unleash High Torque Performance" 
              className="font-display font-black text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] mb-6 tracking-tight text-[#0A0A0A]"
            />
            
            <BlurText 
              text="Our patented technology gives you the power of choice with a single twist of the throttle." 
              delay={0.4}
              className="text-[16px] text-[#525252] mb-10 leading-relaxed font-medium max-w-sm"
            />
            
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="group relative inline-flex items-center gap-2 text-[var(--accent-yellow)] font-bold text-[15px]"
            >
              <span className="relative z-10">Learn More</span>
              <ArrowRight size={16} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[var(--accent-yellow)] transition-all duration-300 group-hover:w-full" />
            </motion.a>
          </div>

          {/* Features List */}
          <div className="relative flex w-full lg:w-[40%] max-w-sm mx-auto lg:mx-0 pl-4 lg:pl-8 z-20">
            
            {/* Animated Scroll Progress Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-black/5 rounded-full overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 right-0 bg-[var(--accent-yellow)] origin-top"
                style={{ scaleY, height: "100%" }}
              />
            </div>

            <div className="flex flex-col gap-10 lg:gap-12 pl-6 py-4">
              {features.map((feature, i) => (
                <motion.div 
                  key={feature.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                  className="group flex flex-col gap-3 cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="w-10 h-10 rounded-full bg-white shadow-sm border border-black/5 flex items-center justify-center shrink-0 
                                 text-[#888] group-hover:text-[var(--accent-yellow)] transition-colors duration-300"
                    >
                      <feature.icon size={20} strokeWidth={2} />
                    </motion.div>
                    <h3 className="font-bold text-[17px] text-[#0A0A0A] font-display tracking-wide">{feature.title}</h3>
                  </div>
                  <p className="text-[14px] text-[#525252] font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
