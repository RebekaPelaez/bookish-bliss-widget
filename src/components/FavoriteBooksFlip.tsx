import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
  cover: string; // gradient
  spine: string;
  accent: string;
  textLight: boolean;
  blurb: string;
  quote: string;
  rating: number;
};

const BOOKS: Book[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    year: 2020,
    cover: "linear-gradient(135deg,#1e1b4b 0%,#3730a3 50%,#6366f1 100%)",
    spine: "linear-gradient(to right,#0f0d2e,#1e1b4b,#0f0d2e)",
    accent: "#6366f1",
    textLight: true,
    blurb: "Infinite lives, infinite regrets — and the quiet courage to choose this one.",
    quote: "Between life and death there is a library.",
    rating: 5,
  },
  {
    id: "2",
    title: "Project Hail Mary",
    author: "Andy Weir",
    year: 2021,
    cover: "linear-gradient(135deg,#042f2e 0%,#0d9488 60%,#5eead4 100%)",
    spine: "linear-gradient(to right,#022322,#042f2e,#022322)",
    accent: "#14b8a6",
    textLight: true,
    blurb: "One amnesiac astronaut, one alien friend, one shot at saving the sun.",
    quote: "Question: What's the opposite of fear? Answer: Trust.",
    rating: 5,
  },
  {
    id: "3",
    title: "Circe",
    author: "Madeline Miller",
    year: 2018,
    cover: "linear-gradient(135deg,#831843 0%,#be185d 55%,#f472b6 100%)",
    spine: "linear-gradient(to right,#5a0f30,#831843,#5a0f30)",
    accent: "#ec4899",
    textLight: true,
    blurb: "A goddess exiled becomes a witch unbothered. Mythology with teeth.",
    quote: "I thought once that gods are the opposite of death.",
    rating: 5,
  },
  {
    id: "4",
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    cover: "linear-gradient(135deg,#7c2d12 0%,#c2410c 50%,#fbbf24 100%)",
    spine: "linear-gradient(to right,#451a03,#7c2d12,#451a03)",
    accent: "#ea580c",
    textLight: true,
    blurb: "Sandworms, spice, and the slow hum of a desert prophecy.",
    quote: "Fear is the mind-killer.",
    rating: 5,
  },
  {
    id: "5",
    title: "Piranesi",
    author: "Susanna Clarke",
    year: 2020,
    cover: "linear-gradient(135deg,#e7e5e4 0%,#a8a29e 60%,#57534e 100%)",
    spine: "linear-gradient(to right,#3f3a36,#57534e,#3f3a36)",
    accent: "#78716c",
    textLight: false,
    blurb: "A house of endless halls, tides in the basement, and one beautiful mind.",
    quote: "The Beauty of the House is immeasurable; its Kindness infinite.",
    rating: 5,
  },
];

export const FavoriteBooksFlip = () => {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const book = BOOKS[index];

  const go = (dir: 1 | -1) => {
    setOpen(false);
    setTimeout(() => setIndex((i) => (i + dir + BOOKS.length) % BOOKS.length), 250);
  };

  return (
    <section className="w-full">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
          Reading list · click the book to open
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">My favorite reads</h2>
      </div>

      <div
        className="relative mx-auto rounded-3xl p-8 sm:p-12 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at top, hsl(var(--muted)) 0%, hsl(var(--background)) 70%)",
        }}
      >
        {/* Stage */}
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{ perspective: "2200px", height: 440 }}
        >
          <button
            onClick={() => go(-1)}
            className="absolute left-0 z-20 p-3 rounded-full bg-background/80 backdrop-blur border border-border hover:bg-accent transition shadow-lg"
            aria-label="Previous book"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-0 z-20 p-3 rounded-full bg-background/80 backdrop-blur border border-border hover:bg-accent transition shadow-lg"
            aria-label="Next book"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30, rotateY: -25 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              exit={{ opacity: 0, y: -20, rotateY: 25 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              <BookView book={book} open={open} onToggle={() => setOpen((o) => !o)} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {BOOKS.map((b, i) => (
            <button
              key={b.id}
              onClick={() => {
                setOpen(false);
                setTimeout(() => setIndex(i), 200);
              }}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === index ? 28 : 8,
                background: i === index ? book.accent : "hsl(var(--muted-foreground) / 0.3)",
              }}
              aria-label={`Go to ${b.title}`}
            />
          ))}
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {index + 1} / {BOOKS.length} · tap the cover to open
        </p>
      </div>
    </section>
  );
};

