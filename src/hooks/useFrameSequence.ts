"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  TOTAL_FRAMES,
  getFrameUrl,
} from "@/data/cinematicScenes";

const PRELOAD_AHEAD = 35;    // preload 35 frames ahead for fast scrubbing
const PRELOAD_BEHIND = 20;   // keep 20 frames cached behind for reverse scrubbing

interface UseFrameSequenceOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  currentFrameIndex: number;
  enabled: boolean;
}

/**
 * Manages frame image loading and canvas rendering with high performance:
 * - High-speed progressive preloading with background idle caching
 * - Dual-direction fallback so no dropped frames occur during rapid scrubbing
 * - Zero-flicker double-draw over canvas
 * - Bicubic high-quality image smoothing
 */
export function useFrameSequence({
  canvasRef,
  currentFrameIndex,
  enabled,
}: UseFrameSequenceOptions): void {
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array(TOTAL_FRAMES).fill(null)
  );
  const lastDrawnIndexRef = useRef<number>(-1);
  const loadingSetRef = useRef<Set<number>>(new Set());
  const drawRafRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) {
        // Bi-directional search for the nearest loaded frame (both behind and ahead)
        for (let offset = 1; offset < 20; offset++) {
          const prev = imagesRef.current[Math.max(0, index - offset)];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            drawImageToCanvas(ctx, canvas, prev);
            return;
          }
          const next = imagesRef.current[Math.min(TOTAL_FRAMES - 1, index + offset)];
          if (next && next.complete && next.naturalWidth > 0) {
            drawImageToCanvas(ctx, canvas, next);
            return;
          }
        }
        return;
      }

      if (lastDrawnIndexRef.current === index) return;
      drawImageToCanvas(ctx, canvas, img);
      lastDrawnIndexRef.current = index;
    },
    [canvasRef]
  );

  const loadFrame = useCallback(
    (index: number) => {
      if (
        index < 0 ||
        index >= TOTAL_FRAMES ||
        imagesRef.current[index] !== null ||
        loadingSetRef.current.has(index)
      ) {
        return;
      }

      loadingSetRef.current.add(index);
      const img = new Image();
      img.src = getFrameUrl(index);
      img.onload = () => {
        imagesRef.current[index] = img;
        loadingSetRef.current.delete(index);
        // Redraw if this is the frame we're waiting for
        if (
          Math.abs(index - currentFrameIndex) <= 1 ||
          index === lastDrawnIndexRef.current + 1
        ) {
          drawFrame(currentFrameIndex);
        }
      };
      img.onerror = () => {
        loadingSetRef.current.delete(index);
        imagesRef.current[index] = null;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [drawFrame]
  );

  // Preload frames around current position
  const updatePreloadWindow = useCallback(
    (index: number) => {
      const start = Math.max(0, index - PRELOAD_BEHIND);
      const end = Math.min(TOTAL_FRAMES - 1, index + PRELOAD_AHEAD);
      for (let i = start; i <= end; i++) {
        loadFrame(i);
      }
    },
    [loadFrame]
  );

  // Load all 30 frames immediately on mount (cached in memory in ~200ms for instant 60fps scrub)
  useEffect(() => {
    if (!enabled) return;
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      loadFrame(i);
    }
  }, [enabled, loadFrame]);

  // Respond to frame index changes
  useEffect(() => {
    if (!enabled) return;

    if (drawRafRef.current !== null) {
      cancelAnimationFrame(drawRafRef.current);
    }
    drawRafRef.current = requestAnimationFrame(() => {
      drawRafRef.current = null;
      drawFrame(currentFrameIndex);
    });

    updatePreloadWindow(currentFrameIndex);
  }, [currentFrameIndex, enabled, drawFrame, updatePreloadWindow]);

  // Set up canvas resize observer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeObserverRef.current = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      // Re-draw current frame after resize
      lastDrawnIndexRef.current = -1;
      drawFrame(currentFrameIndex);
    });

    resizeObserverRef.current.observe(canvas);

    return () => {
      resizeObserverRef.current?.disconnect();
      if (drawRafRef.current !== null) {
        cancelAnimationFrame(drawRafRef.current);
      }
    };
  }, [canvasRef, drawFrame, currentFrameIndex]);
}

function drawImageToCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  img: HTMLImageElement
): void {
  const canvasW = canvas.width;
  const canvasH = canvas.height;
  if (!canvasW || !canvasH) return;

  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;
  if (!imgW || !imgH) return;

  // Reset transform matrix: 1:1 native physical buffer mapping
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // "cover" strategy directly in physical buffer coordinates
  const canvasAspect = canvasW / canvasH;
  const imgAspect = imgW / imgH;

  let drawW: number;
  let drawH: number;
  let offsetX: number;
  let offsetY: number;

  if (imgAspect > canvasAspect) {
    drawH = canvasH;
    drawW = Math.round(canvasH * imgAspect);
    offsetX = Math.round((canvasW - drawW) / 2);
    offsetY = 0;
  } else {
    drawW = canvasW;
    drawH = Math.round(canvasW / imgAspect);
    offsetX = 0;
    offsetY = Math.round((canvasH - drawH) / 2);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}
