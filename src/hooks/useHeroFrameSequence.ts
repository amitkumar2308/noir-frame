"use client";

import { useEffect, useRef, useCallback } from "react";

const TOTAL_HERO_FRAMES = 196;
const PRELOAD_AHEAD = 12;
const PRELOAD_BEHIND = 4;

export function getHeroFrameUrl(index: number): string {
  const padded = String(index + 1).padStart(3, "0");
  return `/hero-frames/ezgif-frame-${padded}.jpg`;
}

interface UseHeroFrameSequenceOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  currentFrameIndex: number;
  enabled?: boolean;
}

export function useHeroFrameSequence({
  canvasRef,
  currentFrameIndex,
  enabled = true,
}: UseHeroFrameSequenceOptions): void {
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array(TOTAL_HERO_FRAMES).fill(null)
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
        // Fallback to nearest loaded frame
        for (let offset = 1; offset < 10; offset++) {
          const fallback = imagesRef.current[Math.max(0, index - offset)];
          if (fallback && fallback.complete && fallback.naturalWidth > 0) {
            drawHeroImage(ctx, canvas, fallback);
            return;
          }
        }
        return;
      }

      if (lastDrawnIndexRef.current === index) return;
      drawHeroImage(ctx, canvas, img);
      lastDrawnIndexRef.current = index;
    },
    [canvasRef]
  );

  const loadFrame = useCallback(
    (index: number) => {
      if (
        index < 0 ||
        index >= TOTAL_HERO_FRAMES ||
        imagesRef.current[index] !== null ||
        loadingSetRef.current.has(index)
      ) {
        return;
      }

      loadingSetRef.current.add(index);
      const img = new Image();
      img.src = getHeroFrameUrl(index);
      img.onload = () => {
        imagesRef.current[index] = img;
        loadingSetRef.current.delete(index);
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

  const updatePreloadWindow = useCallback(
    (index: number) => {
      const start = Math.max(0, index - PRELOAD_BEHIND);
      const end = Math.min(TOTAL_HERO_FRAMES - 1, index + PRELOAD_AHEAD);
      for (let i = start; i <= end; i++) {
        loadFrame(i);
      }
    },
    [loadFrame]
  );

  // Load first frame immediately
  useEffect(() => {
    if (!enabled) return;
    loadFrame(0);
  }, [enabled, loadFrame]);

  // Handle frame changes
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

  // Setup ResizeObserver
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeObserverRef.current = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }

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

function drawHeroImage(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  img: HTMLImageElement
): void {
  const canvasW = canvas.clientWidth || canvas.width;
  const canvasH = canvas.clientHeight || canvas.height;
  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;

  const canvasAspect = canvasW / canvasH;
  const imgAspect = imgW / imgH;

  let drawW: number, drawH: number, offsetX: number, offsetY: number;

  if (imgAspect > canvasAspect) {
    drawH = canvasH;
    drawW = canvasH * imgAspect;
    offsetX = (canvasW - drawW) / 2;
    offsetY = 0;
  } else {
    drawW = canvasW;
    drawH = canvasW / imgAspect;
    offsetX = 0;
    offsetY = (canvasH - drawH) / 2;
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}
