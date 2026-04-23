import { useState } from "react";
import { motion } from "framer-motion";

type Vinyl = {
  id: string;
  album: string;
  artist: string;
  year: number;
  index: string;
  labelColor: string; // hex
  sleeveImg: string;
};

const RECORDS: Vinyl[] = [
  {
    id: "1",
    album: "Loveless",
    artist: "My Bloody Valentine",
    year: 1991,
    index: "OP-122",
    labelColor: "#c44a3a",
    sleeveImg: "https://picsum.photos/seed/vinyl1/400/400",
  },
  {
    id: "2",
    album: "Blue",
    artist: "Joni Mitchell",
    year: 1971,
    index: "OP-123",
    labelColor: "#3a5a7a",
    sleeveImg: "https://picsum.photos/seed/vinyl2/400/400",
  },
  {
    id: "3",
    album: "Lonerism",
    artist: "Tame Impala",
    year: 2012,
    index: "OP-124",
    labelColor: "#d4a64a",
    sleeveImg: "https://picsum.photos/seed/vinyl3/400/400",
  },
  {
    id: "4",
    album: "Dummy",
    artist: "Portishead",
    year: 1994,
    index: "OP-125",
    labelColor: "#4a5a3a",
    sleeveImg: "https://picsum.photos/seed/vinyl4/400/400",
  },
];

export const VinylRecords = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
      {RECORDS.map((r, i) => {
        const isActive = active === r.id;
        return (
          <div
            key={r.id}
            className="relative group cursor-pointer"
            onMouseEnter={() => setActive(r.id)}
            onMouseLeave={() => setActive((cur) => (cur === r.id ? null : cur))}
            onClick={() =>
              setActive((cur) => (cur === r.id ? null : r.id))
            }
          >
            {/* Sleeve */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative z-10 aspect-square bg-[#faf6ec] border border-[#4a5a3a]/25 shadow-[3px_3px_0_rgba(74,90,58,0.12)] overflow-hidden"
            >
              <img
                src={r.sleeveImg}
                alt={`${r.album} sleeve`}
                className="w-full h-full object-cover grayscale contrast-110 mix-blend-multiply opacity-95"
                loading="lazy"
              />
              {/* paper overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#faf6ec]/10 via-transparent to-[#4a5a3a]/15 pointer-events-none" />
              {/* index sticker */}
              <div className="absolute bottom-2.5 left-2.5 bg-[#faf6ec] px-1.5 py-0.5 border border-[#2d2a1f] font-mono text-[9px] font-bold tracking-wider text-[#2d2a1f]">
                {r.index}
              </div>
              {/* center hole hint on sleeve */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-1 rounded-full bg-[#2d2a1f]/40" />
            </motion.div>

            {/* Vinyl record */}
            <motion.div
              className="absolute top-1 left-1 w-[calc(100%-8px)] aspect-square rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, #1a1a1a 28%, #0a0a0a 28.5%, #1a1a1a 30%, #0a0a0a 30.5%, #1a1a1a 32%, #0a0a0a 32.5%, #151515 100%)",
                boxShadow:
                  "inset 0 0 30px rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.35)",
              }}
              animate={{
                x: isActive ? "55%" : "0%",
                rotate: isActive ? 360 : 0,
              }}
              transition={{
                x: { duration: 0.7, ease: [0.34, 1.2, 0.64, 1] },
                rotate: isActive
                  ? { duration: 4, repeat: Infinity, ease: "linear" }
                  : { duration: 0.4 },
              }}
            >
              {/* grooves */}
              <div className="absolute inset-[12%] rounded-full border border-white/5" />
              <div className="absolute inset-[20%] rounded-full border border-white/5" />
              <div className="absolute inset-[28%] rounded-full border border-white/5" />
              {/* center label */}
              <div
                className="absolute inset-0 m-auto size-[36%] rounded-full flex items-center justify-center shadow-inner"
                style={{ backgroundColor: r.labelColor }}
              >
                <div className="text-center px-1">
                  <p className="font-mono text-[7px] uppercase tracking-wider text-white/90 leading-tight">
                    {r.artist}
                  </p>
                  <p className="font-mono text-[6px] text-white/60 mt-0.5">
                    {r.year}
                  </p>
                </div>
                {/* spindle hole */}
                <div className="absolute size-1.5 rounded-full bg-[#faf6ec]" />
              </div>
            </motion.div>

            {/* Caption */}
            <div className="mt-4 relative z-20">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#4a5a3a]/70 mb-0.5">
                {r.year}
              </p>
              <h3 className="text-base font-serif text-[#2d2a1f] leading-tight">
                {r.album}
              </h3>
              <p className="text-[11px] text-[#4a5a3a]/80 italic">
                {r.artist}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VinylRecords;
