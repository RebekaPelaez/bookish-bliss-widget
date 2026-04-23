import { useState } from "react";
import FavoriteBooksShelf from "@/components/FavoriteBooksShelf";
import FavoriteBooksFlip from "@/components/FavoriteBooksFlip";
import FavoriteBooksStack from "@/components/FavoriteBooksStack";

type Variant = "shelf" | "flip" | "stack";

const VARIANTS: { id: Variant; label: string; hint: string }[] = [
  { id: "shelf", label: "1 · Bookshelf", hint: "Original — spines on a wooden shelf" },
  { id: "flip", label: "2 · Openable book", hint: "3D hardcover, opens to reveal pages" },
  { id: "stack", label: "3 · Bedside stack", hint: "Pile of books, slide one out" },
];

const Index = () => {
  const [variant, setVariant] = useState<Variant>("flip");

  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-2">
            About me
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            A few things I love
          </h1>
        </header>

        {/* Variant switcher */}
        <div className="mb-10 flex flex-wrap gap-2 p-1.5 rounded-2xl bg-muted/50 border border-border w-fit">
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => setVariant(v.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                variant === v.id
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title={v.hint}
            >
              {v.label}
            </button>
          ))}
        </div>

        {variant === "shelf" && <FavoriteBooksShelf />}
        {variant === "flip" && <FavoriteBooksFlip />}
        {variant === "stack" && <FavoriteBooksStack />}
      </div>
    </main>
  );
};

export default Index;
