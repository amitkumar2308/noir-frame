"use client";

import { useEffect, useRef, useState } from "react";

/* --- Design tokens ------------------------------------------- */
const F = { display: "var(--font-space-grotesk,'Space Grotesk',sans-serif)", primary: "var(--font-dm-sans,'DM Sans',sans-serif)" };


/* --- Animated counter ---------------------------------------- */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* --- Project data --------------------------------------------- */
const PROJECTS = [
  {
    id: "proj-1", num: "01",
    title: "The Soundstage",
    category: "Studio Production", year: "2024",
    image: "/images/cinema-set.jpg",
    aspect: "2.39:1",
    description: "Precision studio softbox illumination, camera tripod alignment, and directional spotlighting.",
    tags: ["ARRI ALEXA 35", "Cooke S7/i", "LED Practical"],
  },
  {
    id: "proj-2", num: "02",
    title: "Into the Spotlight",
    category: "Editorial Portrait", year: "2024",
    image: "/images/editorial-portrait.jpg",
    aspect: "1.85:1",
    description: "Capturing natural presence, posture, and tailoring against clean studio architecture.",
    tags: ["VENICE 2", "Zeiss Supreme", "Tungsten Key"],
  },
  {
    id: "proj-3", num: "03",
    title: "Frame & Focus",
    category: "Commercial Film", year: "2024",
    image: "/images/night-city.jpg",
    aspect: "2.39:1",
    description: "Live monitor calibration, contrast ratios, and director-to-talent communication.",
    tags: ["RED V-RAPTOR", "Master Primes", "On-Set LUT"],
  },
  {
    id: "proj-4", num: "04",
    title: "The Production Crew",
    category: "Feature Film", year: "2024",
    image: "/images/music-video.jpg",
    aspect: "1.78:1",
    description: "Multi-department synergy across sound, camera tracking, and director video assist.",
    tags: ["ALEXA Mini LF", "Leica Summilux-C", "Dolly + Steadicam"],
  },
];

/* --- Gear data ----------------------------------------------- */
const GEAR = [
  { label: "Camera Bodies", items: ["ARRI ALEXA 35", "Sony VENICE 2", "RED V-RAPTOR [X]", "ALEXA Mini LF"] },
  { label: "Prime Lenses", items: ["Cooke S7/i Full Frame", "Zeiss Supreme Prime", "Leica Summilux-C", "Sigma Cine FF"] },
  { label: "Support", items: ["ARRI Trinity Stabilizer", "Technocrane 15", "Dana Dolly System", "Ronin 4D"] },
  { label: "Lighting", items: ["Astera AX3 LED", "ARRI SkyPanel S60", "Kino Flo Celeb 450", "Tungsten HMI"] },
];

/* --- Process steps ------------------------------------------- */
const PROCESS = [
  { num: "01", title: "Visual Development", body: "Script breakdown, lookbook curation, and reference photography to establish the emotional register of the project before a single frame is shot." },
  { num: "02", title: "Camera & Lens Tests", body: "Systematic photography tests with shortlisted lenses and stocks. We lock a custom LUT and optical character for the project." },
  { num: "03", title: "On-Set Direction", body: "Collaborative communication between director, gaffe, and talent. Every lighting setup is built to serve the story — not the other way around." },
  { num: "04", title: "Color Language", body: "Post-production grading in DaVinci Resolve with colorist collaboration, delivering the precise visual mood established in pre-production." },
];

