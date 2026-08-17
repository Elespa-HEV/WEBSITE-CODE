"use client";

import { useEffect, useRef, useState } from "react";

/**
 * LoadingOverlay
 *
 * Full-screen intro video overlay shown on initial page load.
 *
 * Dismissal requires BOTH:
 *   1. videoPlayingRef  — the `playing` event has fired (browser is rendering frames)
 *   2. domReadyRef      — window `load` event has fired (all resources loaded)
 *
 * This guarantees the video is ALWAYS visibly playing before the overlay fades.
 *
 * Safety fallback: if video errors or 10 s elapse, overlay is force-removed.
 */
export default function LoadingOverlay() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  // Use refs so event handlers always see the latest values without stale closures
  const videoPlayingRef = useRef(false); // true once 'playing' event fires
  const domReadyRef = useRef(false);     // true once window 'load' fires
  const dismissedRef = useRef(false);    // guard: only dismiss once

  // Attempt dismiss — only proceeds when BOTH conditions are met
  const tryDismiss = () => {
    if (dismissedRef.current) return;
    if (!videoPlayingRef.current) return; // video must be actively playing
    if (!domReadyRef.current) return;     // website must be fully loaded

    dismissedRef.current = true;
    setFading(true);
    // Unmount after fade transition completes (matches 0.85 s CSS transition)
    setTimeout(() => setVisible(false), 900);
  };

  useEffect(() => {
    // ── 1. DOM / website readiness ────────────────────────────────────────
    //    Use window 'load' (fires when ALL resources finish loading) rather
    //    than readyState 'interactive' (fires immediately after HTML parse).
    //    This ensures the visible website is fully initialized before we fade.
    const onWindowLoad = () => {
      domReadyRef.current = true;
      tryDismiss();
    };

    if (document.readyState === "complete") {
      // Already loaded before this effect ran
      domReadyRef.current = true;
      // Don't call tryDismiss here — let the video readiness gate it
    } else {
      window.addEventListener("load", onWindowLoad, { once: true });
    }

    // ── 2. Video readiness ────────────────────────────────────────────────
    //    'playing' is the authoritative event that the browser is actually
    //    rendering video frames. It fires after buffering, decode, and the
    //    first frame is painted — not just when metadata is available.
    const video = videoRef.current;
    if (!video) {
      // No video element — fail safe
      domReadyRef.current = true;
      dismissedRef.current = true;
      setFading(true);
      setTimeout(() => setVisible(false), 900);
      return;
    }

    const onPlaying = () => {
      // Video is genuinely playing — first-play requirement is now satisfied
      videoPlayingRef.current = true;
      tryDismiss();
    };

    const onError = () => {
      // Video failed — never trap the user behind a broken loading screen
      if (!dismissedRef.current) {
        dismissedRef.current = true;
        setFading(true);
        setTimeout(() => setVisible(false), 900);
      }
    };

    video.addEventListener("playing", onPlaying);
    video.addEventListener("error", onError);

    // ── 3. Hard safety fallback — 10 s maximum ───────────────────────────
    //    Prevents a permanently stuck loading screen on unusual devices.
    const fallbackTimer = setTimeout(() => {
      if (!dismissedRef.current) {
        dismissedRef.current = true;
        setFading(true);
        setTimeout(() => setVisible(false), 900);
      }
    }, 10_000);

    // Trigger playback — muted autoplay is allowed by all browsers.
    // If somehow blocked (e.g., strict policies), treat as an error.
    video.play().catch(() => onError());

    return () => {
      window.removeEventListener("load", onWindowLoad);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("error", onError);
      clearTimeout(fallbackTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        // Fixed overlay sits above the entire website
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        // Fade transition: only applied once fading starts (avoids initial flicker)
        opacity: fading ? 0 : 1,
        transition: fading ? "opacity 0.85s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
        // Allow website events through only after fade is complete
        pointerEvents: fading ? "none" : "all",
        overflow: "hidden",
        // Center the video within the black overlay
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <video
        ref={videoRef}
        src="/assets/loading-intro.mp4"
        muted
        autoPlay
        loop
        playsInline
        style={{
          // 'contain' shows the FULL video frame without cropping.
          // The overlay background (#000) fills any letterbox/pillarbox areas.
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
        }}
      />
    </div>
  );
}
