import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Noir Frame | Cinematographer & Visual Storyteller",
  description:
    "Award-winning cinematographer specializing in visual storytelling, film production, and cinematic experiences. Every frame tells a story.",
  keywords: "cinematographer, visual storytelling, film production, director of photography, camera operator",
  openGraph: {
    title: "Noir Frame | Cinematographer & Visual Storyteller",
    description: "Every frame tells a story. Every story starts behind the camera.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceGrotesk.variable} h-full`}>
      <body className="h-full bg-[#f7f7f7] text-[#474747] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
