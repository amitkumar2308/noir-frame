"use client";

import { useState } from "react";

const F = { display: "var(--font-space-grotesk,'Space Grotesk',sans-serif)", primary: "var(--font-dm-sans,'DM Sans',sans-serif)" };

export default function ContactSection() {
  const [hoveredCta, setHoveredCta] = useState<string | null>(null);

  return (
    <>
      {/* CONTACT */}
      <section
        id="contact"
        style={{
          background: "#0a0a0a",
          padding: "clamp(100px, 12vw, 180px) clamp(24px, 6vw, 80px)",
          position: "relative", overflow: "hidden",
        }}
        aria-labelledby="contact-heading"
      >
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          background: "radial-gradient(ellipse 70% 60% at 50% 110%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }} />

        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: F.primary, fontSize: "10px", fontWeight: 400,
            letterSpacing: "1.4px", textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)", marginBottom: "40px",
          }}>Have a project in mind?</p>

          <h2 id="contact-heading" style={{
            fontFamily: F.display,
            fontSize: "clamp(44px, 7vw, 88px)",
            fontWeight: 500, lineHeight: 1.05, letterSpacing: "-2px",
            color: "#ffffff", marginBottom: "48px",
          }}>
            Let&apos;s create<br />
            <span style={{ color: "rgba(255,255,255,0.25)" }}>something</span><br />
            extraordinary.
          </h2>

          <p style={{
            fontFamily: F.primary, fontSize: "18px", fontWeight: 300,
            lineHeight: 1.7, color: "rgba(255,255,255,0.4)",
            marginBottom: "64px", maxWidth: "500px",
          }}>
            Available for narrative features, commercial campaigns, music videos,
            and bespoke visual productions worldwide.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "80px" }}>
            <a
              id="contact-cta-primary"
              href="mailto:inquiries@noirframe.studio?subject=Project%20Inquiry"
              onMouseEnter={() => setHoveredCta("primary")}
              onMouseLeave={() => setHoveredCta(null)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "14px 28px", borderRadius: "9999px",
                background: hoveredCta === "primary" ? "#f0f0f0" : "#ffffff",
                color: "#1a1a1a",
                fontFamily: F.primary, fontSize: "14px", fontWeight: 400,
                textDecoration: "none",
                transform: hoveredCta === "primary" ? "translateY(-2px)" : "translateY(0)",
                transition: "all 0.25s cubic-bezier(.16,1,.3,1)",
                boxShadow: hoveredCta === "primary" ? "0 12px 40px rgba(255,255,255,0.12)" : "none",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M1.5 3.5L7.5 8.5L13.5 3.5M1.5 3.5H13.5V11.5H1.5V3.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Start a Conversation
            </a>
            <a
              id="contact-cta-secondary"
              href="#work"
              onMouseEnter={() => setHoveredCta("secondary")}
              onMouseLeave={() => setHoveredCta(null)}
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "14px 28px", borderRadius: "9999px",
                background: "transparent",
                border: hoveredCta === "secondary" ? "1px solid rgba(255,255,255,0.35)" : "1px solid rgba(255,255,255,0.15)",
                color: hoveredCta === "secondary" ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)",
                fontFamily: F.primary, fontSize: "14px", fontWeight: 400,
                textDecoration: "none",
                transition: "all 0.25s cubic-bezier(.16,1,.3,1)",
              }}
            >
              View Selected Work
            </a>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "48px" }}>
            <div style={{ display: "flex", gap: "clamp(32px, 5vw, 72px)", flexWrap: "wrap" }}>
              {[
                { label: "Email", value: "inquiries@noirframe.studio", href: "mailto:inquiries@noirframe.studio" },
                { label: "Instagram", value: "@noirframe.cinema", href: "https://instagram.com" },
                { label: "Vimeo Pro", value: "vimeo.com/noirframe", href: "https://vimeo.com" },
              ].map((item) => (
                <a key={item.label} href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{ textDecoration: "none" }}
                >
                  <p style={{ fontFamily: F.primary, fontSize: "10px", letterSpacing: "1.2px", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "6px" }}>{item.label}</p>
                  <p style={{ fontFamily: F.primary, fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >{item.value}</p>
                </a>
              ))}
              <div>
                <p style={{ fontFamily: F.primary, fontSize: "10px", letterSpacing: "1.2px", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "6px" }}>Based in</p>
                <p style={{ fontFamily: F.primary, fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.5)" }}>Mumbai &middot; London</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#050505", padding: "32px clamp(24px, 6vw, 80px)" }} role="contentinfo">
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex", flexWrap: "wrap", alignItems: "center",
          justifyContent: "space-between", gap: "20px",
          borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "32px",
        }}>
          <a href="#" style={{ fontFamily: F.display, fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#ffffff", textDecoration: "none" }}>
            Noir<span style={{ opacity: 0.3 }}>Frame</span>
          </a>
          <div style={{ display: "flex", gap: "clamp(20px, 3vw, 40px)", flexWrap: "wrap" }}>
            {["Work", "Process", "Showreel", "About", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{
                fontFamily: F.primary, fontSize: "11px", fontWeight: 400,
                letterSpacing: "0.8px", textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s ease",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
              >{item}</a>
            ))}
          </div>
          <p style={{ fontFamily: F.primary, fontSize: "11px", fontWeight: 300, color: "rgba(255,255,255,0.2)", letterSpacing: "0.3px" }}>
            &copy; 2026 NoirFrame Studio
          </p>
        </div>
      </footer>
    </>
  );
}