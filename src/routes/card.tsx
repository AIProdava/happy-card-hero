import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import { cardImages, defaultCardImageId, getCardImageById } from "@/lib/card-data";
import { copyCardLink } from "@/lib/share";

const cardSearchSchema = z.object({
  name: z.string().min(1).max(30).default("someone"),
  image: z.string().default(defaultCardImageId),
});

export const Route = createFileRoute("/card")({
  validateSearch: cardSearchSchema,
  head: () => ({
    meta: [
      { title: "Your Birthday Card — Celebra" },
      { name: "description", content: "A personalized birthday card made just for you." },
      { property: "og:title", content: "Your Birthday Card — Celebra" },
      { property: "og:description", content: "A personalized birthday card made just for you." },
    ],
  }),
  component: CardPage,
});

function CardPage() {
  const search = Route.useSearch();
  const name = search.name.trim() || "someone";
  const imageId = getCardImageById(search.image) ? search.image : defaultCardImageId;
  const image = getCardImageById(imageId) ?? cardImages[0]!;

  const [cardUrl, setCardUrl] = useState("");
  useEffect(() => {
    setCardUrl(window.location.href);
  }, []);

  const handleCopyLink = async () => {
    const success = await copyCardLink(cardUrl);
    if (success) {
      toast.success("Link copied to clipboard");
    } else {
      toast.error("Could not copy link. Try copying the URL manually.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10">
      <nav className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border">
        <Link
          to="/"
          className="font-medium tracking-tight text-sm hover:opacity-70 transition-opacity"
        >
          CELEBRA
        </Link>
        <div className="size-2 rounded-full bg-primary animate-pulse" />
      </nav>

      <main className="max-w-md mx-auto px-6 py-8 space-y-10">
        <section className="animate-reveal">
          <div className="relative aspect-[4/5] w-full rounded-[calc(var(--radius)+12px)] overflow-hidden shadow-2xl shadow-primary/5 ring-1 ring-black/5 bg-white">
            <img
              src={image.src}
              alt={image.alt}
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
                  {name}
                </h1>
              </div>
            </div>

            <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3">
            <code className="flex-1 text-xs truncate text-muted-foreground">{cardUrl}</code>
            <button
              type="button"
              onClick={handleCopyLink}
              className="shrink-0 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Copy link
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Create another
            </Link>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Happy birthday! I made this card for you: ${cardUrl}`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Share on WhatsApp
            </a>
          </div>
        </section>

        <footer className="pt-8 pb-4 border-t border-border flex flex-col items-center gap-4">
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