/* --- Work Card ------------------------------------------------ */
function WorkCard({ project, reverse }: { project: typeof PROJECTS[0]; reverse?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      id={project.id}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(32px, 4vw, 72px)",
        alignItems: "center",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1)",
        marginBottom: "clamp(60px, 8vw, 120px)",
      }}
    >
      {/* Image column */}
      <div
        style={{ order: reverse ? 2 : 1 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{
          position: "relative", borderRadius: "24px", overflow: "hidden",
          aspectRatio: "3/2", background: "#d6d6d6",
        }}>
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.9s cubic-bezier(.16,1,.3,1)",
            }}
          />
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.28) 70%, rgba(0,0,0,0.65) 100%), linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 24px",
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {project.tags.map(t => (
                <span key={t} style={{
                  fontFamily: F.primary, fontSize: "9px", fontWeight: 400,
                  letterSpacing: "1px", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.65)", padding: "3px 8px",
                  borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.3)",
                }}>{t}</span>
              ))}
            </div>
            <span style={{
              fontFamily: F.primary, fontSize: "9px", fontWeight: 400,
              letterSpacing: "1px", color: "rgba(255,255,255,0.5)",
            }}>{project.aspect}</span>
          </div>
        </div>
      </div>

      {/* Text column */}
      <div style={{ order: reverse ? 1 : 2 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "24px" }}>
          <span style={{
            fontFamily: F.display, fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 500,
            color: "rgba(71,71,71,0.08)", lineHeight: 1, letterSpacing: "-2px",
          }}>{project.num}</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(71,71,71,0.12)" }} />
          <span style={{
            fontFamily: F.primary, fontSize: "10px", fontWeight: 400,
            letterSpacing: "1.2px", textTransform: "uppercase", color: "#8f8f8f",
          }}>{project.year}</span>
        </div>
        <span style={{
          display: "block", fontFamily: F.primary, fontSize: "10px", fontWeight: 500,
          letterSpacing: "1.2px", textTransform: "uppercase", color: "#8f8f8f", marginBottom: "12px",
        }}>{project.category}</span>
        <h3 style={{
          fontFamily: F.display, fontSize: "clamp(28px, 3.5vw, 40px)",
          fontWeight: 500, lineHeight: 1.15, color: "#1a1a1a",
          marginBottom: "20px", letterSpacing: "-0.5px",
        }}>{project.title}</h3>
        <p style={{
          fontFamily: F.primary, fontSize: "15px", lineHeight: 1.7,
          color: "#8f8f8f", fontWeight: 300, marginBottom: "32px", maxWidth: "360px",
        }}>{project.description}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "1px", background: "#474747" }} />
          <span style={{
            fontFamily: F.primary, fontSize: "11px", fontWeight: 400,
            letterSpacing: "0.8px", textTransform: "uppercase", color: "#474747",
          }}>View Project</span>
        </div>
      </div>
    </article>
  );
}

/* --- Showreel Player ------------------------------------------ */
function ShowreelPlayer() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", borderRadius: "24px 24px 0 0", overflow: "hidden",
        aspectRatio: "16/9", background: "#0a0a0a", cursor: "pointer",
      }}
    >
      <img
        src="/images/night-city.jpg" alt="Showreel preview"
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.9s cubic-bezier(.16,1,.3,1)",
        }}
      />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.85) 100%), linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 35%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "16px",
      }}>
        <div style={{
          width: "80px", height: "80px", borderRadius: "9999px",
          background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.4s cubic-bezier(.16,1,.3,1)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ marginLeft: "4px" }}>
            <path d="M6 4L20 12L6 20V4Z" fill="#1a1a1a" />
          </svg>
        </div>
        <span style={{
          fontFamily: F.primary, fontSize: "11px", fontWeight: 400,
          letterSpacing: "1.2px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)",
        }}>Watch 2024 Reel · 2:15</span>
      </div>
      <div style={{
        position: "absolute", top: "24px", right: "24px", padding: "6px 14px",
        borderRadius: "9999px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}>
        <span style={{
          fontFamily: F.primary, fontSize: "10px", fontWeight: 400,
          letterSpacing: "1px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)",
        }}>4K · ProRes</span>
      </div>
    </div>
  );
}

/* --- Process Step --------------------------------------------- */
function ProcessStep({ step, isLast }: { step: typeof PROCESS[0]; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid", gridTemplateColumns: "80px 1fr auto",
        alignItems: "start", gap: "32px", padding: "40px 16px",
        borderBottom: isLast ? "none" : "1px solid rgba(71,71,71,0.08)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-24px)",
        transition: "opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1)",
        borderRadius: "8px",
        background: hovered ? "rgba(71,71,71,0.025)" : "transparent",
      }}
    >
      <span style={{
        fontFamily: F.display, fontSize: "clamp(32px, 4vw, 48px)",
        fontWeight: 500, color: "rgba(71,71,71,0.1)", lineHeight: 1, letterSpacing: "-1px",
      }}>{step.num}</span>
      <div>
        <h3 style={{
          fontFamily: F.display, fontSize: "clamp(20px, 2.5vw, 26px)",
          fontWeight: 500, color: "#1a1a1a", marginBottom: "12px", letterSpacing: "-0.3px",
        }}>{step.title}</h3>
        <p style={{
          fontFamily: F.primary, fontSize: "15px", fontWeight: 300,
          lineHeight: 1.75, color: "#8f8f8f", maxWidth: "560px",
        }}>{step.body}</p>
      </div>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
        style={{ marginTop: "6px", flexShrink: 0, opacity: hovered ? 0.5 : 0.15, transition: "opacity 0.3s ease" }}>
        <path d="M4 10H16M10 4L16 10L10 16" stroke="#474747" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* --- Main export ---------------------------------------------- */
