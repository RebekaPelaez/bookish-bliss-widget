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
        <section className="mb-16 rounded-2xl p-8 text-[#f5ecd7]" style={{ background: "#4a5a3a" }}>
          <h2 className="text-2xl font-serif mb-3">I'm Rebeca.</h2>
          <p className="text-sm leading-relaxed opacity-90 max-w-3xl">
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
        <section>
          <SectionLabel>currently on my nightstand</SectionLabel>
          <FavoriteBooksStack />
        </section>
      </div>
    </main>
  );
};

export default Index;
