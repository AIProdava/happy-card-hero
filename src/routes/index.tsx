import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { cardImages, defaultCardImageId } from "@/lib/card-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Celebra — Create a Birthday Card" },
      {
        name: "description",
        content: "Enter a name, choose an artwork, and share a personalized birthday card.",
      },
      { property: "og:title", content: "Celebra — Create a Birthday Card" },
      {
        property: "og:description",
        content: "Enter a name, choose an artwork, and share a personalized birthday card.",
      },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  const navigate = useNavigate({ from: "/" });
  const [name, setName] = useState("Julian");
  const [selectedImageId, setSelectedImageId] = useState(defaultCardImageId);
  const selectedImage = cardImages.find((image) => image.id === selectedImageId) ?? cardImages[0]!;

  const handleGenerate = () => {
    const trimmedName = name.trim() || "someone";
    navigate({
      to: "/card",
      search: { name: trimmedName, image: selectedImageId },
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10">
      <nav className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border">
        <span className="font-medium tracking-tight text-sm">CELEBRA</span>
        <div className="size-2 rounded-full bg-primary animate-pulse" />
      </nav>

      <main className="max-w-md mx-auto px-6 py-8 space-y-12">
        <section className="animate-reveal">
          <div className="relative aspect-[4/5] w-full rounded-[calc(var(--radius)+12px)] overflow-hidden shadow-2xl shadow-primary/5 ring-1 ring-black/5 bg-white">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="absolute inset-0 w-full h-full object-cover"
              width={1024}
              height={1280}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="space-y-2">
                <p className="font-serif italic text-2xl md:text-3xl text-primary text-shadow-sm">
                  Happy birthday,
                </p>
                <h1 className="font-serif text-5xl md:text-6xl text-foreground tracking-tight text-balance leading-none text-shadow-md">
                  {name.trim() || "someone"}
                </h1>
              </div>
            </div>

            <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
          </div>
        </section>

        <section className="space-y-10">
          <div className="space-y-3">
            <label
              htmlFor="name"
              className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground ml-1"
            >
              Recipient Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none py-2 text-2xl font-serif transition-colors placeholder:text-muted-foreground"
              placeholder="Enter name..."
              maxLength={30}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-end justify-between px-1">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Select Artwork
              </span>
              <span className="text-[10px] text-muted-foreground">
                {cardImages.findIndex((image) => image.id === selectedImageId) + 1} of{" "}
                {cardImages.length}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3 pb-2">
              {cardImages.map((image) => {
                const isSelected = image.id === selectedImageId;
                return (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setSelectedImageId(image.id)}
                    className={cn(
                      "w-full aspect-[4/5] rounded-lg overflow-hidden transition-all",
                      isSelected
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : "grayscale opacity-60 hover:grayscale-0 hover:opacity-100",
                    )}
                    aria-label={`Select ${image.label}`}
                    aria-pressed={isSelected}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      width={400}
                      height={500}
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleGenerate}
              className="group relative w-full bg-foreground text-background py-5 rounded-full font-medium overflow-hidden shadow-xl active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Generate & Share
                <span className="text-xs opacity-50">→</span>
              </span>
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[var(--ease-out-expo)]" />
            </button>
            <p className="text-center text-[11px] text-muted-foreground mt-6 text-balance">
              Your unique celebration link will be ready in a moment.
            </p>
          </div>
        </section>

        <footer className="pt-12 pb-8 border-t border-border flex flex-col items-center gap-4">
          <div className="flex gap-8 text-[10px] font-medium tracking-tighter text-muted-foreground/60 uppercase">
            <span>Premium Paper</span>
            <span>Unique Art</span>
            <span>Digital Only</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

function cn(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
