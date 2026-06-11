import type { Metadata } from "next";
import { Fraunces, Newsreader, Tiro_Gurmukhi } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--fraunces",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--newsreader",
});

const tiro = Tiro_Gurmukhi({
  subsets: ["gurmukhi"],
  weight: "400",
  variable: "--tiro",
});

export const metadata: Metadata = {
  title: "Chardi Kala — Sikhi in the 21st Century",
  description:
    "A modern home for learning Sikhi: the complete Sri Guru Granth Sahib with English translation, Sikh history, a living encyclopedia, and essays on representation, empathy, environmentalism, and acceptance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${newsreader.variable} ${tiro.variable}`}
    >
      <body>
        <Nav />
        {children}
        <footer
          style={{
            textAlign: "center",
            padding: "3.5rem 1.5rem 4rem",
            color: "var(--muted)",
            fontStyle: "italic",
            fontSize: "0.98rem",
          }}
        >
          <span className="gurmukhi" style={{ color: "var(--saffron)", fontStyle: "normal" }}>
            ਚੜ੍ਹਦੀ ਕਲਾ
          </span>
          {" · "}Nothing is finished. The rising is the point.{" · "}
          <a href="/about" style={{ borderBottom: "1px solid var(--line)" }}>
            About &amp; sources
          </a>
        </footer>
      </body>
    </html>
  );
}
