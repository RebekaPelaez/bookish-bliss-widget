import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Star } from "lucide-react";

export type TicketInteraction = "tear" | "lift" | "shuffle" | "flip";

type Film = {
  id: string;
  title: string;
  director: string;
  date: string;
  screen: string;
  seat: string;
  rating: number;
  note: string;
  scene: string;
  watchedOn: string;
  rotate: number;
};

const FILMS: Film[] = [
  {
    id: "lotr",
    title: "The Lord of the Rings",
    director: "Peter Jackson",
    date: "August 10, 2013  17:00",
    screen: "Screen 4",
    seat: "Seats B1-4",
    rating: 5,
    note: "The one I rewatch every winter. Comfort in 12 hours.",
    scene: "Lighting of the beacons.",
    watchedOn: "Rewatched 14×",
    rotate: -4,
  },
  {
    id: "wild",
    title: "Wild",
    director: "Jean-Marc Vallée",
    date: "August 10, 2013  17:00",
    screen: "Screen 4",
    seat: "Seats B1-4",
    rating: 4,
    note: "Watched it the week I quit my first job. Still hits.",
    scene: "The fox at the end.",
    watchedOn: "First watched 2015",
    rotate: 3,
  },
  {
    id: "kungfu",
    title: "Kung Fu Panda",
    director: "Mark Osbourne, John Stevenson",
    date: "July 4, 2008  19:00",
    screen: "Screen 1",
    seat: "Seats D1-2",
    rating: 5,
    note: "There is no secret ingredient. A whole design philosophy.",
    scene: "Peach tree of heavenly wisdom.",
    watchedOn: "Comfort food, weekly",
    rotate: -2,
  },
  {
    id: "interstellar",
    title: "Interstellar",
    director: "Christopher Nolan",
    date: "August 10, 2013  17:00",
    screen: "Screen 4",
    seat: "Seats B1-4",
    rating: 5,
    note: "I cried at a bookshelf. Worth every minute.",
    scene: "Docking sequence — no notes.",
    watchedOn: "IMAX, 3 times",
    rotate: 4,
  },
];

// Realistic paper background — coffee-stain ready, subtle grain
const PAPER_BG = `
  radial-gradient(ellipse at 20% 15%, rgba(180,140,80,0.08), transparent 40%),
  radial-gradient(ellipse at 85% 80%, rgba(120,90,40,0.06), transparent 45%),
  radial-gradient(circle at 70% 30%, rgba(160,120,60,0.04), transparent 25%),
  linear-gradient(180deg, #f5ecd7 0%, #efe4c6 100%)
`;

const PAPER_GRAIN = `
  repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(120,90,50,0.015) 2px, rgba(120,90,50,0.015) 3px),
  repeating-linear-gradient(90deg, transparent 0px, transparent 2px, rgba(120,90,50,0.015) 2px, rgba(120,90,50,0.015) 3px)
`;

const TicketStars = ({ n }: { n: number }) => (
  <div className="flex gap-0.5 justify-center">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className="w-2.5 h-2.5"
        fill={i < n ? "#7a5a2e" : "transparent"}
        stroke="#7a5a2e"
        strokeWidth={1.5}
      />
    ))}
  </div>
);

