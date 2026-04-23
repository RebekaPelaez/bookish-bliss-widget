import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, BookMarked } from "lucide-react";

type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
  cover: string;
  spine: string;
  accent: string;
  textLight: boolean;
  blurb: string;
  quote: string;
  thickness: number;
};

const BOOKS: Book[] = [
  {
    id: "1",
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    cover: "linear-gradient(135deg,#7c2d12,#c2410c 55%,#fbbf24)",
    spine: "linear-gradient(to bottom,#451a03,#7c2d12,#451a03)",
    accent: "#ea580c",
    textLight: true,
    blurb: "Sandworms, spice, and the slow hum of a desert prophecy.",
    quote: "Fear is the mind-killer.",
    thickness: 38,
  },
  {
    id: "2",
    title: "Project Hail Mary",
    author: "Andy Weir",
    year: 2021,
    cover: "linear-gradient(135deg,#042f2e,#0d9488 55%,#5eead4)",
    spine: "linear-gradient(to bottom,#022322,#0d9488,#022322)",
    accent: "#14b8a6",
    textLight: true,
    blurb: "One amnesiac astronaut, one alien friend, one shot at saving the sun.",
    quote: "Question: What's the opposite of fear? Answer: Trust.",
    thickness: 28,
  },
  {
    id: "3",
    title: "Circe",
    author: "Madeline Miller",
    year: 2018,
    cover: "linear-gradient(135deg,#831843,#be185d 55%,#f472b6)",
    spine: "linear-gradient(to bottom,#5a0f30,#be185d,#5a0f30)",
    accent: "#ec4899",
    textLight: true,
    blurb: "A goddess exiled becomes a witch unbothered. Mythology with teeth.",
    quote: "I thought once that gods are the opposite of death.",
    thickness: 32,
  },
  {
    id: "4",
    title: "The Midnight Library",
    author: "Matt Haig",
    year: 2020,
    cover: "linear-gradient(135deg,#1e1b4b,#3730a3 55%,#818cf8)",
    spine: "linear-gradient(to bottom,#0f0d2e,#3730a3,#0f0d2e)",
    accent: "#6366f1",
    textLight: true,
    blurb: "Infinite lives, infinite regrets — and the quiet courage to choose this one.",
    quote: "Between life and death there is a library.",
    thickness: 24,
  },
  {
    id: "5",
    title: "Piranesi",
    author: "Susanna Clarke",
    year: 2020,
    cover: "linear-gradient(135deg,#e7e5e4,#a8a29e 55%,#57534e)",
    spine: "linear-gradient(to bottom,#3f3a36,#78716c,#3f3a36)",
    accent: "#78716c",
    textLight: false,
    blurb: "A house of endless halls, tides in the basement, and one beautiful mind.",
    quote: "The Beauty of the House is immeasurable; its Kindness infinite.",
    thickness: 30,
  },
  {
    id: "6",
    title: "Educated",
    author: "Tara Westover",
    year: 2018,
    cover: "linear-gradient(135deg,#78350f,#b45309 55%,#fbbf24)",
    spine: "linear-gradient(to bottom,#451a03,#b45309,#451a03)",
    accent: "#f59e0b",
    textLight: true,
    blurb: "A memoir of mountains, family, and the brutal price of becoming yourself.",
    quote: "You can love someone and still choose to say goodbye to them.",
    thickness: 34,
  },
];

const BOOK_W = 220;

