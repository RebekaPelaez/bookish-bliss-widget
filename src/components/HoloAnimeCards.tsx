import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";

type Anime = {
  id: string;
  title: string;
  subtitle: string;
  rank: string;
  status: "Watching" | "Finished";
  episodes: string;
  note: string;
  // Two-tone gradient that becomes the "art" behind the holo
  artFrom: string;
  artTo: string;
  emoji: string;
  aside?: string;
};

const ANIME: Anime[] = [
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    subtitle: "Kimetsu no Yaiba",
    rank: "S",
    status: "Finished",
    episodes: "Ep 55 / 63",
    note: "Ufotable's water-breathing sequences ruined other action anime for me.",
    artFrom: "#1a1330",
    artTo: "#7a1f3d",
    emoji: "🗡️",
  },
  {
    id: "apothecary",
    title: "Apothecary's Diaries",
    subtitle: "Kusuriya no Hitorigoto",
    rank: "A",
    status: "Finished",
    episodes: "S2 ongoing",
    note: "Maomao's clinical detachment is the protagonist energy I needed.",
    artFrom: "#1d3a2e",
    artTo: "#8b4513",
    emoji: "🌿",
  },
  {
    id: "mha",
    title: "My Hero Academia",
    subtitle: "Boku no Hero",
    rank: "B+",
    status: "Finished",
    episodes: "Ep 138",
    note: "Stayed for the Todoroki family arc. Plus Ultra forever.",
    artFrom: "#0a2540",
    artTo: "#d97706",
    emoji: "💥",
  },
  {
    id: "witch-hat",
    title: "Witch Hat Atelier",
    subtitle: "Tongari Bōshi no Atelier",
    rank: "S",
    status: "Watching",
    episodes: "Vol 12 (manga)",
    note: "Magic system based on drawing — meta-commentary on the art of manga itself.",
    artFrom: "#2d1b4e",
    artTo: "#c084fc",
    emoji: "🧙‍♂️",
  },
  {
    id: "spy-family",
    title: "Spy x Family",
    subtitle: "Supai Famirī",
    rank: "A",
    status: "Finished",
    episodes: "S2 ongoing",
    note: "Anya's facial expressions carry the entire genre of comedy on her tiny shoulders.",
    artFrom: "#3a1a2e",
    artTo: "#e8a5c0",
    emoji: "🥜",
  },
  {
    id: "seventh-loop",
    title: "7th Time Loop",
    subtitle: "Loop 7-kaime no Akujo",
    rank: "A",
    status: "Finished",
    episodes: "12 eps",
    note: "Rishe speedrunning life skills across timelines is my self-improvement fantasy.",
    artFrom: "#2a1f4e",
    artTo: "#f0c987",
    emoji: "⏳",
  },
  {
    id: "frieren",
    title: "Frieren",
    subtitle: "Beyond Journey's End",
    rank: "SSS",
    status: "Finished",
    episodes: "28 eps",
    note: "A melancholic masterpiece about the weight of quiet moments. Perfect.",
    artFrom: "#1e3a5f",
    artTo: "#a7c7e7",
    emoji: "✨",
  },
  {
    id: "sakura-card-captor",
    title: "Cardcaptor Sakura",
    subtitle: "Kādokyaputā Sakura",
    rank: "S",
    status: "Finished",
    episodes: "70 eps",
    note: "The original magical girl blueprint — pure nostalgia in pastel pink.",
    artFrom: "#3a1a4e",
    artTo: "#f9a8d4",
    emoji: "🌸",
  },
  {
    id: "avatar-tla",
    title: "Avatar: The Last Airbender",
    subtitle: "Book 1–3",
    rank: "SSS",
    status: "Finished",
    episodes: "61 eps",
    note: "Yes, technically not anime — but the world-building, the arcs, the Zuko redemption. Untouchable.",
    artFrom: "#1a3a4e",
    artTo: "#e8b76b",
    emoji: "🔥💧\n🌿🌬️",
    aside: "not anime, but…",
  },
];

const statusColor = (s: Anime["status"]) =>
  s === "Watching" ? "text-cyan-300" : "text-emerald-300";

