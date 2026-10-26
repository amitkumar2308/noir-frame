"use client";

import { useRef } from "react";
import { useFrameSequence } from "@/hooks/useFrameSequence";
import { progressToFrameIndex } from "@/data/cinematicScenes";

interface CinematicCanvasProps {
  progress: number;
}

/**
 * HD Cinematic Canvas component
 * - Full resolution physical buffer rendering
 * - Hardware accelerated bicubic sampling
 * - Subtly enhanced micro-contrast for vivid studio fidelity
 */
export default function CinematicCanvas({ progress }: CinematicCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIndex = progressToFrameIndex(progress);

  useFrameSequence({
    canvasRef,
    currentFrameIndex: frameIndex,
    enabled: true,
  });

  return (
    <canvas
      ref={canvasRef}
      aria-label="Cinematic 4K production sequence"
      role="img"
      className="w-full h-full block"
      style={{
        imageRendering: "-webkit-optimize-contrast",
        filter: "contrast(1.03) brightness(1.02)",
      }}
    />
  );
}
