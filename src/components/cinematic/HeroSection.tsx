"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { progressToFrameIndex } from "@/data/cinematicScenes";
import SceneOverlay from "./SceneOverlay";

const CinematicCanvas = dynamic(() => import("./CinematicCanvas"), {
  ssr: false,
  loading: () => <div className="w-full h-full" style={{ background: "#0a0a0a" }} />,
});

/**
 * Unified Hero & Cinematic Scroll Experience
 * Features:
 * - 1:1 Physical Buffer HD Rendering of public/frames (30 frames)
 * - Crystal clear text readability via glassmorphic HUD cards and soft contrast backdrops
 * - Clean, non-muddy 35mm optical vignette preserving center HD vibrancy
 * - Butter-smooth linear interpolation (lerp) scrubbing
 */
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress({
    containerRef: containerRef as React.RefObject<HTMLElement>,
    smooth: true,
    lerp: 0.12,
  });

  const frameNum = progressToFrameIndex(progress) + 1;

  // Hero headline opacity: 1 at rest, fades out smoothly between 0 and 0.075 progress
  const heroOpacity = Math.max(0, 1 - progress / 0.075);
  const heroTranslateY = -progress * 260;

  // Scrim opacity: only active while hero headline is present, disappears completely as video scrubs
  const heroScrimOpacity = heroOpacity * 0.85;

  // HUD opacity: fades in after progress 0.05, fades out smoothly before transition to work
  const hudEnter = Math.min(1, Math.max(0, (progress - 0.05) / 0.04));
  const hudExit = progress > 0.94 ? Math.max(0, (0.985 - progress) / 0.045) : 1;
  const hudOpacity = hudEnter * hudExit;

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!containerRef.current) return;
    const top = containerRef.current.offsetTop;
    const target = top + window.innerHeight * 0.75;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative"
      style={{ height: "340vh" }}
      aria-label="Noir Frame — Cinematographer & Visual Storyteller"
    >
      {/* Anchor for Process nav link */}
      <div id="cinematic" className="absolute top-[60vh]" />

      {/* Sticky full-bleed cinema stage */}
      <div
        className="sticky top-0 w-full h-[100vh] overflow-hidden flex flex-col items-center justify-center text-center"
        style={{ background: "#0a0a0a" }}
      >
        {/* Cinematic Canvas rendering public/frames in razor-sharp HD */}
        <div className="absolute inset-0 z-0">
          <CinematicCanvas progress={progress} />
        </div>

        {/* ── CINEMATIC VIGNETTE SYSTEM (HD Tuned — Center Stays Clear & Bright) ── */}

        {/* 1. Primary 35mm Optical Radial Falloff (center 52% completely untouched for HD clarity) */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background:
              "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 52%, rgba(5,5,5,0.22) 75%, rgba(5,5,5,0.65) 90%, rgba(0,0,0,0.95) 100%)",
          }}
          aria-hidden="true"
        />

        {/* 2. Top Cinemascope Letterbox & Navigation Blend */}
        <div
          className="absolute inset-x-0 top-0 h-36 pointer-events-none z-[6]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.55) 45%, rgba(5,5,5,0.12) 80%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* 3. Bottom Cinemascope Letterbox & Stage Blend */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-[6]"
          style={{
            background:
              "linear-gradient(to top, rgba(5,5,5,0.94) 0%, rgba(5,5,5,0.6) 45%, rgba(5,5,5,0.15) 80%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* 4. Left & Right Anamorphic Lens Edge Falloff */}
        <div
          className="absolute inset-0 pointer-events-none z-[6]"
          style={{
            background:
              "linear-gradient(to right, rgba(5,5,5,0.75) 0%, rgba(5,5,5,0.25) 10%, transparent 22%, transparent 78%, rgba(5,5,5,0.25) 90%, rgba(5,5,5,0.75) 100%)",
          }}
          aria-hidden="true"
        />

        {/* 5. Four-Corner Optical Barrel Shading */}
        <div
          className="absolute inset-0 pointer-events-none z-[6]"
          style={{
            background:
              "radial-gradient(circle 420px at 0% 0%, rgba(0,0,0,0.85) 0%, transparent 70%), " +
              "radial-gradient(circle 420px at 100% 0%, rgba(0,0,0,0.85) 0%, transparent 70%), " +
              "radial-gradient(circle 420px at 0% 100%, rgba(0,0,0,0.9) 0%, transparent 70%), " +
              "radial-gradient(circle 420px at 100% 100%, rgba(0,0,0,0.9) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* 6. Dynamic Scrim for Hero Headline (Active only at scroll 0, completely disappears on scrub) */}
        <div
          className="absolute inset-0 pointer-events-none z-[6] transition-opacity duration-300"
          style={{
            opacity: heroScrimOpacity,
            background:
              "radial-gradient(ellipse 75% 65% at 50% 48%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* 7. Organic 35mm Fine Film Grain (Subtle 6% opacity — zero blur) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06] mix-blend-overlay z-[7]"
          aria-hidden="true"
        >
          <filter id="hero-unified-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-unified-grain)" />
        </svg>

        {/* ── HERO HEADLINE OVERLAY (High Contrast & Crystal Clear) ─────── */}
        <div
          className="relative z-10 max-w-3xl mx-auto pt-16 px-8"
          style={{
            opacity: heroOpacity,
            transform: `translateY(${heroTranslateY}px)`,
            pointerEvents: heroOpacity <= 0.02 ? "none" : "auto",
            transition: "opacity 0.15s ease-out",
          }}
        >
          {/* Category glass pill badge */}
          <div className="inline-block mb-6">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 18px",
                borderRadius: "9999px",
                background: "rgba(0,0,0,0.65)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
                fontSize: "10.5px",
                fontWeight: 500,
                letterSpacing: "1.4px",
                textTransform: "uppercase",
                color: "#ffffff",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Cinematography &nbsp;·&nbsp; Visual Storytelling &nbsp;·&nbsp; Film Production
            </span>
          </div>

          {/* Main headline with deep high-contrast text shadow */}
          <h1
            id="hero-heading"
            style={{
              fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)",
              fontSize: "clamp(2.8rem, 8vw, 5.8rem)",
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "-0.015em",
              color: "#ffffff",
              marginBottom: "20px",
              textShadow:
                "0 3px 6px rgba(0,0,0,0.9), 0 8px 32px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.6)",
            }}
          >
            Every frame
            <br />
            <span style={{ color: "rgba(255,255,255,0.65)" }}>tells a story.</span>
          </h1>

          {/* Subtitle with high-contrast text shadow */}
          <p
            style={{
              fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
              fontSize: "clamp(16px, 2vw, 20px)",
              fontWeight: 400,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.85)",
              marginBottom: "40px",
              maxWidth: "460px",
              margin: "0 auto 40px",
              textShadow: "0 2px 10px rgba(0,0,0,0.95), 0 4px 24px rgba(0,0,0,0.8)",
            }}
          >
            Behind the camera.
            <br />
            Beyond the ordinary.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#cinematic"
              id="hero-cta-explore"
              onClick={handleExploreClick}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 24px",
                borderRadius: "9999px",
                background: "#ffffff",
                color: "#111111",
                fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0px",
                lineHeight: 1.3,
                textDecoration: "none",
                boxShadow: "0 6px 24px rgba(0,0,0,0.5)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0f0f0";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Watch the Process
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path
                  d="M6 2L6 10M6 10L2.5 6.5M6 10L9.5 6.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </a>
            <a
              href="#work"
              id="hero-cta-work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 24px",
                borderRadius: "9999px",
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "#ffffff",
                fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "0px",
                lineHeight: 1.3,
                textDecoration: "none",
                boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
                e.currentTarget.style.background = "rgba(0,0,0,0.75)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                e.currentTarget.style.background = "rgba(0,0,0,0.55)";
              }}
            >
              View Work
            </a>
          </div>
        </div>

        {/* Scroll Cue at bottom of Hero (visible at rest) */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
          style={{ opacity: heroOpacity * 0.9 }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
              fontSize: "10px",
              letterSpacing: "1.4px",
              textTransform: "uppercase",
              color: "#ffffff",
              fontWeight: 500,
              textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            }}
          >
            Scroll to scrub frames
          </span>
          <div className="w-px h-10 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.25)" }}>
            <div
              className="absolute top-0 left-0 w-full h-1/3"
              style={{ background: "#ffffff", animation: "heroPulse 2.2s ease-in-out infinite" }}
            />
          </div>
        </div>

        {/* Director Viewfinder HUD (activates as user scrubs frames) */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            opacity: hudOpacity,
            transition: "opacity 0.25s ease",
          }}
        >
          {/* Top Left: REC dot & timecode badge */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2.5 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/15 bg-black/60 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-white font-bold">
              REC
            </span>
            <span className="text-[11px] font-mono text-white/70 tracking-wider hidden sm:inline">
              00:01:24:18
            </span>
          </div>

          {/* Top Right: Aspect ratio & Cinema spec badge */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/15 bg-black/60 shadow-lg">
            <span className="text-[10px] md:text-[11px] font-mono tracking-widest uppercase text-white/95 font-semibold">
              2.39:1
            </span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="text-[11px] font-mono tracking-wider text-white/70">
              4K · 24 FPS
            </span>
          </div>

          {/* Bottom Right: Frame counter */}
          <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-right">
            <span
              className="text-[10px] md:text-[11px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full backdrop-blur-md border shadow-lg"
              style={{
                background: "rgba(0,0,0,0.68)",
                color: "rgba(255,255,255,0.95)",
                borderColor: "rgba(255,255,255,0.18)",
              }}
            >
              FRAME {String(frameNum).padStart(2, "0")} / 30
            </span>
          </div>

          {/* Viewfinder Corner Framing Brackets */}
          <div className="absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-white/40" />
          <div className="absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-white/40" />
          <div className="absolute bottom-5 left-5 w-4 h-4 border-b-2 border-l-2 border-white/40" />
          <div className="absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 border-white/40" />

          {/* Center Crosshair Mark */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25"
            aria-hidden="true"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="10" y1="2" x2="10" y2="18" stroke="white" strokeWidth="1" />
              <line x1="2" y1="10" x2="18" y2="10" stroke="white" strokeWidth="1" />
            </svg>
          </div>

          {/* Narrative Scene Overlay (High-Contrast Glass Cards) */}
          <SceneOverlay progress={progress} />
        </div>

        {/* Minimal Progress Scrub Bar at very bottom */}
        <div
          className="absolute bottom-0 left-0 h-[2.5px] transition-none pointer-events-none z-30"
          style={{
            width: `${progress * 100}%`,
            background: "linear-gradient(to right, rgba(255,255,255,0.2), #ffffff)",
            boxShadow: "0 0 10px rgba(255,255,255,0.6)",
            opacity: hudOpacity,
          }}
        />
      </div>
    </section>
  );
}
