"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const Fd = "var(--font-space-grotesk,'Space Grotesk',sans-serif)";
const Fp = "var(--font-dm-sans,'DM Sans',sans-serif)";

const ALL_PROJECTS = [
  { id: "the-soundstage", num: "01", title: "The Soundstage", category: "Studio Production", year: "2024", image: "/images/cinema-set.jpg", aspect: "2.39:1", description: "Precision studio softbox illumination, camera tripod alignment, and directional spotlighting across a 3-day soundstage production.", tags: ["ARRI ALEXA 35", "Cooke S7/i", "LED Practical", "Studio"] },
  { id: "into-the-spotlight", num: "02", title: "Into the Spotlight", category: "Editorial Portrait", year: "2024", image: "/images/editorial-portrait.jpg", aspect: "1.85:1", description: "Capturing natural presence, posture, and tailoring against clean studio architecture with a single overhead pinspot.", tags: ["VENICE 2", "Zeiss Supreme", "Tungsten Key", "Fashion"] },
  { id: "night-city", num: "03", title: "Midnight in the City", category: "Narrative Feature", year: "2024", image: "/images/night-city.jpg", aspect: "2.39:1", description: "A rain-soaked Tokyo night exterior shot across 4 nights with practical neon light and technocrane dolly work.", tags: ["ALEXA Mini LF", "Leica Summilux-C", "Technocrane", "Night Ext"] },
  { id: "echo-of-sound", num: "04", title: "Echo of Sound", category: "Music Video", year: "2024", image: "/images/music-video.jpg", aspect: "1.78:1", description: "Multi-camera music video with LED practical lighting in a decommissioned industrial warehouse over two shoot days.", tags: ["RED V-RAPTOR", "Master Primes", "LED Neon", "Multi-Cam"] },
  { id: "horizon-calling", num: "05", title: "Horizon Calling", category: "Documentary", year: "2023", image: "/images/landscape.jpg", aspect: "2.39:1", description: "Golden hour aerial and handheld cinematography across the Scottish Highlands for a feature documentary.", tags: ["ALEXA 35", "Cooke Anamorphic", "Aerial", "Natural Light"] },
  { id: "steel-motion", num: "06", title: "Steel in Motion", category: "Commercial", year: "2023", image: "/images/commercial.jpg", aspect: "1.85:1", description: "Luxury automotive campaign shot in a purpose-built 40x60m studio with smoke and mirror floor.", tags: ["VENICE 2", "Sony CineAlta", "Product", "Studio"] },
];

const CATS = ["All", "Studio Production", "Editorial Portrait", "Narrative Feature", "Music Video", "Documentary", "Commercial"];

function ProjectCard({ project, index }: { project: typeof ALL_PROJECTS[0]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <article ref={ref} id={project.id} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${index * 0.08}s, transform 0.7s cubic-bezier(.16,1,.3,1) ${index * 0.08}s` }}
    >
      <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", aspectRatio: "3/2", background: "#1a1a1a", cursor: "pointer" }}>
        <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.9s cubic-bezier(.16,1,.3,1)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.22) 65%, rgba(0,0,0,0.6) 100%), linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {project.tags.slice(0, 2).map(t => <span key={t} style={{ fontFamily: Fp, fontSize: "9px", letterSpacing: "0.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", padding: "3px 8px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)" }}>{t}</span>)}
          </div>
          <span style={{ fontFamily: Fp, fontSize: "9px", color: "rgba(255,255,255,0.45)" }}>{project.aspect}</span>
        </div>
        <div style={{ position: "absolute", top: "18px", left: "20px" }}>
          <span style={{ fontFamily: Fd, fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.3)" }}>{project.num}</span>
        </div>
      </div>
      <div style={{ paddingTop: "16px" }}>
        <span style={{ display: "block", fontFamily: Fp, fontSize: "10px", fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase", color: "#8f8f8f", marginBottom: "6px" }}>{project.category} - {project.year}</span>
        <h3 style={{ fontFamily: Fd, fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 500, color: "#1a1a1a", marginBottom: "8px", letterSpacing: "-0.3px" }}>{project.title}</h3>
        <p style={{ fontFamily: Fp, fontSize: "13px", lineHeight: 1.65, color: "#8f8f8f", fontWeight: 300 }}>{project.description}</p>
      </div>
    </article>
  );
}

export default function WorkPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.category === active);
  return (
    <div style={{ background: "#f4f4f2", minHeight: "100vh", paddingTop: "140px", paddingBottom: "120px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px)" }}>
        <div style={{ marginBottom: "64px" }}>
          <p style={{ fontFamily: Fp, fontSize: "10px", letterSpacing: "1.4px", textTransform: "uppercase", color: "#8f8f8f", marginBottom: "20px" }}>Portfolio</p>
          <h1 style={{ fontFamily: Fd, fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-2px", color: "#1a1a1a", marginBottom: "24px" }}>Selected Work</h1>
          <p style={{ fontFamily: Fp, fontSize: "18px", fontWeight: 300, lineHeight: 1.7, color: "#8f8f8f", maxWidth: "480px" }}>Six years of visual storytelling across narrative, commercial, and documentary projects worldwide.</p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "56px" }}>
          {CATS.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{ padding: "8px 18px", borderRadius: "9999px", fontFamily: Fp, fontSize: "11px", fontWeight: 400, letterSpacing: "0.5px", cursor: "pointer", border: active === cat ? "1px solid #1a1a1a" : "1px solid rgba(71,71,71,0.2)", background: active === cat ? "#1a1a1a" : "transparent", color: active === cat ? "#ffffff" : "#8f8f8f", transition: "all 0.2s ease" }}>{cat}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(360px, 100%), 1fr))", gap: "48px 40px" }}>
          {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
        <div style={{ marginTop: "80px", paddingTop: "48px", borderTop: "1px solid rgba(71,71,71,0.1)" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: Fp, fontSize: "13px", letterSpacing: "0.5px", color: "#8f8f8f", textDecoration: "none" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