export default function PortfolioSections() {
  return (
    <>
      {/* -- WORK -- */}
      <section
        id="work"
        style={{ background: "#f4f4f2", padding: "clamp(80px, 10vw, 160px) clamp(24px, 6vw, 80px)" }}
        aria-labelledby="work-heading"
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px",
            alignItems: "flex-end", marginBottom: "clamp(60px, 8vw, 100px)",
            paddingBottom: "40px", borderBottom: "1px solid rgba(71,71,71,0.1)",
          }}>
            <div>
              <p style={{ fontFamily: F.primary, fontSize: "10px", fontWeight: 400, letterSpacing: "1.4px", textTransform: "uppercase", color: "#8f8f8f", marginBottom: "24px" }}>Selected Work — 2022–2024</p>
              <h2 id="work-heading" style={{
                fontFamily: F.display, fontSize: "clamp(40px, 5.5vw, 64px)",
                fontWeight: 500, lineHeight: 1.1, letterSpacing: "-1px", color: "#1a1a1a",
              }}>Stories I&apos;ve<br />helped tell.</h2>
            </div>
            <p style={{
              fontFamily: F.primary, fontSize: "clamp(15px, 1.6vw, 18px)", fontWeight: 300,
              lineHeight: 1.7, color: "#8f8f8f", maxWidth: "340px", marginLeft: "auto",
            }}>Each project starts with a single question: what should the viewer feel when the lights come up?</p>
          </div>
          {PROJECTS.map((p, i) => <WorkCard key={p.id} project={p} reverse={i % 2 === 1} />)}

          <div style={{ textAlign: 'center', paddingTop: '24px' }}>
            <a href='/work' style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '14px 32px', borderRadius: '9999px', border: '1px solid rgba(71,71,71,0.2)', fontFamily: 'var(--font-dm-sans)', fontSize: '13px', fontWeight: 400, color: '#474747', textDecoration: 'none' }}>
              View All 6 Projects
              <svg width='14' height='14' viewBox='0 0 14 14' fill='none'><path d='M2.5 7H11.5M7.5 3L11.5 7L7.5 11' stroke='currentColor' strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* -- SHOWREEL -- */}
      <section
        id="showreel"
        style={{ background: "#111111", padding: "clamp(80px, 10vw, 140px) clamp(24px, 6vw, 80px)" }}
        aria-labelledby="showreel-heading"
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", marginBottom: "64px" }}>
            <div>
              <p style={{ fontFamily: F.primary, fontSize: "10px", fontWeight: 400, letterSpacing: "1.4px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "24px" }}>2024 Showreel</p>
              <h2 id="showreel-heading" style={{
                fontFamily: F.display, fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.5px", color: "#ffffff",
              }}>The work<br />in motion.</h2>
            </div>
            <p style={{ fontFamily: F.primary, fontSize: "16px", fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.4)" }}>
              A curated two-minute window into the cinematography — narrative, commercial, and fashion — shot across four continents.
            </p>
          </div>
          <ShowreelPlayer />
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px", background: "rgba(255,255,255,0.06)",
            marginTop: "2px", borderRadius: "0 0 24px 24px", overflow: "hidden",
          }}>
            {[
              { value: 8, suffix: "+", label: "Years on set" },
              { value: 60, suffix: "+", label: "Productions" },
              { value: 4, suffix: "", label: "Continents" },
              { value: 14, suffix: "", label: "Awards & festivals" },
            ].map(s => (
              <div key={s.label} style={{ padding: "32px 24px", background: "#1a1a1a", textAlign: "center" }}>
                <p style={{ fontFamily: F.display, fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 500, color: "#ffffff", lineHeight: 1, marginBottom: "8px" }}>
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p style={{ fontFamily: F.primary, fontSize: "10px", fontWeight: 400, letterSpacing: "1.2px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- PROCESS -- */}
      <section
        id="process"
        style={{ background: "#ffffff", padding: "clamp(80px, 10vw, 140px) clamp(24px, 6vw, 80px)" }}
        aria-labelledby="process-heading"
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "clamp(48px, 7vw, 80px)" }}>
            <p style={{ fontFamily: F.primary, fontSize: "10px", fontWeight: 400, letterSpacing: "1.4px", textTransform: "uppercase", color: "#8f8f8f", marginBottom: "24px" }}>The Process</p>
            <h2 id="process-heading" style={{
              fontFamily: F.display, fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.5px", color: "#1a1a1a",
            }}>How a project<br />comes to life.</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {PROCESS.map((step, i) => <ProcessStep key={step.num} step={step} isLast={i === PROCESS.length - 1} />)}
          </div>
        </div>
      </section>

      {/* -- ABOUT -- */}
      <section
        id="about"
        style={{ background: "#f4f4f2", padding: "clamp(80px, 10vw, 140px) clamp(24px, 6vw, 80px)" }}
        aria-labelledby="about-heading"
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 100px)", alignItems: "start" }}>
            {/* Left portrait + gear */}
            <div>
              <div style={{
                position: "relative", borderRadius: "20px", overflow: "hidden",
                aspectRatio: "4/5", background: "#d6d6d6",
              }}>
                <img src="/images/dp-portrait.jpg" alt="Director of Photography" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }} />
                <div style={{
                  position: "absolute", bottom: "28px", left: "28px", padding: "14px 20px",
                  background: "rgba(10,10,10,0.75)", backdropFilter: "blur(20px)",
                  borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)",
                }}>
                  <p style={{ fontFamily: F.display, fontSize: "16px", fontWeight: 500, color: "#ffffff", marginBottom: "2px" }}>Aryan Mehta, ISC</p>
                  <p style={{ fontFamily: F.primary, fontSize: "11px", fontWeight: 300, letterSpacing: "0.5px", color: "rgba(255,255,255,0.45)" }}>Director of Photography</p>
                </div>
              </div>
              <div style={{ marginTop: "40px" }}>
                <p style={{ fontFamily: F.primary, fontSize: "10px", fontWeight: 400, letterSpacing: "1.4px", textTransform: "uppercase", color: "#8f8f8f", marginBottom: "24px" }}>Camera Package</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                  {GEAR.map(g => (
                    <div key={g.label}>
                      <p style={{ fontFamily: F.primary, fontSize: "10px", fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase", color: "#474747", marginBottom: "8px" }}>{g.label}</p>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
                        {g.items.map(item => (
                          <li key={item} style={{ fontFamily: F.primary, fontSize: "12px", fontWeight: 300, color: "#8f8f8f", lineHeight: 1.6 }}>— {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right bio */}
            <div style={{ paddingTop: "8px" }}>
              <p style={{ fontFamily: F.primary, fontSize: "10px", fontWeight: 400, letterSpacing: "1.4px", textTransform: "uppercase", color: "#8f8f8f", marginBottom: "24px" }}>The Approach</p>
              <h2 id="about-heading" style={{
                fontFamily: F.display, fontSize: "clamp(36px, 4.5vw, 52px)",
                fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.5px", color: "#1a1a1a", marginBottom: "40px",
              }}>Light is<br />the first language.</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "56px" }}>
                {[
                  "I approach every project as a collaboration between light, motion, and story. Before a frame is shot, I ask: what does this scene need to feel like?",
                  "My work spans commercial campaigns, narrative films, music videos, and branded content — each with a distinct visual language grounded in purposeful composition and restraint.",
                  "Operating globally with dedicated cinema camera packages and modular rigging for location and soundstage productions across Mumbai, London, Dubai, and New York.",
                ].map((para, i) => (
                  <p key={i} style={{ fontFamily: F.primary, fontSize: "15px", fontWeight: 300, lineHeight: 1.8, color: "#8f8f8f" }}>{para}</p>
                ))}
              </div>
              <div style={{ borderTop: "1px solid rgba(71,71,71,0.1)", paddingTop: "40px" }}>
                <p style={{ fontFamily: F.primary, fontSize: "10px", fontWeight: 400, letterSpacing: "1.4px", textTransform: "uppercase", color: "#8f8f8f", marginBottom: "24px" }}>Capabilities</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {[
                    "Narrative & Feature Film Cinematography",
                    "Commercial & Brand Campaigns",
                    "Music Video Direction of Photography",
                    "Fashion Film & Editorial",
                    "Camera Movement & Dolly Work",
                    "Lighting Design & Gaffe Collaboration",
                    "Color Language & On-Set LUT Design",
                    "Pre-production Visual Development",
                  ].map((cap, i, arr) => (
                    <li key={cap} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "14px 0", listStyle: "none",
                      borderBottom: i < arr.length - 1 ? "1px solid rgba(71,71,71,0.07)" : "none",
                    }}>
                      <span style={{ fontFamily: F.primary, fontSize: "14px", fontWeight: 300, color: "#474747" }}>{cap}</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11" stroke="#d6d6d6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

