import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FavoriteBooksStack from "@/components/FavoriteBooksStack";
import FilmTickets from "@/components/FilmTickets";
import NowPlayingChip from "@/components/NowPlayingChip";
import VinylRecords from "@/components/VinylRecords";

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-mono mb-6">
    {children}
  </p>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-[#faf6ec] py-16 px-4">
      {/* Persistent now-playing chip */}
      <div className="fixed top-5 right-5 z-50">
        <NowPlayingChip />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-[#2d2a1f]">
            About me
          </h1>
        </header>

        {/* Intro */}
        <section className="mb-16 rounded-2xl p-8 text-[#f5ecd7] relative overflow-hidden" style={{ background: "hsl(var(--marea-deep-tide))" }}>
          {/* subtle tide glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none opacity-30" style={{ background: "radial-gradient(circle, hsl(var(--marea-seafoam)/0.6), transparent 70%)" }} />
          <h2 className="text-2xl font-serif mb-3 relative">I'm Rebeca.</h2>
          <p className="text-sm leading-relaxed opacity-90 max-w-3xl relative">
            I'm a senior product designer based in London. I care about systems that scale
            without losing warmth — design tokens, quiet interactions, and the human on the
            other end of the screen.
          </p>
        </section>

        {/* FILMS */}
        <section className="mb-20">
          <SectionLabel>films i rewatch</SectionLabel>
          <FilmTickets interaction="tear" />
        </section>

        {/* MUSIC — vinyls */}
        <section className="mb-20">
          <SectionLabel>on heavy rotation</SectionLabel>
          <VinylRecords />
        </section>

        {/* BOOKS */}
        <section className="mb-16">
          <SectionLabel>currently on my nightstand</SectionLabel>
          <FavoriteBooksStack />
        </section>

        {/* Inline link to Nerdy things */}
        <section className="border-t border-[#2d2a1f]/10 pt-10 pb-4">
          <Link
            to="/nerdy-things"
            className="group inline-flex items-center gap-3 text-sm font-mono text-[#2d2a1f]/60 hover:text-[#2d2a1f] transition-colors"
          >
            <span className="uppercase tracking-[0.25em] text-[11px]">
              more nerdy things
            </span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-2 text-xs text-[#2d2a1f]/50 italic">
            anime, deeper cuts, holographic things
          </p>
        </section>
      </div>
    </main>
  );
};

export default Index;
