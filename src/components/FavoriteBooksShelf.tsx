import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { BookOpen, Quote, Sparkles, X } from "lucide-react";

type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
  spineColor: string; // tailwind classes for gradient
  accent: string; // hex/hsl for glow
  textOnSpine: "light" | "dark";
  blurb: string;
  quote: string;
  vibe: string;
};

const BOOKS: Book[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    year: 2020,
    spineColor: "from-indigo-700 via-indigo-800 to-slate-900",
    accent: "#6366f1",
    textOnSpine: "light",
    blurb: "Infinite lives, infinite regrets — and the quiet courage to choose this one.",
    quote: "Between life and death there is a library.",
    vibe: "🌌 cosmic & cozy",
  },
  {
    id: "2",
    title: "Educated",
    author: "Tara Westover",
    year: 2018,
    spineColor: "from-amber-600 via-orange-700 to-red-800",
    accent: "#f59e0b",
    textOnSpine: "light",
    blurb: "A memoir of mountains, family, and the brutal price of becoming yourself.",
    quote: "You can love someone and still choose to say goodbye to them.",
    vibe: "⛰️ raw & resilient",
  },
  {
    id: "3",
    title: "Project Hail Mary",
    author: "Andy Weir",
    year: 2021,
    spineColor: "from-emerald-500 via-teal-600 to-cyan-700",
    accent: "#10b981",
    textOnSpine: "light",
    blurb: "One amnesiac astronaut, one alien friend, one shot at saving the sun.",
    quote: "Question: What's the opposite of fear? Answer: Trust.",
    vibe: "🚀 nerdy & joyful",
  },
  {
    id: "4",
    title: "Circe",
    author: "Madeline Miller",
    year: 2018,
    spineColor: "from-rose-400 via-pink-500 to-fuchsia-700",
    accent: "#ec4899",
    textOnSpine: "light",
    blurb: "A goddess exiled becomes a witch unbothered. Mythology with teeth.",
    quote: "I thought once that gods are the opposite of death, but I see now they are more dead than anything.",
    vibe: "🌊 mythic & moody",
  },
  {
    id: "5",
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
    spineColor: "from-yellow-300 via-amber-400 to-orange-500",
    accent: "#eab308",
    textOnSpine: "dark",
    blurb: "Tiny changes, remarkable results. The book I keep gifting people.",
    quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
    vibe: "⚡ punchy & practical",
  },
  {
    id: "6",
    title: "Piranesi",
    author: "Susanna Clarke",
    year: 2020,
    spineColor: "from-slate-300 via-stone-400 to-stone-600",
    accent: "#a8a29e",
    textOnSpine: "dark",
    blurb: "A house of endless halls, tides in the basement, and one beautiful mind.",
    quote: "The Beauty of the House is immeasurable; its Kindness infinite.",
    vibe: "🗝️ dreamy & strange",
  },
  {
    id: "7",
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    spineColor: "from-orange-500 via-red-600 to-amber-900",
    accent: "#dc2626",
    textOnSpine: "light",
    blurb: "Sandworms, spice, and the slow hum of a desert prophecy.",
    quote: "Fear is the mind-killer.",
    vibe: "🏜️ epic & sun-baked",
  },
];

const spineHeights = ["h-56", "h-60", "h-52", "h-64", "h-58", "h-56", "h-60"];
const spineWidths = ["w-12", "w-14", "w-12", "w-16", "w-14", "w-12", "w-14"];

