"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const Fd = "var(--font-space-grotesk,'Space Grotesk',sans-serif)";
const Fp = "var(--font-dm-sans,'DM Sans',sans-serif)";

const SERVICES = [
  {
    num: "01", title: "Narrative Cinematography",
    tagline: "Feature films, short films, and episodic.",
    image: "/images/cinema-set.jpg",
    desc: "From intimate character studies to large-scale productions, I craft visual languages that serve the director's vision. My approach begins in pre-production and extends through final color.",
    deliverables: ["Visual development lookbook", "Camera and lens package spec", "On-set lighting and blocking", "DIT and dailies workflow", "Grading consultation"],
  },
  {
    num: "02", title: "Commercial Campaigns",
    tagline: "Brand films, product launches, corporate.",
    image: "/images/commercial.jpg",
    desc: "Commercial work demands precision, speed, and a keen understanding of brand identity. I deliver on-brand visuals that exceed agency expectations while remaining on schedule.",
    deliverables: ["Brand visual alignment", "Multi-day shoot management", "Product and lifestyle cinematography", "Agency and client liaison", "Same-day offline review"],
  },
  {
    num: "03", title: "Music Video Production",
    tagline: "Artist videos, live performance, concert films.",
    image: "/images/music-video.jpg",
    desc: "Music video cinematography at its finest demands rhythm, instinct, and collaboration with artists. From intimate performance pieces to full concept videos with elaborate set builds.",
    deliverables: ["Treatment and visual development", "Multi-camera configurations", "LED and practical lighting design", "Performance and narrative footage", "BTS and EPK content"],
  },
  {
    num: "04", title: "Fashion and Editorial",
    tagline: "Campaign films, lookbooks, editorial motion.",
    image: "/images/editorial-portrait.jpg",
    desc: "Fashion cinematography lives in the interplay of light and fabric. I bring a refined, editorial eye to every frame, whether shooting on location or in controlled studio environments.",
    deliverables: ["Lookbook motion direction", "Studio and location shooting", "Clothing and talent collaboration", "Fashion editorial stills hybrid", "Brand campaign assets"],
  },
  {
    num: "05", title: "Documentary",
    tagline: "Feature docs, branded content, short-form.",
    image: "/images/landscape.jpg",
    desc: "Documentary work requires adaptability, sensitivity, and an eye for the decisive moment. I shoot with an observational, intimate style that respects subjects while delivering cinema-grade imagery.",
    deliverables: ["Pre-interview scout and setup", "Verite and observational shooting", "B-roll and cutaway direction", "Aerial and motion package", "Archive and interview lighting"],
  },
];

function ServiceItem({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`, borderBottom: "1px solid rgba(71,71,71,0.1)" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "32px", alignItems: "center", padding: "40px 0", cursor: "pointer" }}>
        <div style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: "24px", alignItems: "center" }}>
          <span style={{ fontFamily: Fd, fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 500, color: "rgba(71,71,71,0.1)", lineHeight: 1 }}>{service.num}</span>
          <div>
            <h3 style={{ fontFamily: Fd, fontSize: "clamp(22px, 2.8vw, 30px)", fontWeight: 500, color: "#1a1a1a", letterSpacing: "-0.5px", marginBottom: "4px" }}>{service.title}</h3>
            <p style={{ fontFamily: Fp, fontSize: "13px", fontWeight: 300, color: "#8f8f8f" }}>{service.tagline}</p>
          </div>
        </div>
        <div style={{ width: "40px", height: "40px", borderRadius: "9999px", border: "1px solid rgba(71,71,71,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s ease" }}>
            <path d="M7 2V12M2 7H12" stroke="#474747" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div style={{ overflow: "hidden", maxHeight: open ? "600px" : "0", transition: "max-height 0.5s cubic-bezier(.16,1,.3,1)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", paddingBottom: open ? "48px" : "0" }}>
        <div>
          <div style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "16/9", marginBottom: "24px" }}>
            <img src={service.image} alt={service.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <p style={{ fontFamily: Fp, fontSize: "15px", fontWeight: 300, lineHeight: 1.8, color: "#8f8f8f" }}>{service.desc}</p>
        </div>
        <div>
          <p style={{ fontFamily: Fp, fontSize: "10px", letterSpacing: "1.4px", textTransform: "uppercase", color: "#8f8f8f", marginBottom: "20px" }}>Deliverables</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0" }}>
            {service.deliverables.map((d, i, arr) => (
              <li key={d} style={{ padding: "14px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(71,71,71,0.07)" : "none", fontFamily: Fp, fontSize: "14px", fontWeight: 300, color: "#474747", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "9999px", background: "#d6d6d6", flexShrink: 0, display: "block" }} />
                {d}
              </li>
            ))}
          </ul>
          <Link href="/#contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "32px", padding: "12px 24px", borderRadius: "9999px", background: "#1a1a1a", color: "#ffffff", fontFamily: Fp, fontSize: "13px", fontWeight: 400, textDecoration: "none" }}>
            Enquire about this service
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "140px", paddingBottom: "120px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "flex-end", marginBottom: "80px", paddingBottom: "48px", borderBottom: "1px solid rgba(71,71,71,0.1)" }}>
          <div>
            <p style={{ fontFamily: Fp, fontSize: "10px", letterSpacing: "1.4px", textTransform: "uppercase", color: "#8f8f8f", marginBottom: "20px" }}>What I Do</p>
            <h1 style={{ fontFamily: Fd, fontSize: "clamp(44px, 6vw, 72px)", fontWeight: 500, lineHeight: 1.08, letterSpacing: "-2px", color: "#1a1a1a" }}>Services</h1>
          </div>
          <p style={{ fontFamily: Fp, fontSize: "18px", fontWeight: 300, lineHeight: 1.7, color: "#8f8f8f" }}>Every project is different. Every collaboration starts with a conversation about what the work needs to feel like.</p>
        </div>
        <div>
          {SERVICES.map((s, i) => <ServiceItem key={s.num} service={s} index={i} />)}
        </div>
        <div style={{ marginTop: "80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", background: "#f4f4f2", borderRadius: "24px", padding: "48px", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: Fp, fontSize: "10px", letterSpacing: "1.4px", textTransform: "uppercase", color: "#8f8f8f", marginBottom: "16px" }}>Start a conversation</p>
            <h2 style={{ fontFamily: Fd, fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.5px", color: "#1a1a1a" }}>Ready to create something extraordinary?</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <a href="mailto:inquiries@noirframe.studio" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "14px 28px", borderRadius: "9999px", background: "#1a1a1a", color: "#ffffff", fontFamily: Fp, fontSize: "14px", fontWeight: 400, textDecoration: "none", textAlign: "center" }}>
              Get in Touch
            </a>
            <Link href="/work" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "14px 28px", borderRadius: "9999px", border: "1px solid rgba(71,71,71,0.2)", color: "#8f8f8f", fontFamily: Fp, fontSize: "14px", fontWeight: 400, textDecoration: "none", textAlign: "center" }}>
              View Work First
            </Link>
          </div>
        </div>
        <div style={{ marginTop: "48px" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: Fp, fontSize: "13px", letterSpacing: "0.5px", color: "#8f8f8f", textDecoration: "none" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
