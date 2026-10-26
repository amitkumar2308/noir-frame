"use client";

import { cinematicScenes } from "@/data/cinematicScenes";

interface SceneOverlayProps {
  progress: number;
}

function getTextOpacity(
  enter: number,
  exit: number,
  start: number,
  end: number,
  progress: number
): number {
  const FADE = 0.03;
  if (progress < start || progress > end) return 0;
  if (progress < enter) {
    return Math.min((progress - start) / Math.max(enter - start, FADE), 1);
  }
  if (progress > exit) {
    return Math.max(1 - (progress - exit) / Math.max(end - exit, FADE), 0);
  }
  const enterFade = Math.min((progress - enter) / FADE, 1);
  return enterFade;
}

/**
 * Director HUD Glass Card Overlay
 * Designed with a high-contrast dark glassmorphic container so text is 100% sharp
 * and legible over any studio or film background.
 */
export default function SceneOverlay({ progress }: SceneOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {cinematicScenes.map((scene, index) => {
        const opacity = getTextOpacity(
          scene.textEnter,
          scene.textExit,
          scene.startProgress,
          scene.endProgress,
          progress
        );

        if (opacity <= 0.001) return null;

        const isRightAligned = scene.textAlign === "right";
        const positionStyles = isRightAligned
          ? "right-6 sm:right-12 bottom-12 sm:bottom-16 text-left items-end"
          : "left-6 sm:left-12 bottom-12 sm:bottom-16 text-left items-start";

        const translateY = opacity < 1 ? 20 * (1 - opacity) : 0;

        return (
          <div
            key={scene.id}
            className={`absolute flex flex-col ${positionStyles}`}
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
              transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
            }}
          >
            {/* High-Contrast Director HUD Glass Card */}
            <div
              className="max-w-[420px] rounded-2xl md:rounded-3xl p-6 sm:p-7 pointer-events-auto"
              style={{
                background: "rgba(12, 12, 12, 0.82)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255, 255, 255, 0.16)",
                boxShadow:
                  "0 24px 60px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)",
              }}
            >
              {/* Category label badge */}
              {scene.label && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans, sans-serif)",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "1.4px",
                      textTransform: "uppercase",
                      color: "rgba(255, 255, 255, 0.88)",
                    }}
                  >
                    {scene.label}
                  </span>
                </div>
              )}

              {/* Main Scene Heading */}
              <h2
                style={{
                  fontFamily: "var(--font-space-grotesk, sans-serif)",
                  fontSize: "clamp(1.4rem, 2.8vw, 2.1rem)",
                  fontWeight: 600,
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  color: "#ffffff",
                  marginBottom: "8px",
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                }}
              >
                {scene.heading.split("\n").map((line, i) => (
                  <span key={i} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
              </h2>

              {/* Subtitle description */}
              <p
                style={{
                  fontFamily: "var(--font-dm-sans, sans-serif)",
                  fontSize: "13.5px",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "rgba(255, 255, 255, 0.78)",
                  marginBottom: "14px",
                }}
              >
                {scene.subtext}
              </p>

              {/* Cine Camera Metadata Footer */}
              <div
                className="flex items-center justify-between pt-3 border-t text-[10px] font-mono uppercase tracking-wider"
                style={{
                  borderColor: "rgba(255, 255, 255, 0.12)",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                <span>SCENE 0{index + 1} · 24 FPS</span>
                <span>4K PRORES · 2.39:1</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
