import card1 from "@/assets/card-1.jpg";
import card2 from "@/assets/card-2.jpg";
import card3 from "@/assets/card-3.jpg";
import card4 from "@/assets/card-4.jpg";
import card5 from "@/assets/card-5.jpg";
import card6 from "@/assets/card-6.jpg";
import card7 from "@/assets/card-7.jpg";
import card8 from "@/assets/card-8.jpg";
import card9 from "@/assets/card-9.jpg";
import card10 from "@/assets/card-10.jpg";
import card11 from "@/assets/card-11.jpg";
import card12 from "@/assets/card-12.jpg";

export interface CardImage {
  id: string;
  src: string;
  alt: string;
  label: string;
}

export const cardImages: CardImage[] = [
  {
    id: "cake",
    src: card1,
    alt: "Hand-painted birthday cake with candles",
    label: "Celebration Cake",
  },
  {
    id: "confetti",
    src: card2,
    alt: "Minimal festive confetti",
    label: "Soft Confetti",
  },
  {
    id: "candles",
    src: card3,
    alt: "Warm celebratory candles",
    label: "Glowing Candles",
  },
  {
    id: "floral",
    src: card4,
    alt: "Vintage floral celebration frame",
    label: "Floral Frame",
  },
  {
    id: "balloons",
    src: card5,
    alt: "Watercolor balloons drifting across cream paper",
    label: "Drifting Balloons",
  },
  {
    id: "gifts",
    src: card6,
    alt: "Painted gift boxes and ribbons framing the page",
    label: "Ribbons & Gifts",
  },
  {
    id: "wreath",
    src: card7,
    alt: "Delicate leaf and star wreath on cream paper",
    label: "Leaf Wreath",
  },
  {
    id: "bunting",
    src: card8,
    alt: "Terracotta pennant bunting garlands",
    label: "Festive Bunting",
  },
  {
    id: "patisserie",
    src: card9,
    alt: "Watercolor macarons and teacups along the bottom edge",
    label: "Sweet Patisserie",
  },
  {
    id: "skyward",
    src: card10,
    alt: "Hot air balloons and small birds in a cream sky",
    label: "Skyward",
  },
  {
    id: "arches",
    src: card11,
    alt: "Abstract terracotta brushstroke arches on paper",
    label: "Painted Arches",
  },
  {
    id: "wildflowers",
    src: card12,
    alt: "Delicate wildflower stems in the lower corner",
    label: "Wildflowers",
  },
];

export function getCardImageById(id: string): CardImage | undefined {
  return cardImages.find((image) => image.id === id);
}

export const defaultCardImageId = cardImages[0]!.id;
