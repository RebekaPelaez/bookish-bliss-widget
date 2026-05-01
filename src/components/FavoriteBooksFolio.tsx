import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, X } from "lucide-react";

import bornACrime from "@/assets/books/born-a-crime.jpg";
import throneOfGlass from "@/assets/books/throne-of-glass.jpg";
import mansSearch from "@/assets/books/mans-search-for-meaning.jpg";
import tellTaleBrain from "@/assets/books/tell-tale-brain.jpg";
import bodyKeepsScore from "@/assets/books/body-keeps-the-score.jpg";
import nameOfTheWind from "@/assets/books/name-of-the-wind.jpg";
import duelo from "@/assets/books/pequeno-libro-del-duelo.jpg";
import acotar from "@/assets/books/acotar.jpg";
import manWhoMistook from "@/assets/books/man-who-mistook.jpg";
import mythOfNormal from "@/assets/books/myth-of-normal.jpg";
import myFriends from "@/assets/books/my-friends.jpg";
import alchemised from "@/assets/books/alchemised.jpg";
import oneGoldenSummer from "@/assets/books/one-golden-summer.jpg";
import slaughterhouseFive from "@/assets/books/slaughterhouse-five.jpg";
import islaMujeresDelMar from "@/assets/books/isla-mujeres-del-mar.jpg";

type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  series?: string;
  hoverNote: string;
  blurb: string;
  quote: string;
  rating: number; // 1-5
  tag: string;
};

