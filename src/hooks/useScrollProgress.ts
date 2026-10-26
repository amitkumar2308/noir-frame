"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface ScrollProgressOptions {
  /**
   * The ref to the outer "scroll container" div (the tall sticky-parent section).
   * Scroll progress is normalized [0, 1] over this element's scroll distance.
   */
  containerRef: React.RefObject<HTMLElement | null>;
  /**
   * Whether to apply linear interpolation (lerp) damping for butter-smooth scrubbing.
   * Default: true
   */
  smooth?: boolean;
  /**
   * Interpolation factor between 0.05 (very floating/gradual) and 0.25 (snappy).
   * Default: 0.12 (optimal balance of responsiveness and cinematic glide).
   */
  lerp?: number;
}

/**
 * Returns a normalized scroll progress [0, 1] based on how far
 * the user has scrolled through the sticky container.
 *
 * Uses requestAnimationFrame + linear interpolation (damping) to produce
 * a silky smooth 60fps/120fps continuous progress value, eliminating mouse-wheel
 * steps and trackpad jitter.
 */
export function useScrollProgress({
  containerRef,
  smooth = true,
  lerp = 0.12,
}: ScrollProgressOptions): number {
  const [progress, setProgress] = useState(0);
  const targetRef = useRef<number>(0);
  const currentRef = useRef<number>(0);
  const animRafRef = useRef<number | null>(null);
  const loopRef = useRef<() => void>(() => {});

  const calculateTarget = useCallback(() => {
    const el = containerRef.current;
    if (!el) return targetRef.current;

    const rect = el.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return 0;

    const scrolled = Math.max(0, -rect.top);
    const raw = scrolled / scrollable;
    return Math.min(Math.max(raw, 0), 1);
  }, [containerRef]);

  useEffect(() => {
    loopRef.current = () => {
      if (!smooth) {
        currentRef.current = targetRef.current;
        setProgress(currentRef.current);
        animRafRef.current = null;
        return;
      }

      const diff = targetRef.current - currentRef.current;

      if (Math.abs(diff) < 0.0001) {
        currentRef.current = targetRef.current;
        setProgress(currentRef.current);
        animRafRef.current = null;
        return;
      }

      currentRef.current += diff * lerp;
      setProgress(currentRef.current);

      animRafRef.current = requestAnimationFrame(() => loopRef.current());
    };
  }, [smooth, lerp]);

  const onScroll = useCallback(() => {
    targetRef.current = calculateTarget();

    if (animRafRef.current === null) {
      animRafRef.current = requestAnimationFrame(() => loopRef.current());
    }
  }, [calculateTarget]);

  const onResize = useCallback(() => {
    const newTarget = calculateTarget();
    targetRef.current = newTarget;
    currentRef.current = newTarget;
    setProgress(newTarget);
  }, [calculateTarget]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    const initRaf = requestAnimationFrame(() => {
      const init = calculateTarget();
      targetRef.current = init;
      currentRef.current = init;
      setProgress(init);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(initRaf);
      if (animRafRef.current !== null) {
        cancelAnimationFrame(animRafRef.current);
      }
    };
  }, [onScroll, onResize, calculateTarget]);

  return progress;
}
