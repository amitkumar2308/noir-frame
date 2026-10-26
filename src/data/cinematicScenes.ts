export interface CinematicScene {
  id: string;
  title: string;
  startProgress: number;
  endProgress: number;
  textEnter: number;
  textExit: number;
  label?: string;
  heading: string;
  subtext: string;
  textAlign: "left" | "right" | "center";
  textPosition: "top" | "middle" | "bottom";
}

/**
 * Scene boundaries calibrated against the 30-frame sequence.
 *
 * Frame -> Progress mapping: progress = frameIndex / 29
 * Key visual milestones (0-indexed):
 *   Frame   0-7  : Studio setup, lighting rigs, empty director chair
 *   Frame  8-15  : Subject steps onto the stage in suit
 *   Frame 16-22  : Subject seated, lighting and softbox adjustment
 *   Frame 23-29  : Full camera crew rolls, director monitor active
 */
export const cinematicScenes: CinematicScene[] = [
  {
    id: "studio-setup",
    title: "The Studio",
    startProgress: 0.08,
    endProgress: 0.28,
    textEnter: 0.10,
    textExit: 0.25,
    label: "BEHIND THE FRAME",
    heading: "Precision behind\nevery shot.",
    subtext: "Every light, angle, and decision shapes what the audience feels.",
    textAlign: "left",
    textPosition: "bottom",
  },
  {
    id: "in-focus",
    title: "In Focus",
    startProgress: 0.28,
    endProgress: 0.52,
    textEnter: 0.31,
    textExit: 0.48,
    label: "THE STAGE",
    heading: "Stepping into\nthe frame.",
    subtext: "From an empty set to a living moment of cinematic intention.",
    textAlign: "right",
    textPosition: "bottom",
  },
  {
    id: "the-craft",
    title: "The Craft",
    startProgress: 0.52,
    endProgress: 0.74,
    textEnter: 0.54,
    textExit: 0.70,
    label: "DIRECTION",
    heading: "Light creates\nthe feeling.",
    subtext: "Finding the angle. Balancing the shadow. Capturing the essence.",
    textAlign: "left",
    textPosition: "bottom",
  },
  {
    id: "rolling-take",
    title: "Rolling Take",
    startProgress: 0.74,
    endProgress: 0.94,
    textEnter: 0.76,
    textExit: 0.90,
    label: "THE TAKE",
    heading: "Sound, camera,\nperformance.",
    subtext: "24 frames per second. Crafted with intention. Made to be remembered.",
    textAlign: "center",
    textPosition: "bottom",
  },
];

export const TOTAL_FRAMES = 30;
export const FRAME_BASE_PATH = "/frames/";
export const FRAME_PREFIX = "frame-";
export const FRAME_EXTENSION = ".jpg";

export function getFrameUrl(index: number): string {
  const padded = String(index + 1).padStart(3, "0");
  return `${FRAME_BASE_PATH}${FRAME_PREFIX}${padded}${FRAME_EXTENSION}`;
}

export function progressToFrameIndex(progress: number): number {
  const raw = progress * (TOTAL_FRAMES - 1);
  return Math.min(Math.max(Math.round(raw), 0), TOTAL_FRAMES - 1);
}

export function getSceneAtProgress(progress: number): CinematicScene | null {
  return (
    cinematicScenes.find(
      (s) => progress >= s.startProgress && progress <= s.endProgress
    ) ?? null
  );
}

export function getSceneTextOpacity(scene: CinematicScene, progress: number): number {
  const { textEnter, textExit, startProgress, endProgress } = scene;
  const fadeDuration = 0.025;

  if (progress < textEnter) {
    const t = (progress - startProgress) / Math.max(textEnter - startProgress, 0.001);
    return Math.min(Math.max((t / fadeDuration) * fadeDuration, 0), 1);
  }
  if (progress > textExit) {
    const t = (progress - textExit) / Math.max(endProgress - textExit, 0.001);
    return Math.max(1 - t, 0);
  }

  const enterFade = (progress - textEnter) / fadeDuration;
  if (progress < textEnter + fadeDuration) return Math.min(enterFade, 1);
  return 1;
}