const BOOKS: Book[] = [
  {
    id: "name-of-the-wind",
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    cover: nameOfTheWind,
    series: "The Kingkiller Chronicle · I",
    hoverNote: "the prose still hums in my head",
    blurb:
      "A musician's confession, a magician's apprenticeship, a boy who burns down the world by trying to understand it. Rothfuss writes like he's spelling something out of you.",
    quote: "It's like everyone tells a story about themselves inside their own head. Always.",
    rating: 5,
    tag: "Fantasy",
  },
  {
    id: "body-keeps-score",
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    cover: bodyKeepsScore,
    hoverNote: "rewired how I think about feeling",
    blurb:
      "Trauma isn't a story you tell — it's a posture, a held breath, a startle reflex. Read this and you'll never separate mind from body again.",
    quote: "The body keeps the score: if the memory of trauma is encoded in the viscera...",
    rating: 5,
    tag: "Psychology",
  },
  {
    id: "mans-search",
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    cover: mansSearch,
    hoverNote: "small book, enormous gravity",
    blurb:
      "A psychiatrist survives the camps and finds that meaning — not pleasure, not power — is what keeps a person human. I return to it whenever I lose the thread.",
    quote: "When we are no longer able to change a situation, we are challenged to change ourselves.",
    rating: 5,
    tag: "Philosophy",
  },
  {
    id: "tell-tale-brain",
    title: "The Tell-Tale Brain",
    author: "V. S. Ramachandran",
    cover: tellTaleBrain,
    hoverNote: "neuroscience that reads like a detective novel",
    blurb:
      "Phantom limbs, synaesthesia, mirror neurons. Ramachandran takes the strangest cases and uses them to map what makes us, us.",
    quote: "Your conscious life is an elaborate post-hoc rationalisation of things you really do for other reasons.",
    rating: 4,
    tag: "Neuroscience",
  },
  {
    id: "born-a-crime",
    title: "Born a Crime",
    author: "Trevor Noah",
    cover: bornACrime,
    series: "Stories from a South African Childhood",
    hoverNote: "laughed and then quietly cried",
    blurb:
      "A memoir about being a literal crime under apartheid — and about a mother fierce enough to outrun it. Funny in the way that only survival can make you.",
    quote: "Language, even more than colour, defines who you are to people.",
    rating: 5,
    tag: "Memoir",
  },
  {
    id: "throne-of-glass",
    title: "Throne of Glass",
    author: "Sarah J. Maas",
    cover: throneOfGlass,
    hoverNote: "comfort read, no apologies",
    blurb:
      "Assassin in a glass castle, a competition, a king who deserves what's coming. The series I devour when I want to feel something easy and big.",
    quote: "My name is Celaena Sardothien. I will not be afraid.",
    rating: 4,
    tag: "Fantasy",
  },
  {
    id: "acotar",
    title: "A Court of Thorns and Roses",
    author: "Sarah J. Maas",
    cover: acotar,
    hoverNote: "the book I lent and never got back",
    blurb:
      "Beauty and the Beast with teeth. Faerie courts, blood bargains, and one of the most satisfying slow burns in romantasy.",
    quote: "Don't feel bad for one moment about doing what brings you joy.",
    rating: 4,
    tag: "Romantasy",
  },
  {
    id: "duelo",
    title: "El pequeño libro del duelo",
    author: "Anji Carmelo",
    cover: duelo,
    hoverNote: "kept it on my bedside for a year",
    blurb:
      "Un libro pequeño sobre algo enorme. Sin prisa, sin recetas — solo compañía honesta para los días que no se pueden explicar.",
    quote: "El duelo no se cierra: se aprende a llevar.",
    rating: 5,
    tag: "Ensayo",
  },
  {
    id: "man-who-mistook",
    title: "The Man Who Mistook His Wife for a Hat",
    author: "Oliver Sacks",
    cover: manWhoMistook,
    series: "And Other Clinical Tales",
    hoverNote: "the brain is stranger than fiction",
    blurb:
      "Sacks writes about his patients with the tenderness of a novelist and the precision of a clinician. Each case study is a small, humane mystery about what it means to have a self.",
    quote: "We have, each of us, a life-story, an inner narrative — whose continuity, whose sense, is our lives.",
    rating: 5,
    tag: "Neuroscience",
  },
  {
    id: "myth-of-normal",
    title: "The Myth of Normal",
    author: "Gabor Maté",
    cover: mythOfNormal,
    series: "Trauma, Illness & Healing in a Toxic Culture",
    hoverNote: "made me reconsider 'fine'",
    blurb:
      "Maté argues that what we call normal is often quietly making us sick. A sweeping, compassionate look at how culture shapes the body — and what it would take to heal.",
    quote: "Safety is not the absence of threat, it is the presence of connection.",
    rating: 5,
    tag: "Psychology",
  },
  {
    id: "my-friends",
    title: "My Friends",
    author: "Hisham Matar",
    cover: myFriends,
    hoverNote: "a quiet ache I'm still carrying",
    blurb:
      "Friendship, exile, and the long shadow of a single afternoon in London. Matar writes with such restraint that the grief sneaks up on you sideways.",
    quote: "We are, all of us, walking around with our private histories pressed against our ribs.",
    rating: 5,
    tag: "Literary",
  },
  {
    id: "alchemised",
    title: "Alchemised",
    author: "SenLinYu",
    cover: alchemised,
    hoverNote: "dark, slow, devastating",
    blurb:
      "A war is over and the survivors are the ones still being undone by it. Gothic, morally bruised, and impossible to put down once it has its teeth in you.",
    quote: "Some things you don't survive — you just keep living after them.",
    rating: 4,
    tag: "Romantasy",
  },
  {
    id: "one-golden-summer",
    title: "One Golden Summer",
    author: "Carley Fortune",
    cover: oneGoldenSummer,
    hoverNote: "read it on a train, smiling",
    blurb:
      "Lake light, second chances, and the particular ache of a summer that mattered more than you let on. Cosy without being saccharine.",
    quote: "Some summers don't end, they just change shape.",
    rating: 4,
    tag: "Romance",
  },
  {
    id: "slaughterhouse-five",
    title: "Slaughterhouse-Five",
    author: "Kurt Vonnegut",
    cover: slaughterhouseFive,
    hoverNote: "so it goes.",
    blurb:
      "Time-travel, war, and a man unstuck from his own life. Vonnegut turns horror into something almost gentle — a shrug at the edge of the abyss.",
    quote: "Everything was beautiful and nothing hurt.",
    rating: 5,
    tag: "Classic",
  },
  {
    id: "isla-mujeres-del-mar",
    title: "La isla de las mujeres del mar",
    author: "Lisa See",
    cover: islaMujeresDelMar,
    hoverNote: "amistad, mar y memoria",
    blurb:
      "En la isla coreana de Jeju, las haenyeo bucean sin oxígeno y sostienen a sus familias. Una amistad de toda la vida atravesada por la guerra, el secreto y el perdón que tarda décadas en llegar.",
    quote: "El mar es nuestra madre, nuestro padre, nuestro campo y nuestra tumba.",
    rating: 5,
    tag: "Histórica",
  },
];