/* Single ticket — renders differently per interaction */
const Ticket = ({
  film,
  mode,
  isOpen,
  onToggle,
  zBoost,
}: {
  film: Film;
  mode: TicketInteraction;
  isOpen: boolean;
  onToggle: () => void;
  zBoost: number;
}) => {
  const [hovered, setHovered] = useState(false);

  // ---- LIFT mode: hover lifts + tilts toward cursor (simple tilt)
  const liftAnim =
    mode === "lift" && hovered
      ? { y: -10, rotateZ: film.rotate * 0.3, scale: 1.03 }
      : { y: 0, rotateZ: film.rotate, scale: 1 };

  // ---- SHUFFLE: clicked one comes to top with a little hop
  const shuffleAnim =
    mode === "shuffle" && isOpen
      ? { y: -16, rotateZ: 0, scale: 1.05 }
      : { y: 0, rotateZ: film.rotate, scale: 1 };

  // ---- FLIP: rotateY 180 to show back
  const flipAnim =
    mode === "flip"
      ? { rotateY: isOpen ? 180 : 0, rotateZ: film.rotate }
      : { rotateZ: film.rotate };

  const animate =
    mode === "lift"
      ? liftAnim
      : mode === "shuffle"
      ? shuffleAnim
      : mode === "flip"
      ? flipAnim
      : { rotateZ: film.rotate };

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onToggle}
      initial={{ opacity: 0, y: 20, rotateZ: film.rotate }}
      animate={{ opacity: 1, ...animate }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="relative cursor-pointer select-none"
      style={{
        width: 200,
        zIndex: isOpen ? 50 : zBoost,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
    >
      {/* Washi tape strip top-left */}
      <div
        className="absolute -top-2 -left-3 w-14 h-5 rotate-[-18deg] z-20 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(45deg, rgba(180,170,140,0.55) 0 4px, rgba(200,190,160,0.45) 4px 8px)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        }}
      />

      {/* FRONT */}
      <div
        className="relative"
        style={{
          backfaceVisibility: "hidden",
          transform: mode === "flip" && isOpen ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <TicketFace film={film} side="front" mode={mode} isOpen={isOpen} />
      </div>

      {/* BACK (only rendered for flip mode) */}
      {mode === "flip" && (
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <TicketFace film={film} side="back" mode={mode} isOpen={isOpen} />
        </div>
      )}

      {/* Detail popover for lift / shuffle modes */}
      <AnimatePresence>
        {isOpen && (mode === "lift" || mode === "shuffle") && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-20 w-52 px-3 py-2 rounded-md text-[10.5px] leading-snug text-center z-50"
            style={{
              background: "#3a2e1a",
              color: "#f5ecd7",
              boxShadow: "0 8px 20px -8px rgba(0,0,0,0.35)",
            }}
          >
            <p className="italic">"{film.scene}"</p>
            <p className="opacity-70 mt-1 text-[9px] uppercase tracking-widest">
              {film.watchedOn}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* The visual ticket face — used for front, back, and tear modes */
const TicketFace = ({
  film,
  side,
  mode,
  isOpen,
}: {
  film: Film;
  side: "front" | "back";
  mode: TicketInteraction;
  isOpen: boolean;
}) => {
  // For tear mode the right "stub" tears away
  const showStub = mode !== "tear" || !isOpen;

  return (
    <div
      className="relative flex"
      style={{
        filter: "drop-shadow(0 6px 10px rgba(60,40,10,0.18))",
      }}
    >
      {/* Main ticket body */}
      <div
        className="relative px-5 py-5 flex-1"
        style={{
          background: PAPER_BG,
          // Perforated edges via mask — top & bottom sawtooth
          WebkitMask:
            "radial-gradient(circle 4px at 4px 50%, transparent 98%, #000 100%) -4px 0/8px 12px repeat-y, radial-gradient(circle 4px at calc(100% - 4px) 50%, transparent 98%, #000 100%) calc(100% + 4px) 0/8px 12px repeat-y, linear-gradient(#000,#000)",
          WebkitMaskComposite: "source-over",
          minHeight: 230,
        }}
      >
        {/* grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60 mix-blend-multiply"
          style={{ background: PAPER_GRAIN }}
        />
        {/* coffee stain */}
        <div
          className="absolute pointer-events-none rounded-full opacity-30"
          style={{
            top: 12,
            right: 14,
            width: 28,
            height: 28,
            background:
              "radial-gradient(ellipse, rgba(120,80,30,0.35) 0%, rgba(120,80,30,0.15) 60%, transparent 80%)",
            filter: "blur(0.5px)",
          }}
        />
        {/* fold crease */}
        <div
          className="absolute inset-y-0 pointer-events-none opacity-30"
          style={{
            left: "38%",
            width: 1,
            background:
              "linear-gradient(to bottom, transparent, rgba(120,90,50,0.4), transparent)",
          }}
        />

        {side === "front" ? (
          <div className="relative text-[#3a2e1a] text-center font-mono">
            <Camera className="w-4 h-4 mx-auto mb-1 opacity-80" />
            <p className="text-[9px] uppercase tracking-[0.3em] opacity-70 mb-3">
              Cinema
            </p>
            <h3 className="text-sm font-bold leading-tight mb-1">{film.title}</h3>
            <p className="text-[10px] mb-1">Director: {film.director}</p>
            <p className="text-[10px] opacity-80 mb-3">{film.date}</p>

            <div className="flex justify-between text-[8px] uppercase tracking-wider border-t border-b border-[#7a5a2e]/40 py-1.5 mb-2">
              <span>{film.screen}</span>
              <span>{film.seat}</span>
              <span>Sec 10</span>
            </div>

            <p className="text-[9px] tracking-widest mb-1">812308A8390</p>
            {/* Barcode */}
            <div className="flex justify-center gap-[1px] h-6 items-end">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i % 3 === 0 ? 2 : 1,
                    height: 18 + ((i * 7) % 6),
                    background: "#3a2e1a",
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          // BACK FACE — handwritten notes
          <div className="relative text-[#3a2e1a] text-center font-mono">
            <p className="text-[9px] uppercase tracking-[0.3em] opacity-70 mb-3">
              Back of stub
            </p>
            <h3 className="text-sm font-bold mb-2">{film.title}</h3>
            <TicketStars n={film.rating} />
            <p className="text-[11px] italic mt-3 leading-relaxed px-1">
              "{film.note}"
            </p>
            <p className="mt-3 text-[9px] uppercase tracking-widest opacity-70">
              {film.watchedOn}
            </p>
            <div className="mt-3 text-[10px] opacity-80">
              fav scene: <span className="italic">{film.scene}</span>
            </div>
          </div>
        )}
      </div>

      {/* Tear-off stub on the right (animated for tear mode) */}
      <AnimatePresence>
        {showStub && (
          <motion.div
            initial={mode === "tear" ? { x: 0, rotateZ: 0, opacity: 1 } : false}
            animate={{ x: 0, rotateZ: 0, opacity: 1 }}
            exit={
              mode === "tear"
                ? { x: 60, y: 30, rotateZ: 25, opacity: 0 }
                : { opacity: 0 }
            }
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative px-2 py-5 flex flex-col items-center justify-center gap-2 border-l-2 border-dashed border-[#7a5a2e]/50"
            style={{
              background: PAPER_BG,
              minHeight: 230,
              width: 36,
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-60 mix-blend-multiply"
              style={{ background: PAPER_GRAIN }}
            />
            <p
              className="text-[8px] uppercase tracking-[0.2em] text-[#3a2e1a]"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Admit One · {film.id.toUpperCase()}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revealed note when stub is torn */}
      {mode === "tear" && isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-[-130px] top-1/2 -translate-y-1/2 w-32 px-3 py-2 rounded-md text-[10px] leading-snug font-mono"
          style={{
            background: "#3a2e1a",
            color: "#f5ecd7",
            boxShadow: "0 8px 20px -8px rgba(0,0,0,0.35)",
          }}
        >
          <p className="italic">"{film.scene}"</p>
          <p className="mt-1 opacity-70 text-[9px] uppercase tracking-widest">
            {film.watchedOn}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export const FilmTickets = ({
  interaction = "lift",
}: {
  interaction?: TicketInteraction;
}) => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div
      className="relative flex flex-wrap justify-center gap-x-2 gap-y-10 py-8 px-4 sm:px-8"
      style={{ perspective: 1400 }}
    >
      {FILMS.map((film, i) => (
        <div key={film.id} className="relative" style={{ marginTop: i % 2 === 0 ? 0 : 20 }}>
          <Ticket
            film={film}
            mode={interaction}
            isOpen={openId === film.id}
            onToggle={() => setOpenId(openId === film.id ? null : film.id)}
            zBoost={i}
          />
        </div>
      ))}
    </div>
  );
};

export default FilmTickets;
