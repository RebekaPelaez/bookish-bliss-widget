import { useState } from "react";
import FavoriteBooksStack from "@/components/FavoriteBooksStack";
import FilmTickets, { TicketInteraction } from "@/components/FilmTickets";

const INTERACTIONS: { id: TicketInteraction; label: string; hint: string }[] = [
  { id: "tear", label: "1 · Tear-off stub", hint: "Click → stub rips away, reveals a note" },
  { id: "lift", label: "2 · Lift + tilt", hint: "Hover lifts the ticket; click reveals note" },
  { id: "shuffle", label: "3 · Shuffle to top", hint: "Click brings ticket forward" },
  { id: "flip", label: "4 · Flip to back", hint: "Click flips to handwritten notes" },
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-mono mb-6">
    {children}
  </p>
);

const Index = () => {
  const [interaction, setInteraction] = useState<TicketInteraction>("tear");

  return (
    <main className="min-h-screen bg-[#faf6ec] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-[#2d2a1f]">
            About me
          </h1>
        </header>

        {/* Intro card placeholder — kept simple to match your existing one */}
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

          {/* Interaction switcher — only here so you can preview all 4 */}
          <div className="mb-2 flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#efe4c6] border border-[#d6c89a] w-fit">
            {INTERACTIONS.map((v) => (
              <button
                key={v.id}
                onClick={() => setInteraction(v.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  interaction === v.id
                    ? "bg-[#3a2e1a] text-[#f5ecd7] shadow-sm"
                    : "text-[#3a2e1a]/70 hover:text-[#3a2e1a]"
                }`}
                title={v.hint}
              >
                {v.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-[#3a2e1a]/60 font-mono mb-4 ml-1">
            {INTERACTIONS.find((i) => i.id === interaction)?.hint}
          </p>

          <FilmTickets interaction={interaction} />
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
