"use client";

import { motion } from "framer-motion";
import type { RegionWithExcerpt } from "@/lib/content";
import styles from "./WorldMap.module.css";

type Zone = {
  id: string;
  path: string;
  labelX: number;
  labelY: number;
  ribbon?: boolean;
};

/** Stylised geography: regions are the doabs — the lands between the five rivers. */
const ZONES: Zone[] = [
  {
    id: "headwaters",
    path: "M 760 95 C 790 45, 870 20, 930 35 C 980 48, 995 95, 985 150 C 975 205, 935 245, 875 230 C 825 218, 790 175, 770 140 C 758 120, 750 112, 760 95 Z",
    labelX: 878,
    labelY: 128,
  },
  {
    id: "pothohar",
    path: "M 90 120 C 160 70, 290 55, 400 75 C 480 90, 520 120, 480 160 C 430 210, 330 245, 230 280 C 150 307, 70 290, 55 235 C 45 190, 55 150, 90 120 Z",
    labelX: 262,
    labelY: 172,
  },
  {
    id: "majha",
    path: "M 860 175 C 890 195, 880 225, 830 252 C 750 295, 660 330, 570 370 C 500 400, 440 425, 410 430 C 380 435, 370 410, 395 392 C 470 345, 560 300, 650 255 C 730 215, 830 162, 860 175 Z",
    labelX: 640,
    labelY: 305,
  },
  {
    id: "sanjha-bagh",
    path: "M 700 165 C 720 175, 715 195, 690 207 C 560 268, 440 330, 330 390 C 240 437, 150 470, 80 488 C 55 494, 45 472, 68 462 C 150 432, 240 395, 340 345 C 450 290, 565 230, 670 172 C 680 167, 690 161, 700 165 Z",
    labelX: 210,
    labelY: 520,
    ribbon: true,
  },
  {
    id: "doaba",
    path: "M 935 235 C 965 260, 950 300, 900 340 C 820 400, 720 450, 620 480 C 540 503, 470 505, 450 485 C 435 468, 455 448, 500 430 C 600 390, 700 340, 790 290 C 855 255, 905 215, 935 235 Z",
    labelX: 712,
    labelY: 392,
  },
  {
    id: "malwa",
    path: "M 880 480 C 950 500, 960 560, 900 610 C 820 672, 660 700, 500 700 C 360 700, 230 680, 160 640 C 100 605, 110 560, 180 540 C 280 512, 380 520, 480 510 C 620 496, 790 455, 880 480 Z",
    labelX: 540,
    labelY: 598,
  },
];

const RIVERS: { id: string; d: string }[] = [
  { id: "Jhelum", d: "M 800 60 C 660 100, 540 150, 430 210 C 310 275, 170 320, 20 350" },
  { id: "Chenab", d: "M 860 85 C 720 145, 590 205, 470 270 C 340 340, 180 405, 20 430" },
  { id: "Ravi", d: "M 905 120 C 770 195, 650 260, 520 330 C 380 405, 200 480, 20 515" },
  { id: "Beas", d: "M 940 170 C 830 240, 720 300, 610 360 C 520 408, 420 450, 330 480" },
  { id: "Sutlej", d: "M 970 230 C 870 320, 750 400, 620 455 C 520 497, 420 495, 330 480 C 230 512, 110 560, 20 595" },
];

const MOUNTAINS = [
  "M 700 52 L 726 18 L 752 52",
  "M 750 40 L 780 4 L 810 40",
  "M 808 50 L 836 14 L 864 50",
  "M 862 38 L 894 2 L 926 38",
  "M 920 52 L 948 16 L 976 52",
];

export default function WorldMap({
  regions,
  selectedId,
  onSelect,
}: {
  regions: RegionWithExcerpt[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const byId = new Map(regions.map((r) => [r.id, r]));

  return (
    <svg
      viewBox="0 0 1000 740"
      className={styles.map}
      role="group"
      aria-label="Map of the six regions of the Panjaab watershed"
    >
      <defs>
        <radialGradient id="zoneGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.08" />
        </radialGradient>
        <linearGradient id="riverStroke" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#aedce8" />
          <stop offset="100%" stopColor="#5fa8b8" />
        </linearGradient>
        <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      {/* the mountain crown */}
      <g className={styles.mountains} aria-hidden>
        {MOUNTAINS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      {/* region zones */}
      {ZONES.map((zone, i) => {
        const region = byId.get(zone.id);
        if (!region) return null;
        const selected = selectedId === zone.id;
        return (
          <motion.g
            key={zone.id}
            className={styles.zone}
            data-hue={region.hue}
            data-selected={selected || undefined}
            data-ribbon={zone.ribbon || undefined}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6 + i * 0.12 }}
            style={{ transformOrigin: `${zone.labelX}px ${zone.labelY}px` }}
            onClick={() => onSelect(zone.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(zone.id);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`${region.name} — formerly ${region.oldName}`}
            aria-pressed={selected}
          >
            <path className={styles.zoneShape} d={zone.path} />
            <text
              className={styles.zoneLabel}
              x={zone.labelX}
              y={zone.labelY}
              textAnchor="middle"
            >
              {region.name}
            </text>
            <text
              className={`gurmukhi ${styles.zoneSub}`}
              x={zone.labelX}
              y={zone.labelY + 22}
              textAnchor="middle"
            >
              {region.punjabi}
            </text>
          </motion.g>
        );
      })}

      {/* the five rivers, drawn flowing */}
      <g className={styles.rivers} aria-hidden>
        {RIVERS.map((river, i) => (
          <motion.path
            key={river.id}
            d={river.d}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 2.2, delay: 0.7 + i * 0.18, ease: "easeInOut" },
              opacity: { duration: 0.4, delay: 0.7 + i * 0.18 },
            }}
          />
        ))}
      </g>

      {/* river names */}
      <g className={styles.riverLabels} aria-hidden>
        <text x={120} y={318} transform="rotate(-13 120 318)">Jhelum</text>
        <text x={105} y={402} transform="rotate(-11 105 402)">Chenab</text>
        <text x={130} y={492} transform="rotate(-12 130 492)">Ravi</text>
        <text x={760} y={262} transform="rotate(-28 760 262)">Beas</text>
        <text x={690} y={442} transform="rotate(-22 690 442)">Sutlej</text>
      </g>

      {/* the rising sun at the horizon */}
      <g className={styles.sun} aria-hidden>
        <circle cx="500" cy="742" r="26" />
        {Array.from({ length: 9 }).map((_, i) => {
          const angle = Math.PI + (Math.PI * (i + 1)) / 10;
          const x1 = 500 + Math.cos(angle) * 36;
          const y1 = 742 + Math.sin(angle) * 36;
          const x2 = 500 + Math.cos(angle) * 48;
          const y2 = 742 + Math.sin(angle) * 48;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
    </svg>
  );
}
