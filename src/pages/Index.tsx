import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FavoriteBooksFolio from "@/components/FavoriteBooksFolio";
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
    <main className="min-h-screen bg-[#faf6ec] py-12 px-4">
      {/* Persistent now-playing chip */}
      <div className="fixed top-5 right-5 z-50">
        <NowPlayingChip />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* ============ HERO ============ */}
        <header className="mb-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-b border-[#2d2a1f]/15 pb-10">
          <div className="md:col-span-8">
            <p className="text-[10px] tracking-[0.35em] font-mono uppercase text-[#2d2a1f]/50 mb-4">
              Vol. 01 · A personal index
            </p>
            <h1 className="text-5xl md:text-7xl font-serif tracking-tight text-[#2d2a1f] leading-[0.95]">
              About me.
            </h1>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-[#2d2a1f]/75 max-w-xl">
              I'm <span className="font-serif italic">Rebeca</span> — a senior product
              designer in London. I care about systems that scale without losing warmth:
              design tokens, quiet interactions, and the human on the other end of the
              screen.
            </p>
          </div>

          {/* Meta column — like a colophon */}
          <aside className="md:col-span-4 md:pl-6 md:border-l border-[#2d2a1f]/15 space-y-3 text-[11px] font-mono uppercase tracking-[0.18em] text-[#2d2a1f]/65">
            <div>
              <span className="text-[#2d2a1f]/40">Based</span>
              <span className="block mt-0.5 text-[#2d2a1f] normal-case tracking-normal font-serif text-sm">
                London, UK
              </span>
            </div>
            <div>
              <span className="text-[#2d2a1f]/40">Currently</span>
              <span className="block mt-0.5 text-[#2d2a1f] normal-case tracking-normal font-serif text-sm">
                Senior Product Designer at EY
              </span>
            </div>
            <div>
              <span className="text-[#2d2a1f]/40">Speaks</span>
              <span className="block mt-0.5 text-[#2d2a1f] normal-case tracking-normal font-serif text-sm">
                ES (native) · EN · DE (B2)
              </span>
            </div>
          </aside>
        </header>

        {/* ============ CABINET OF CURIOSITIES ============ */}
        <section className="mb-10">
          <div className="flex items-baseline justify-between mb-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#2d2a1f]/55 font-mono">
              A cabinet of curiosities
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#2d2a1f]/35 font-mono italic">
              hover · click · open
            </p>
          </div>

          {/* BOOKS — full width, the centerpiece */}
          <div className="mb-20">
            <FavoriteBooksFolio />
          </div>

          {/* FILMS + VINYL — side by side on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-baseline justify-between mb-6">
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-mono">
                  films I rewatch
                </p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#2d2a1f]/40 font-mono italic">
                  ✦ tear a stub →
                </p>
              </div>
              <FilmTickets interaction="tear" />
            </div>
            <div className="lg:col-span-5">
              <SectionLabel>on heavy rotation</SectionLabel>
              <VinylRecords />
            </div>
          </div>
        </section>

        {/* ============ FOOTER LINK TO NERDY THINGS ============ */}
        <section className="border-t border-[#2d2a1f]/15 mt-16 pt-8 pb-4 flex items-end justify-between gap-6">
          <div>
            <Link
              to="/nerdy-things"
              className="group inline-flex items-center gap-3 text-[#2d2a1f] hover:text-[#2d2a1f]/70 transition-colors"
            >
              <span className="font-serif text-2xl md:text-3xl tracking-tight">
                More nerdy things
              </span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
            </Link>
            <p className="mt-1 text-xs text-[#2d2a1f]/50 italic font-serif">
              anime, deeper cuts, holographic things
            </p>
          </div>
          <p className="hidden sm:block text-[10px] uppercase tracking-[0.3em] font-mono text-[#2d2a1f]/35">
            Vol. 02 →
          </p>
        </section>
      </div>
    </main>
  );
};

export default Index;