const FavoriteBooksFolio = () => {
  const [selected, setSelected] = useState<Book | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="w-full">
      {/* Editorial header */}
      <div className="mb-10 border-b border-[#2d2a1f]/15 pb-6">
        <p className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#2d2a1f]/55">
          Curatorial Collection · 008
        </p>
        <h2 className="mt-2 text-3xl md:text-4xl font-serif tracking-tight text-[#2d2a1f]">
          The Folio Editions
        </h2>
        <p className="mt-2 text-sm text-[#2d2a1f]/60 italic max-w-xl">
          Eight books that rewired me — hover for a note, click to pull one off the shelf.
        </p>
      </div>

      {/* Horizontal scrolling shelf */}
      <div className="relative -mx-4 sm:-mx-6">
        {/* Soft fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-12 z-10 bg-gradient-to-r from-[#faf6ec] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-12 z-10 bg-gradient-to-l from-[#faf6ec] to-transparent" />

        <div
          className="overflow-x-auto overflow-y-visible pb-6 px-4 sm:px-6 [scrollbar-width:thin] [-webkit-overflow-scrolling:touch]"
          style={{ scrollbarColor: "#2d2a1f33 transparent" }}
        >
          <div className="flex items-end gap-8 sm:gap-10 pt-8 pb-2 min-w-max">
            {BOOKS.map((book, i) => {
              const isHovered = hovered === book.id;
              return (
                <button
                  key={book.id}
                  onMouseEnter={() => setHovered(book.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(book)}
                  className="group text-left focus:outline-none shrink-0 w-[120px] sm:w-[130px]"
                  aria-label={`${book.title} by ${book.author}`}
                >
                  <div className="relative aspect-[2/3] overflow-visible">
                    <motion.img
                      src={book.cover}
                      alt={`Cover of ${book.title}`}
                      loading="lazy"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      whileHover={{ y: -8 }}
                      className="w-full h-full object-cover shadow-[0_8px_18px_-8px_rgba(45,42,31,0.4),inset_2px_0_0_rgba(255,255,255,0.08),inset_-1px_0_0_rgba(0,0,0,0.15)] transition-shadow duration-500 group-hover:shadow-[0_18px_30px_-10px_rgba(45,42,31,0.5)]"
                      style={{ borderLeft: "3px solid rgba(0,0,0,0.18)" }}
                    />

                    {/* Hover note */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.2 }}
                          className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 bg-[#2d2a1f] text-[#faf6ec] text-[10px] font-serif italic shadow-md pointer-events-none"
                        >
                          “{book.hoverNote}”
                          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-[#2d2a1f] rotate-45" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Caption */}
                  <div className="mt-3">
                    <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#2d2a1f]/45">
                      {String(i + 1).padStart(2, "0")} · {book.tag}
                    </p>
                    <p className="mt-1 text-[12px] font-serif text-[#2d2a1f] leading-tight line-clamp-2">
                      {book.title}
                    </p>
                    <p className="text-[10px] text-[#2d2a1f]/55 italic mt-0.5 line-clamp-1">
                      {book.author}
                    </p>
                  </div>
                </button>
              );
            })}

            {/* End marker */}
            <div className="shrink-0 self-stretch flex items-center pl-2 pr-4">
              <div className="flex flex-col items-center gap-2 text-[#2d2a1f]/30">
                <div className="w-px h-16 bg-current" />
                <p className="text-[9px] font-mono uppercase tracking-[0.3em] rotate-90 origin-center whitespace-nowrap mt-4">
                  end of shelf
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wooden shelf line */}
        <div className="mx-4 sm:mx-6 h-[3px] bg-gradient-to-b from-[#2d2a1f]/25 to-transparent" />
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d2a1f]/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#faf6ec] shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#2d2a1f]/10 hover:bg-[#2d2a1f]/20 text-[#2d2a1f] transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 p-8 md:p-10">
                {/* Cover */}
                <div className="aspect-[2/3] w-full md:w-[200px] shadow-[0_15px_30px_-10px_rgba(45,42,31,0.5)] mx-auto md:mx-0">
                  <img
                    src={selected.cover}
                    alt={selected.title}
                    className="w-full h-full object-cover"
                    style={{ borderLeft: "3px solid rgba(0,0,0,0.18)" }}
                  />
                </div>

                {/* Content */}
                <div className="text-[#2d2a1f]">
                  <p className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#2d2a1f]/50">
                    {selected.tag}
                  </p>
                  <h3 className="mt-2 text-2xl md:text-3xl font-serif leading-tight">
                    {selected.title}
                  </h3>
                  {selected.series && (
                    <p className="mt-1 text-sm italic text-[#2d2a1f]/60">
                      {selected.series}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-[#2d2a1f]/70">
                    by {selected.author}
                  </p>

                  {/* Rating */}
                  <div className="mt-3 text-sm font-mono text-[#2d2a1f]/70">
                    {"★".repeat(selected.rating)}
                    <span className="text-[#2d2a1f]/25">
                      {"★".repeat(5 - selected.rating)}
                    </span>
                  </div>

                  <div className="my-5 flex items-center gap-2">
                    <div className="h-px flex-1 bg-[#2d2a1f]/20" />
                    <div className="w-1.5 h-1.5 rotate-45 border border-[#2d2a1f]/40" />
                    <div className="h-px flex-1 bg-[#2d2a1f]/20" />
                  </div>

                  <p className="text-[15px] leading-relaxed text-[#2d2a1f]/85">
                    {selected.blurb}
                  </p>

                  <div className="mt-5 flex gap-3 items-start p-4 bg-[#2d2a1f]/5 border-l-2 border-[#2d2a1f]/30">
                    <Quote className="w-4 h-4 shrink-0 mt-1 text-[#2d2a1f]/50" />
                    <p className="italic text-sm leading-relaxed text-[#2d2a1f]/80">
                      {selected.quote}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FavoriteBooksFolio;