const HoloCard = ({ anime }: { anime: Anime }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 }); // % within card
  const [active, setActive] = useState(false);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  // 3D tilt — strongest at corners, max ~14deg
  const tiltX = active ? (pos.y - 50) * -0.28 : 0;
  const tiltY = active ? (pos.x - 50) * 0.28 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      style={{ perspective: 1200 }}
      className="relative"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => {
          setActive(false);
          setPos({ x: 50, y: 50 });
        }}
        className="relative aspect-[2.5/3.5] w-full rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${active ? 1.03 : 1})`,
          transformStyle: "preserve-3d",
          transition: active
            ? "transform 0.05s linear, box-shadow 0.3s ease"
            : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease",
          boxShadow: active
            ? `0 25px 50px -12px rgba(0,0,0,0.6), 0 0 40px -10px hsl(${(pos.x + pos.y) * 1.8} 90% 60% / 0.5)`
            : "0 10px 30px -10px rgba(0,0,0,0.5)",
        }}
      >
        {/* Layer 1: base art (gradient stand-in for cover) */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${anime.artFrom} 0%, ${anime.artTo} 100%)`,
          }}
        />

        {/* Layer 2: dark vignette so foil reads */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        {/* Layer 3: HOLO — iridescent rainbow that follows cursor */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-300"
          style={{
            opacity: active ? 0.65 : 0.18,
            background: `
              radial-gradient(
                circle at ${pos.x}% ${pos.y}%,
                hsl(${pos.x * 3.6} 100% 70% / 0.9) 0%,
                hsl(${(pos.x * 3.6 + 60) % 360} 100% 65% / 0.6) 20%,
                hsl(${(pos.x * 3.6 + 180) % 360} 100% 60% / 0.4) 40%,
                transparent 70%
              )
            `,
          }}
        />

        {/* Layer 4: PRISM BANDS — diagonal rainbow streaks */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
          style={{
            opacity: active ? 0.55 : 0.08,
            background: `
              repeating-linear-gradient(
                ${115 + (pos.x - 50) * 0.4}deg,
                transparent 0px,
                rgba(255, 0, 128, 0.35) 8px,
                rgba(255, 200, 0, 0.35) 16px,
                rgba(0, 255, 200, 0.35) 24px,
                rgba(120, 80, 255, 0.35) 32px,
                transparent 40px,
                transparent 80px
              )
            `,
            backgroundPosition: `${pos.x}% ${pos.y}%`,
          }}
        />

        {/* Layer 5: SPARKLES — fine grain that catches the cursor light */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-300"
          style={{
            opacity: active ? 0.45 : 0.12,
            backgroundImage: `
              radial-gradient(circle at 20% 30%, white 0.5px, transparent 1.5px),
              radial-gradient(circle at 70% 60%, white 0.5px, transparent 1.5px),
              radial-gradient(circle at 40% 80%, white 0.5px, transparent 1.5px),
              radial-gradient(circle at 85% 20%, white 0.5px, transparent 1.5px),
              radial-gradient(circle at 15% 70%, white 0.5px, transparent 1.5px),
              radial-gradient(circle at 55% 15%, white 0.5px, transparent 1.5px),
              radial-gradient(circle at 90% 85%, white 0.5px, transparent 1.5px),
              radial-gradient(circle at 30% 50%, white 0.5px, transparent 1.5px)
            `,
            backgroundSize: "120px 120px, 90px 90px, 110px 110px, 70px 70px, 100px 100px, 80px 80px, 130px 130px, 95px 95px",
            backgroundPosition: `${pos.x * 0.3}% ${pos.y * 0.3}%, ${-pos.x * 0.2}% ${pos.y * 0.4}%, ${pos.x * 0.4}% ${-pos.y * 0.3}%, ${-pos.x * 0.3}% ${-pos.y * 0.2}%, 0 0, 50% 50%, 25% 75%, 75% 25%`,
          }}
        />

        {/* Layer 6: cursor highlight glare */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: active ? 0.4 : 0,
            background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.8) 0%, transparent 25%)`,
            mixBlendMode: "overlay",
          }}
        />

        {/* Foil card frame */}
        <div className="absolute inset-2 rounded-xl border border-white/20 pointer-events-none" />

        {/* Content */}
        <div className="absolute inset-0 z-20 p-4 flex flex-col justify-between text-white"
          style={{ transform: "translateZ(20px)" }}
        >
          {/* Top: rank + id */}
          <div className="flex justify-between items-start">
            <span className="px-2 py-1 rounded bg-black/40 backdrop-blur-md text-[10px] font-bold tracking-[0.2em] uppercase border border-white/30">
              Rank {anime.rank}
            </span>
            <span className="font-mono text-[10px] text-white/70">
              #{(ANIME.findIndex((a) => a.id === anime.id) + 1).toString().padStart(3, "0")}
            </span>
          </div>

          {/* Middle: emoji art */}
          <div className="flex-1 flex items-center justify-center drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.6))" }}
          >
            {anime.emoji.includes("\n") ? (
              <div className="grid grid-cols-2 gap-2 text-4xl">
                {anime.emoji.split(/\n|/u).filter((c) => c.trim()).map((c, i) => (
                  <span key={i} className="leading-none">{c}</span>
                ))}
              </div>
            ) : (
              <span className="text-6xl">{anime.emoji}</span>
            )}
          </div>

          {/* Bottom: details */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/60 mb-0.5 font-mono">
              {anime.subtitle}
              {anime.aside && (
                <span className="ml-1 normal-case tracking-normal italic text-white/45">· {anime.aside}</span>
              )}
            </p>
            <h3 className="text-base font-bold leading-tight mb-2 drop-shadow">
              {anime.title}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-2 border-t border-white/20">
              <div>
                <div className="text-white/50 uppercase tracking-wider text-[8px]">Status</div>
                <div className={statusColor(anime.status)}>{anime.status}</div>
              </div>
              <div className="text-right">
                <div className="text-white/50 uppercase tracking-wider text-[8px]">Eps</div>
                <div>{anime.episodes}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Note popover under card */}
      <p className="mt-4 text-xs text-center text-white/60 italic px-2 leading-relaxed">
        "{anime.note}"
      </p>
    </motion.div>
  );
};

export const HoloAnimeCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-5">
      {ANIME.map((a) => (
        <HoloCard key={a.id} anime={a} />
      ))}
    </div>
  );
};

export default HoloAnimeCards;
