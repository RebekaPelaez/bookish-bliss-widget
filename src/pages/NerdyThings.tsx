import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import HoloAnimeCards from "@/components/HoloAnimeCards";

const NerdyThings = () => {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500 hover:text-cyan-300 transition-colors mb-12 font-mono"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to about
        </Link>

        {/* Header */}
        <header className="mb-16 border-b border-zinc-800 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-cyan-300 uppercase mb-3">
              Archive Volume 01
            </p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">
              Nerdy things
            </h1>
            <p className="mt-4 text-sm text-zinc-400 max-w-xl">
              The corner of the internet where I admit I have favourite
              episodes, rewatch fight scenes, and own three different editions
              of the same manga.
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-light tabular-nums text-zinc-200">
              05/100
            </div>
            <div className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono">
              Holographic series
            </div>
          </div>
        </header>

        {/* Anime section */}
        <section className="mb-24">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Anime</h2>
            <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500 font-mono">
              hover for foil →
            </p>
          </div>
          <HoloAnimeCards />
        </section>

        {/* Films placeholder for future expansion */}
        <section className="mb-12 border-t border-zinc-800 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-3">
            More films · coming soon
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl">
            The cinema tickets live on{" "}
            <Link to="/" className="text-cyan-300 hover:underline">
              About
            </Link>
            . This is where the deeper cuts will land — the ones that don't fit
            on a single ticket stub.
          </p>
        </section>
      </div>
    </main>
  );
};

export default NerdyThings;
