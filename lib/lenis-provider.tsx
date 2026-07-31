"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupGsap } from "./gsap-config";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Setup GSAP plugins first
    setupGsap();

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Add lenis requestAnimationFrame to gsap ticker
    if (typeof window !== "undefined") {
      const gsap = require("gsap").default || require("gsap").gsap;
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });

      // Disable GSAP lag smoothing
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      lenis.destroy();
      if (typeof window !== "undefined") {
        const gsap = require("gsap").default || require("gsap").gsap;
        gsap.ticker.remove(lenis.raf);
      }
    };
  }, []);

  return <>{children}</>;
}