const BookView = ({
  book,
  open,
  onToggle,
}: {
  book: Book;
  open: boolean;
  onToggle: () => void;
}) => {
  const W = 240;
  const H = 340;
  const D = 28; // spine depth

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{
        width: W,
        height: H,
        transformStyle: "preserve-3d",
        transform: open ? "rotateY(-12deg) rotateX(4deg)" : "rotateY(-22deg) rotateX(6deg)",
        transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
      }}
      onClick={onToggle}
    >
      {/* Pages (right edge) */}
      <div
        className="absolute top-1 left-1 rounded-r-sm"
        style={{
          width: W - 4,
          height: H - 2,
          background:
            "repeating-linear-gradient(to right, #f5f1e8 0px, #f5f1e8 1px, #e8e0cc 1.5px, #f5f1e8 2px)",
          transform: `translateZ(${D / 2 - 2}px) translateX(2px)`,
          boxShadow: "inset -2px 0 4px rgba(0,0,0,0.15)",
        }}
      />
      {/* Pages (top) */}
      <div
        className="absolute"
        style={{
          width: W - 6,
          height: D - 4,
          left: 3,
          top: 0,
          background:
            "repeating-linear-gradient(to right, #f5f1e8 0px, #f5f1e8 1px, #d6cfb8 1.5px, #f5f1e8 2px)",
          transform: `rotateX(90deg) translateZ(${D / 2 - 2}px) translateY(-${(D - 4) / 2}px)`,
        }}
      />
      {/* Pages (bottom) */}
      <div
        className="absolute"
        style={{
          width: W - 6,
          height: D - 4,
          left: 3,
          bottom: 0,
          background:
            "repeating-linear-gradient(to right, #ede5cf 0px, #ede5cf 1px, #c9c0a3 1.5px, #ede5cf 2px)",
          transform: `rotateX(-90deg) translateZ(${D / 2 - 2}px) translateY(${(D - 4) / 2}px)`,
        }}
      />

      {/* Back cover */}
      <div
        className="absolute inset-0 rounded-r-md rounded-l-sm"
        style={{
          background: book.cover,
          transform: `translateZ(-${D / 2}px)`,
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.4)",
        }}
      >
        <div className={`p-6 h-full flex flex-col ${book.textLight ? "text-white" : "text-slate-900"}`}>
          <div className="flex gap-1 mb-3">
            {Array.from({ length: book.rating }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
          </div>
          <p className="text-xs leading-relaxed opacity-90">{book.blurb}</p>
          <div className="mt-auto flex gap-2 items-start text-xs italic opacity-80">
            <Quote className="w-3 h-3 shrink-0 mt-0.5" />
            <span>"{book.quote}"</span>
          </div>
        </div>
      </div>

      {/* Spine */}
      <div
        className="absolute top-0 left-0 rounded-l-sm"
        style={{
          width: D,
          height: H,
          background: book.spine,
          transform: `rotateY(-90deg) translateZ(${D / 2}px) translateX(-${D / 2}px)`,
          boxShadow: "inset 2px 0 6px rgba(0,0,0,0.4), inset -2px 0 4px rgba(255,255,255,0.1)",
        }}
      >
        <div
          className={`h-full flex items-center justify-center ${
            book.textLight ? "text-white" : "text-slate-900"
          }`}
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase">{book.title}</span>
        </div>
      </div>

      {/* Front cover (hinged) */}
      <div
        className="absolute inset-0 rounded-r-md rounded-l-sm origin-left"
        style={{
          background: book.cover,
          transform: `translateZ(${D / 2}px) rotateY(${open ? -155 : 0}deg)`,
          transformOrigin: "left center",
          transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          boxShadow: open
            ? `0 20px 50px -10px ${book.accent}80`
            : "0 15px 40px -10px rgba(0,0,0,0.6), inset 0 0 40px rgba(0,0,0,0.25)",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Cover art */}
        <div
          className={`relative h-full p-7 flex flex-col ${
            book.textLight ? "text-white" : "text-slate-900"
          }`}
        >
          {/* Embossed title */}
          <div className="mt-6">
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-70 mb-3">
              A Novel
            </p>
            <h3
              className="text-2xl font-black leading-tight tracking-tight"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
            >
              {book.title}
            </h3>
          </div>

          {/* Decorative ornament */}
          <div className="my-5 flex items-center gap-2">
            <div className="h-px flex-1 bg-current opacity-40" />
            <div className="w-2 h-2 rotate-45 border border-current opacity-60" />
            <div className="h-px flex-1 bg-current opacity-40" />
          </div>

          <div className="mt-auto">
            <p className="text-xs uppercase tracking-[0.25em] opacity-70 mb-1">
              {book.author}
            </p>
            <p className="text-[10px] opacity-60">First edition · {book.year}</p>
          </div>

          {/* Glossy highlight */}
          <div
            className="absolute inset-0 rounded-r-md pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
            }}
          />
          {/* Edge darkening */}
          <div
            className="absolute inset-0 rounded-r-md pointer-events-none"
            style={{
              boxShadow: "inset 0 0 40px rgba(0,0,0,0.35), inset 6px 0 12px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </div>

      {/* First inner page (revealed when open) */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute inset-0 rounded-r-md"
          style={{
            transform: `translateZ(${D / 2 - 1}px)`,
            background: "linear-gradient(to right, #ede5cf 0%, #f5f1e8 12%, #faf6ea 100%)",
          }}
        >
          <div className="p-7 h-full flex flex-col text-stone-800">
            <p className="text-[10px] uppercase tracking-[0.25em] text-stone-500 mb-4">
              Chapter One
            </p>
            <h4 className="font-serif text-lg leading-snug mb-3">{book.title}</h4>
            <p className="font-serif text-xs leading-relaxed text-stone-700 italic">
              "{book.quote}"
            </p>
            <p className="mt-auto text-[10px] text-stone-400 text-right">— {book.author}</p>
          </div>
        </motion.div>
      )}

      {/* Floor shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full blur-xl"
        style={{
          width: W * 0.9,
          height: 18,
          background: "rgba(0,0,0,0.35)",
          bottom: -28,
          transform: "rotateX(90deg)",
        }}
      />
    </div>
  );
};

export default FavoriteBooksFlip;
