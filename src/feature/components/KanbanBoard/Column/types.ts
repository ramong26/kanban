import type { CardProps } from "../../../../types/types";

export interface ColumnProps {
  title: string;
  cards: CardProps[];
  setCards: (cards: CardProps[]) => void;
}
