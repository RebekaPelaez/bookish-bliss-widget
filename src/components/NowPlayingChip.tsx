import { motion } from "framer-motion";

type Track = {
  track: string;
  artist: string;
  /** core accent (label, dot, equalizer, glow) */
  accent: string;
  /** disc base color */
  disc: string;
  /** subtle secondary tone for the disc highlight ring */
  discTint?: string;
};

type Props = {
  track?: string;
  artist?: string;
  accent?: string;
  disc?: string;
  discTint?: string;
};

// Per-track palette. To add a new song, drop it in here — chip retints automatically.
// `accent` tints the label, dot, equalizer, glow AND the vinyl's center label sticker.
const CURRENT: Track = {
  track: "Slow Burn",
  artist: "Kacey Musgraves",
  accent: "#4A6741",      // moss — center label color
  disc: "#0a0a0a",        // black vinyl (kept as a prop for future themes)
  discTint: "#E8E0D0",
};

export const NowPlayingChip = ({
  track = CURRENT.track,
  artist = CURRENT.artist,
  accent = CURRENT.accent,
  disc = CURRENT.disc,
  discTint = CURRENT.discTint ?? "#faf6ec",
}: Props) => {
  // Helpers for color-with-alpha (hex assumed)
  const withAlpha = (hex: string, a: number) => {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  return (
    <motion.div
      key={`${track}-${artist}`} // remount on song change → smooth retint
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="inline-flex items-center gap-3 bg-[#faf6ec]/90 backdrop-blur-md border py-1.5 pl-1.5 pr-4 rounded-full transition-shadow"
      style={{
        borderColor: withAlpha(accent, 0.2),
        boxShadow: `0 4px 14px ${withAlpha(accent, 0.18)}`,
      }}
    >
      {/* Spinning vinyl — black disc, grooves, glossy sheen sweep, colored center label */}
      <div
        className="relative size-9 rounded-full overflow-hidden shrink-0 shadow-[inset_0_0_4px_rgba(0,0,0,0.5)]"
        style={{
          border: `1px solid ${withAlpha(accent, 0.35)}`,
        }}
      >
        {/* Rotating layer: base black + radial groove rings + conic gloss sweep + center label */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              /* glossy highlight sweep */
              conic-gradient(from 0deg,
                rgba(255,255,255,0) 0deg,
                rgba(255,255,255,0.18) 30deg,
                rgba(255,255,255,0) 70deg,
                rgba(255,255,255,0) 180deg,
                rgba(255,255,255,0.10) 210deg,
                rgba(255,255,255,0) 250deg,
                rgba(255,255,255,0) 360deg),
              /* fine grooves */
              repeating-radial-gradient(circle at center,
                #1a1a1a 0px,
                #1a1a1a 1px,
                #050505 1.5px,
                #1a1a1a 2px),
              ${disc}
            `,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
        >
          {/* Center label sticker (rotates with the disc) */}
          <div
            className="absolute inset-0 m-auto size-3.5 rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle at 35% 30%, ${withAlpha(
                "#ffffff",
                0.35
              )} 0%, transparent 60%), ${accent}`,
              boxShadow: `inset 0 0 0 0.5px ${withAlpha("#000000", 0.3)}`,
            }}
          >
            {/* tiny radial tick to sell the spin */}
            <div
              className="absolute top-0.5 left-1/2 -translate-x-1/2 w-px h-1 rounded-full"
              style={{ background: withAlpha("#ffffff", 0.5) }}
            />
            {/* spindle hole */}
            <div className="size-1 rounded-full bg-[#faf6ec] shadow-[inset_0_0_1px_rgba(0,0,0,0.4)]" />
          </div>
        </motion.div>

        {/* Static top-light highlight (doesn't rotate — keeps the "glossy plastic" feel) */}
        <div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            background:
              "radial-gradient(ellipse 60% 30% at 50% 15%, rgba(255,255,255,0.2) 0%, transparent 70%)",
          }}
        />
      </div>


      <div className="flex flex-col leading-none">
        <span
          className="font-mono text-[9px] uppercase tracking-[0.18em] mb-1 flex items-center gap-1.5"
          style={{ color: withAlpha(accent, 0.85) }}
        >
          <motion.span
            className="size-1.5 rounded-full"
            style={{ background: accent }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          now spinning
        </span>
        <span className="text-[12px] font-medium text-[#2d2a1f] whitespace-nowrap">
          {track}{" "}
          <span style={{ color: withAlpha(accent, 0.7) }}>— {artist}</span>
        </span>
      </div>

      {/* Equalizer */}
      <div className="flex items-end gap-[2px] h-3.5 ml-1">
        {[0.1, 0.3, 0.2].map((delay, i) => (
          <motion.span
            key={i}
            className="w-0.5 rounded-full"
            style={{ background: accent }}
            animate={{ height: ["3px", "13px", "5px", "10px", "3px"] }}
            transition={{
              duration: 0.9 + i * 0.15,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default NowPlayingChip;
