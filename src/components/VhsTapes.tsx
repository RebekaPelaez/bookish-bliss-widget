import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    spineColor: "#3a0a0a",
    labelColor: "#f4e8d0",
    accent: "#c2261f",
    rotate: -3,
  },
  {
    id: "obsession",
    title: "Obsession",
    year: "2025",
    genre: "Thriller",
    runtime: "112 min",
    note: "Gorgeous, uncomfortable, very rewatchable.",
    spineColor: "#1a1638",
    labelColor: "#ebe4d0",
    accent: "#d4af37",
    rotate: 2,
  },
  {
    id: "httyd",
    title: "How to Train Your Dragon",
    year: "2010",
    genre: "Animation / Adventure",
    runtime: "98 min",
    note: "Test Drive score = instant tears. Every time.",
    spineColor: "#0e2a3a",
    labelColor: "#f0e6cc",
    accent: "#5fb4d4",
    rotate: -2,
  },
];

const Tape = ({ tape }: { tape: Tape }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20, rotateZ: tape.rotate }}
      animate={{
        opacity: 1,
        y: hovered ? -10 : 0,
        rotateZ: hovered ? tape.rotate * 0.3 : tape.rotate,
        scale: hovered ? 1.03 : 1,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="relative cursor-pointer select-none"
      style={{ width: 260, perspective: 1000 }}
    >
      {/* Tape body */}
      <div
        className="relative rounded-[4px] overflow-hidden"
        style={{
          height: 165,
          background: `linear-gradient(180deg, ${tape.spineColor} 0%, #000 100%)`,
          boxShadow:
            "0 18px 30px -12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -2px 4px rgba(0,0,0,0.5)",
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
          className="absolute left-3 right-3 rounded-sm px-3 py-2"
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
          {/* accent bar */}
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
          <p className="text-[10px] italic text-[#3a2e1a]/80 mt-1.5 leading-snug">
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
            background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
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
                background: "radial-gradient(circle, #3a3a3a 0%, #1a1a1a 70%)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
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

      {/* Hover note */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-500 whitespace-nowrap"
          >
            ▶ play · rec · rew
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
