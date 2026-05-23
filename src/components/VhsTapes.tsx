import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Rewind, Circle } from "lucide-react";


type Tape = {
  id: string;
  title: string;
  year: string;
  genre: string;
  runtime: string;
  note: string;
  spineColor: string;
  labelColor: string;
  accent: string;
  rotate: number;
};

const TAPES: Tape[] = [
  {
    id: "weapons",
    title: "Weapons",
    year: "2025",
    genre: "Horror / Mystery",
    runtime: "128 min",
    note: "Slow-burn dread. Watched it twice in a week.",
    spineColor: "#8B1E1E",
    labelColor: "#f4e8d0",
    accent: "#ff4d4d",
    rotate: -3,
  },
  {
    id: "obsession",
    title: "Obsession",
    year: "2025",
    genre: "Thriller",
    runtime: "112 min",
    note: "Gorgeous, uncomfortable, very rewatchable.",
    spineColor: "#4A3A6B",
    labelColor: "#ebe4d0",
    accent: "#ffd166",
    rotate: 2,
  },
  {
    id: "httyd",
    title: "How to Train Your Dragon",
    year: "2010",
    genre: "Animation / Adventure",
    runtime: "98 min",
    note: "Test Drive score = instant tears. Every time.",
    spineColor: "#1E5A7A",
    labelColor: "#f0e6cc",
    accent: "#48cae4",
    rotate: -2,
  },
];

const Tape = ({ tape }: { tape: Tape }) => {
  const [hovered, setHovered] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [playing, setPlaying] = useState(false);


  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setFlipped((f) => !f)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="relative cursor-pointer select-none"
      style={{ width: 260, height: 205, perspective: 1000 }}
    >
      {/* Rotated inner wrapper — lift + tilt + flip */}
      <motion.div
        animate={{
          y: hovered ? -10 : 0,
          rotateZ: hovered || flipped ? tape.rotate * 0.3 : tape.rotate,
          rotateY: flipped ? 180 : 0,
          scale: hovered ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        style={{ transformStyle: "preserve-3d", width: 260, height: 165 }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-[4px] overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: `linear-gradient(180deg, ${tape.spineColor} 0%, #1a1a1a 100%)`,
            boxShadow:
              `0 0 0 1px ${tape.accent}33, 0 18px 30px -12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Plastic sheen */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background:
                "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.12) 45%, transparent 60%)",
            }}
          />

          {/* Top header strip */}
          <div
            className="absolute top-0 left-0 right-0 px-3 py-1.5 flex items-center justify-between text-[8px] font-mono uppercase tracking-[0.2em]"
            style={{ background: "rgba(0,0,0,0.4)", color: tape.accent }}
          >
            <span>VHS</span>
            <span>T-120 · SP/LP/EP</span>
          </div>

          {/* Paper label */}
          <div
            className="absolute left-3 right-3 rounded-sm px-3 py-2 overflow-hidden"
            style={{
              top: 22,
              bottom: 50,
              background: `linear-gradient(180deg, ${tape.labelColor} 0%, ${tape.labelColor}dd 100%)`,
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.3)",
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 3px),
                linear-gradient(180deg, ${tape.labelColor} 0%, ${tape.labelColor}dd 100%)
              `,
            }}
          >
            <div
              className="h-1 w-12 mb-1.5 rounded-full"
              style={{ background: tape.accent }}
            />
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#3a2e1a]/60">
              {tape.genre} · {tape.runtime}
            </p>
            <h3
              className="font-serif text-[15px] leading-tight text-[#1a1408] mt-1"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {tape.title}
            </h3>
            <p className="font-mono text-[9px] text-[#3a2e1a]/70 mt-1">
              ({tape.year})
            </p>
            <p
              className="text-[10px] italic text-[#3a2e1a]/80 mt-1.5 truncate"
            >
              "{tape.note}"
            </p>
          </div>

          {/* Window with reels */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-[2px] flex items-center justify-around px-3"
            style={{
              bottom: 8,
              width: "78%",
              height: 36,
              background: "linear-gradient(180deg, #2a2a2a 0%, #1f1f1f 100%)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)",
            }}
          >
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                animate={hovered ? { rotate: 360 } : { rotate: 0 }}
                transition={{
                  duration: 3,
                  repeat: hovered ? Infinity : 0,
                  ease: "linear",
                }}
                className="relative rounded-full"
                style={{
                  width: 22,
                  height: 22,
                  background: "radial-gradient(circle, #5a5a5a 0%, #2a2a2a 70%)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)",
                }}
              >
                {[0, 60, 120].map((deg) => (
                  <div
                    key={deg}
                    className="absolute top-1/2 left-1/2 w-[14px] h-[1.5px] -translate-y-1/2 -translate-x-1/2 bg-[#0a0a0a]"
                    style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
                  />
                ))}
                <div
                  className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ background: tape.accent }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* BACK — full notes */}
        <div
          className="absolute inset-0 rounded-[4px] overflow-hidden p-4"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(180deg, ${tape.spineColor} 0%, #141414 100%)`,
            boxShadow:
              `0 0 0 1px ${tape.accent}33, 0 18px 30px -12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.5)`,
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 px-3 py-1.5 flex items-center justify-between text-[8px] font-mono uppercase tracking-[0.2em]"
            style={{ background: "rgba(0,0,0,0.4)", color: tape.accent }}
          >
            <span>SIDE B</span>
            <span>NOTES</span>
          </div>
          <div
            className="absolute left-3 right-3 top-8 bottom-3 rounded-sm px-3 py-2 overflow-y-auto"
            style={{
              background: `linear-gradient(180deg, ${tape.labelColor} 0%, ${tape.labelColor}dd 100%)`,
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 3px),
                linear-gradient(180deg, ${tape.labelColor} 0%, ${tape.labelColor}dd 100%)
              `,
            }}
          >
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#3a2e1a]/60">
              {tape.title} · {tape.year}
            </p>
            <p className="text-[11px] italic text-[#1a1408] mt-2 leading-relaxed">
              "{tape.note}"
            </p>
          </div>
        </div>
      </motion.div>

      {/* Hover transport controls */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 flex items-center justify-center gap-3"
            style={{ top: 176 }}
          >
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); }}
              className="flex items-center gap-1 px-2 py-1 rounded-sm font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-300 bg-black/60 border border-white/10 hover:text-white hover:border-white/30 transition-colors"
              aria-label="Rewind"
            >
              <Rewind size={10} className="fill-current" />
              <span>Rew</span>
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setPlaying((p) => !p); }}
              className="flex items-center gap-1 px-2 py-1 rounded-sm font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-900 bg-white/90 hover:bg-white transition-colors"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <Pause size={10} className="fill-current" />
              ) : (
                <Play size={10} className="fill-current" />
              )}
              <span>{playing ? "Pause" : "Play"}</span>
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); }}
              className="flex items-center gap-1 px-2 py-1 rounded-sm font-mono text-[9px] uppercase tracking-[0.2em] bg-black/60 border border-white/10 hover:border-white/30 transition-colors"
              style={{ color: tape.accent }}
              aria-label="Record"
            >
              <Circle size={8} className="fill-current" />
              <span>Rec</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export const VhsTapes = () => {
  return (
    <div className="flex flex-wrap justify-center gap-10 gap-y-14 py-8 px-4">
      {TAPES.map((tape) => (
        <Tape key={tape.id} tape={tape} />
      ))}
    </div>
  );
};

export default VhsTapes;
