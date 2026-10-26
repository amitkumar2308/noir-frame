"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/services" },
  { label: "Showreel", href: "/#showreel" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

/**
 * Transparent Cinematic Navigation
 * Features:
 * - 100% transparent navbar throughout the entire video scrubbing experience (zero blocking bars)
 * - Seamless adaptation only when entering the light #work portfolio section
 * - Frosted glass CTA pill
 */
export default function CinematicNavigation({ forceLight = false }: { forceLight?: boolean }) {
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const heroBottom = heroEl.offsetTop + heroEl.offsetHeight - 120;
        setIsPastHero(window.scrollY >= heroBottom);
      } else {
        setIsPastHero(window.scrollY > window.innerHeight * 2.5);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // During the entire hero cinematic video, navbar is 100% transparent
  const isLight = forceLight || isPastHero;
  const navBg = isLight ? "rgba(247,247,247,0.92)" : "transparent";
  const navBackdrop = isLight ? "blur(20px)" : "none";
  const navBorder = isLight ? "1px solid rgba(71,71,71,0.08)" : "none";

  const linkColor = isLight ? "#666666" : "rgba(255,255,255,0.88)";
  const linkHover = isLight ? "#0a0a0a" : "#ffffff";
  const logoColor = isLight ? "#0a0a0a" : "#ffffff";
  const textShadow = isLight ? "none" : "0 2px 10px rgba(0,0,0,0.7)";

  const ctaBg = isLight ? "#222222" : "rgba(255,255,255,0.14)";
  const ctaColor = "#ffffff";
  const ctaBorder = isPastHero ? "1px solid transparent" : "1px solid rgba(255,255,255,0.28)";
  const ctaBackdrop = isPastHero ? "none" : "blur(12px)";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: navBg,
          backdropFilter: navBackdrop,
          WebkitBackdropFilter: navBackdrop,
          borderBottom: navBorder,
        }}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex items-center justify-between h-16 px-6 sm:px-8" style={{ maxWidth: "1280px" }}>
          {/* Logo */}
          <a
            href="#"
            aria-label="Noir Frame"
            style={{
              fontFamily: "var(--font-space-grotesk, sans-serif)",
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: logoColor,
              textShadow,
              transition: "color 0.4s ease",
              textDecoration: "none",
            }}
          >
            Noir<span style={{ opacity: isPastHero ? 0.45 : 0.65 }}>Frame</span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-10" role="menubar">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                role="menuitem"
                style={{
                  fontFamily: "var(--font-dm-sans, sans-serif)",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: linkColor,
                  textShadow,
                  transition: "color 0.2s ease",
                  lineHeight: "1.82",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = linkHover)}
                onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action / CTA */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              id="nav-cta"
              className="hidden md:inline-flex items-center transition-all duration-200"
              style={{
                padding: "8px 20px",
                borderRadius: "9999px",
                background: ctaBg,
                color: ctaColor,
                border: ctaBorder,
                backdropFilter: ctaBackdrop,
                WebkitBackdropFilter: ctaBackdrop,
                fontFamily: "var(--font-dm-sans, sans-serif)",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.4px",
                textDecoration: "none",
                boxShadow: isPastHero ? "0 4px 16px rgba(0,0,0,0.15)" : "0 4px 20px rgba(0,0,0,0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isPastHero ? "#0a0a0a" : "rgba(255,255,255,0.25)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = ctaBg;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Book a Call
            </a>

            {/* Mobile menu hamburger */}
            <button
              id="mobile-menu-toggle"
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-expanded={mobileOpen}
              aria-label="Toggle mobile menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block w-5 h-[1.5px] transition-all duration-300"
                  style={{
                    background: isPastHero ? "#474747" : "#ffffff",
                    transform:
                      i === 0 && mobileOpen
                        ? "rotate(45deg) translate(2.5px, 4px)"
                        : i === 2 && mobileOpen
                        ? "rotate(-45deg) translate(2.5px, -4px)"
                        : "none",
                    opacity: i === 1 && mobileOpen ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8 transition-all duration-300"
        style={{
          pointerEvents: mobileOpen ? "auto" : "none",
          opacity: mobileOpen ? 1 : 0,
          background: "rgba(10, 10, 10, 0.95)",
          backdropFilter: "blur(20px)",
        }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              fontFamily: "var(--font-space-grotesk, sans-serif)",
              fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
              fontWeight: 500,
              color: "#ffffff",
              textDecoration: "none",
            }}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMobileOpen(false)}
          style={{
            marginTop: "8px",
            padding: "10px 28px",
            borderRadius: "9999px",
            background: "#ffffff",
            color: "#111111",
            fontFamily: "var(--font-dm-sans, sans-serif)",
            fontSize: "13px",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Book a Call
        </a>
      </div>
    </>
  );
}