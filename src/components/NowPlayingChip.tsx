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
// (Kept here so the chip stays self-contained; lift to a prop/context later if needed.)
const CURRENT: Track = {
  track: "Slow Burn",
  artist: "Kacey Musgraves",
  accent: "#4A6741",      // moss
  disc: "#B8C9A3",        // sage
  discTint: "#E8E0D0",    // linen highlight
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
      {/* Spinning disc — solid track color with soft sheen */}
      <div
        className="relative size-9 rounded-full overflow-hidden shrink-0"
        style={{
          background: disc,
          border: `1px solid ${withAlpha(accent, 0.35)}`,
        }}
      >
        <motion.div
          className="size-full"
          style={{
            background: `radial-gradient(circle at 35% 30%, ${withAlpha(
              "#ffffff",
              0.55
            )} 0%, transparent 38%), radial-gradient(circle at 65% 70%, ${withAlpha(
              discTint,
              0.5
            )} 0%, transparent 50%), ${disc}`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        {/* center hole */}
        <div
          className="absolute inset-0 m-auto size-1.5 rounded-full bg-[#faf6ec]"
          style={{ border: `1px solid ${withAlpha(accent, 0.4)}` }}
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
