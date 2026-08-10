"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TechVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TechVideoModal({ isOpen, onClose }: TechVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause video and restore scroll on close
  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    onClose();
  }, [onClose]);

  // Escape key to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  // Autoplay (muted) when modal opens
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay blocked — user can press play manually
      });
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="tech-video-overlay"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          // Click backdrop to close
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="ELESPA Technology Video"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

          {/* Subtle yellow glow at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-[var(--accent-yellow)] opacity-60 blur-sm pointer-events-none" />

          {/* Video container */}
          <motion.div
            className="relative z-10 w-full max-w-[90vw] lg:max-w-5xl aspect-video"
            initial={{ scale: 0.96, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            // Stop propagation so clicking the video doesn't close the modal
            onClick={(e) => e.stopPropagation()}
          >
            {/* Thin yellow border */}
            <div className="absolute -inset-[1px] rounded-2xl border border-[var(--accent-yellow)]/20 pointer-events-none" />

            <video
              ref={videoRef}
              src="/assets/elespa-main.mp4"
              className="w-full h-full rounded-2xl object-cover bg-black"
              controls
              muted
              playsInline
              preload="metadata"
            />
          </motion.div>

          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close video"
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full flex items-center justify-center border border-white/20 bg-black/60 backdrop-blur-sm text-white/70 hover:text-white hover:border-white/50 hover:bg-black/80 transition-all duration-200"
          >
            <X size={18} strokeWidth={1.5} />
          </button>

          {/* Eyebrow label */}
          <div className="absolute top-5 left-5 z-20">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--accent-yellow)]/70">
              Our Technology
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
