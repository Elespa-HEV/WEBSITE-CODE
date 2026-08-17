"use client";

import { useEffect, useRef, useState } from "react";

/**
 * LoadingOverlay
 *
 * Full-screen intro video overlay shown on initial page load.
 *
 * Dismissal gate (BOTH required):
 *   1. videoPlayingRef  — the `playing` event has fired at least once.
 *   2. domReadyRef      — window `load` event has fired.
 *
 * Fade timing:
 *   - The fade does NOT start immediately when both conditions become true.
 *   - Instead, it waits until the video's currentTime reaches
 *     (duration - FADE_LEAD_S) in the CURRENT cycle.
 *   - This ensures:
 *       a) The video is always visibly shown.
 *       b) The fade completes before the loop seam is visible.
 *   - If the website isn't ready when that window first arrives, the video
 *     loops normally and tries again on the next cycle.
 *
 * Safety fallback: force-remove after 10 s in case of any stuck state.
 */

/** How many seconds before the video end to start the fade. */
const FADE_LEAD_S = 0.25;
/** Duration of the CSS fade-out in ms (must match the transition below). */
const FADE_DURATION_MS = 700;

export default function LoadingOverlay() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const videoPlayingRef = useRef(false); // true once 'playing' fires
  const domReadyRef     = useRef(false); // true once window 'load' fires
  const dismissedRef    = useRef(false); // guard: only dismiss once

  /**
   * Begin the exit transition. Called only from timeupdate (or fallback).
   * Both gate flags must be true before this runs.
   */
  const beginFade = () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setFading(true);
    setTimeout(() => setVisible(false), FADE_DURATION_MS + 50);
  };

  useEffect(() => {
    // ── 1. DOM / website readiness ────────────────────────────────────────
    const onWindowLoad = () => {
      domReadyRef.current = true;
      // Do NOT call beginFade here — the timeupdate loop gates the timing.
    };

    if (document.readyState === "complete") {
      domReadyRef.current = true;
      // Intentionally NOT triggering fade here.
      // timeupdate will pick it up on the next eligible frame.
    } else {
      window.addEventListener("load", onWindowLoad, { once: true });
    }

    // ── 2. Video events ───────────────────────────────────────────────────
    const video = videoRef.current;
    if (!video) {
      // No video element — fail safe
      dismissedRef.current = true;
      setFading(true);
      setTimeout(() => setVisible(false), FADE_DURATION_MS + 50);
      return;
    }

    /**
     * 'playing' fires when the browser begins rendering the first real frame.
     * This is the authoritative "video is actually visible" signal.
     */
    const onPlaying = () => {
      videoPlayingRef.current = true;
      // Do NOT call beginFade here — defer to timeupdate for timing control.
    };

    /**
     * timeupdate fires several times per second during playback.
     * We use it to watch for the fade window: the last FADE_LEAD_S seconds
     * of each video cycle.
     *
     * Gate:   videoPlayingRef AND domReadyRef must both be true.
     * Timing: currentTime >= duration - FADE_LEAD_S
     *
     * If the website isn't ready on the first cycle, the video loops and
     * this check runs again on subsequent cycles.
     */
    const onTimeUpdate = () => {
      if (dismissedRef.current) return;
      if (!videoPlayingRef.current) return;
      if (!domReadyRef.current) return;

      const dur = video.duration;
      if (!dur || !isFinite(dur)) return; // metadata not yet loaded

      if (video.currentTime >= dur - FADE_LEAD_S) {
        beginFade();
      }
    };

    /**
     * 'ended' fires when the video reaches its end (only if loop is false).
     * We removed the `loop` attribute from JSX and handle looping manually
     * so we can intercept each cycle end and decide: fade or re-loop.
     *
     * NOTE: With loop=false, if both conditions are already met when 'ended'
     * fires (as a safety net in case timeupdate missed the window), we fade.
     * Otherwise we restart the video to loop it.
     */
    const onEnded = () => {
      if (dismissedRef.current) return;
      if (videoPlayingRef.current && domReadyRef.current) {
        // Both ready — fade (timeupdate should have caught this, but just in case)
        beginFade();
      } else {
        // Website not ready yet — loop manually
        video.currentTime = 0;
        video.play().catch(() => { /* ignore */ });
      }
    };

    const onError = () => {
      if (!dismissedRef.current) {
        dismissedRef.current = true;
        setFading(true);
        setTimeout(() => setVisible(false), FADE_DURATION_MS + 50);
      }
    };

    video.addEventListener("playing",    onPlaying);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended",      onEnded);
    video.addEventListener("error",      onError);

    // ── 3. Hard safety fallback — 10 s maximum ───────────────────────────
    const fallbackTimer = setTimeout(() => {
      if (!dismissedRef.current) {
        dismissedRef.current = true;
        setFading(true);
        setTimeout(() => setVisible(false), FADE_DURATION_MS + 50);
      }
    }, 10_000);

    // Trigger playback. Muted autoplay is permitted by all modern browsers.
    video.play().catch(() => onError());

    return () => {
      window.removeEventListener("load", onWindowLoad);
      video.removeEventListener("playing",    onPlaying);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended",      onEnded);
      video.removeEventListener("error",      onError);
      clearTimeout(fallbackTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        9999,
        background:    "#000",
        opacity:       fading ? 0 : 1,
        transition:    fading ? `opacity ${FADE_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)` : "none",
        pointerEvents: fading ? "none" : "all",
        overflow:      "hidden",
        display:       "flex",
        alignItems:    "center",
        justifyContent:"center",
      }}
    >
      {/*
        loop is intentionally REMOVED.
        We handle looping manually in `onEnded` so we can intercept each
        cycle end and start the fade instead of looping when the site is ready.
      */}
      <video
        ref={videoRef}
        src="/assets/loading-intro.mp4"
        muted
        autoPlay
        playsInline
        style={{
          width:          "100%",
          height:         "100%",
          objectFit:      "contain",
          objectPosition: "center",
          display:        "block",
        }}
      />
    </div>
  );
}