export const FavoriteBooksStack = () => {
  const [selected, setSelected] = useState<Book | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // compute cumulative bottom offset for each book in the stack
  const offsets: number[] = [];
  let running = 0;
  for (const b of BOOKS) {
    offsets.push(running);
    running += b.thickness + 2;
  }
  const totalH = running + 20;

  return (
    <section className="w-full">
      <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
            <BookMarked className="w-3.5 h-3.5" />
            Bedside stack
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            The pile by my bed
          </h2>
          <p className="text-muted-foreground mt-2 max-w-md">
            Hover a book to lift it · click to slide it out of the stack.
          </p>
        </div>
      </div>

      <div
        className="relative rounded-3xl p-8 sm:p-12 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, hsl(var(--muted)) 0%, hsl(var(--background)) 70%)",
        }}
      >
        <div
          className="relative mx-auto flex items-end justify-center gap-12 flex-wrap"
          style={{ minHeight: totalH + 80 }}
        >
          {/* The stack */}
          <div
            className="relative shrink-0"
            style={{
              width: BOOK_W,
              height: totalH,
              perspective: "1800px",
            }}
          >
            {/* Table surface shadow */}
            <div
              className="absolute left-1/2 -translate-x-1/2 rounded-[50%] blur-xl"
              style={{
                width: BOOK_W * 1.15,
                height: 24,
                background: "rgba(0,0,0,0.3)",
                bottom: -14,
              }}
            />

            {BOOKS.map((book, i) => {
              const isHovered = hovered === book.id;
              const isSelected = selected?.id === book.id;
              const naturalRotate = (i % 2 === 0 ? 1 : -1) * (1 + (i % 3));
              const offsetX = (i % 2 === 0 ? 1 : -1) * (i % 3) * 2;

              return (
                <motion.button
                  key={book.id}
                  onMouseEnter={() => setHovered(book.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(isSelected ? null : book)}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{
                    opacity: 1,
                    x: isSelected ? BOOK_W + 60 : isHovered ? 14 : offsetX,
                    y: isHovered && !isSelected ? -6 : 0,
                    rotateZ: isSelected ? 0 : isHovered ? 0 : naturalRotate,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 22,
                    delay: i * 0.06,
                  }}
                  className="absolute left-0 rounded-md cursor-pointer focus:outline-none"
                  style={{
                    bottom: offsets[i],
                    width: BOOK_W,
                    height: book.thickness,
                    background: book.spine,
                    transformStyle: "preserve-3d",
                    boxShadow: isHovered
                      ? `0 12px 30px -8px ${book.accent}90, inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.4)`
                      : "0 4px 10px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.4)",
                    zIndex: isSelected ? 50 : i,
                  }}
                  aria-label={`${book.title} by ${book.author}`}
                >
                  {/* Spine label */}
                  <div
                    className={`relative w-full h-full flex items-center justify-between px-4 ${
                      book.textLight ? "text-white" : "text-slate-900"
                    }`}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] truncate">
                      {book.title}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest opacity-70 shrink-0 ml-2">
                      {book.author.split(" ").pop()}
                    </span>
                  </div>

                  {/* Top page edge sliver (visible on hover) */}
                  <div
                    className="absolute inset-x-0 top-0 h-[3px] opacity-80"
                    style={{
                      background:
                        "repeating-linear-gradient(to right, #f5f1e8 0px, #f5f1e8 1px, #d6cfb8 1.5px, #f5f1e8 2px)",
                    }}
                  />

                  {/* Front edge of pages */}
                  <div
                    className="absolute right-0 top-[3px] bottom-0 w-[3px]"
                    style={{
                      background:
                        "repeating-linear-gradient(to bottom, #f5f1e8 0px, #f5f1e8 1px, #d6cfb8 1.5px, #f5f1e8 2px)",
                    }}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Detail card area */}
          <div className="relative shrink-0" style={{ width: 300, minHeight: 380 }}>
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: -30, rotateY: -20 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: 30, rotateY: 20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 rounded-xl overflow-hidden"
                  style={{
                    background: selected.cover,
                    boxShadow: `0 25px 60px -15px ${selected.accent}80, inset 0 0 60px rgba(0,0,0,0.3)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className={`relative h-full p-7 flex flex-col ${
                      selected.textLight ? "text-white" : "text-slate-900"
                    }`}
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-70 mb-2">
                      Now showing
                    </p>
                    <h3
                      className="text-2xl font-black leading-tight tracking-tight"
                      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                    >
                      {selected.title}
                    </h3>
                    <p className="mt-1 text-sm opacity-90">
                      {selected.author} · {selected.year}
                    </p>

                    <div className="my-5 flex items-center gap-2">
                      <div className="h-px flex-1 bg-current opacity-40" />
                      <div className="w-1.5 h-1.5 rotate-45 border border-current opacity-60" />
                      <div className="h-px flex-1 bg-current opacity-40" />
                    </div>

                    <p className="text-sm leading-relaxed opacity-95">{selected.blurb}</p>

                    <div className="mt-auto flex gap-2 items-start p-3 rounded-lg bg-black/25 backdrop-blur-sm">
                      <Quote className="w-4 h-4 shrink-0 mt-0.5 opacity-80" />
                      <p className="italic text-xs leading-relaxed">"{selected.quote}"</p>
                    </div>

                    {/* Glossy highlight */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(115deg, transparent 45%, rgba(255,255,255,0.15) 52%, transparent 60%)",
                      }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center text-center px-6"
                >
                  <div>
                    <BookMarked className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">
                      Pick a book from the stack
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FavoriteBooksStack;
