import FavoriteBooks from "@/components/FavoriteBooks";

const Index = () => {
  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-2">
            About me
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            A few things I love
          </h1>
        </header>
        <FavoriteBooks />
      </div>
    </main>
  );
};

export default Index;