export const FavoriteBooksShelf = () => {
  const [selected, setSelected] = useState<Book | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Currently on my shelf
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Books that rewired me
          </h2>
          <p className="text-muted-foreground mt-2 max-w-md">
            Hover to peek, click a spine to pull it off the shelf.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="w-4 h-4" />
          {BOOKS.length} favorites
        </div>
      </div>

      {/* Shelf */}
      <LayoutGroup>
        <div className="relative">
          {/* Back wall */}
          <div className="absolute inset-x-0 top-0 bottom-6 rounded-2xl bg-gradient-to-b from-amber-50/40 via-amber-100/30 to-amber-200/20 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-950/60 border border-amber-900/10 dark:border-slate-700/40 shadow-inner" />

          {/* Books row */}
          <div className="relative flex items-end justify-center gap-1 sm:gap-2 px-4 sm:px-8 pt-10 pb-6 min-h-[18rem] overflow-x-auto">
            {BOOKS.map((book, i) => {
              const isHovered = hovered === book.id;
              const isOther = hovered && hovered !== book.id;
              return (
                <motion.button
                  key={book.id}
                  layoutId={`book-${book.id}`}
                  onClick={() => setSelected(book)}
                  onMouseEnter={() => setHovered(book.id)}
                  onMouseLeave={() => setHovered(null)}
                  initial={{ y: 40, opacity: 0, rotate: -2 }}
                  animate={{
                    y: isHovered ? -18 : 0,
                    opacity: isOther ? 0.55 : 1,
                    rotate: isHovered ? -6 : 0,
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 18,
                    delay: i * 0.05,
                  }}
                  whileTap={{ scale: 0.96, rotate: -2 }}
                  className={`relative ${spineHeights[i % spineHeights.length]} ${spineWidths[i % spineWidths.length]} shrink-0 rounded-t-sm rounded-b-[2px] bg-gradient-to-b ${book.spineColor} cursor-pointer origin-bottom shadow-[inset_2px_0_0_rgba(255,255,255,0.15),inset_-2px_0_0_rgba(0,0,0,0.25),0_8px_20px_-8px_rgba(0,0,0,0.5)] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background`}
                  style={{
                    boxShadow: isHovered
                      ? `0 18px 40px -10px ${book.accent}80, inset 2px 0 0 rgba(255,255,255,0.2), inset -2px 0 0 rgba(0,0,0,0.25)`
                      : undefined,
                  }}
                  aria-label={`${book.title} by ${book.author}`}
                >
                  {/* Spine decorations */}
                  <div className="absolute inset-x-2 top-3 h-px bg-white/20" />
                  <div className="absolute inset-x-2 bottom-3 h-px bg-white/20" />

                  {/* Vertical title */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center px-1 ${
                      book.textOnSpine === "light" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    <span
                      className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase whitespace-nowrap"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      {book.title}
                    </span>
                  </div>

                  {/* Tiny author tag at bottom */}
                  <div
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] tracking-widest opacity-70 ${
                      book.textOnSpine === "light" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    ★
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Wooden shelf plank */}
          <div className="relative h-6 rounded-b-2xl bg-gradient-to-b from-amber-800 via-amber-900 to-amber-950 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-x-0 top-0 h-px bg-amber-300/30" />
            <div className="absolute inset-x-0 bottom-1 h-px bg-black/40" />
          </div>
          {/* Shelf shadow */}
          <div className="mx-6 h-3 rounded-full bg-black/20 blur-md" />
        </div>

        {/* Modal / pulled-out book */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                layoutId={`book-${selected.id}`}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${selected.accent}22, transparent 60%)`,
                }}
              >
                <div className={`bg-gradient-to-br ${selected.spineColor} p-8 sm:p-10`}>
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className={selected.textOnSpine === "light" ? "text-white" : "text-slate-900"}
                  >
                    <div className="text-xs uppercase tracking-[0.25em] opacity-80 mb-3">
                      {selected.vibe}
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold leading-tight">
                      {selected.title}
                    </h3>
                    <p className="mt-2 text-sm opacity-90">
                      {selected.author} · {selected.year}
                    </p>

                    <p className="mt-6 text-base leading-relaxed opacity-95">
                      {selected.blurb}
                    </p>

                    <div className="mt-6 flex gap-3 items-start p-4 rounded-lg bg-black/20 backdrop-blur-sm">
                      <Quote className="w-5 h-5 shrink-0 mt-0.5 opacity-80" />
                      <p className="italic text-sm leading-relaxed">
                        "{selected.quote}"
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </section>
  );
};

export default FavoriteBooksShelf;
