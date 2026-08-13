import card1 from "@/assets/card-1.jpg";
import card2 from "@/assets/card-2.jpg";
import card3 from "@/assets/card-3.jpg";
import card4 from "@/assets/card-4.jpg";

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
];

export function getCardImageById(id: string): CardImage | undefined {
  return cardImages.find((image) => image.id === id);
}

export const defaultCardImageId = cardImages[0].id;
