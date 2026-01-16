import type { CardProps } from "../../../../types/types";

export interface CollumnProps {
  title: string;
  cards: CardProps[];
  setCards: (cards: CardProps[]) => void;
}
