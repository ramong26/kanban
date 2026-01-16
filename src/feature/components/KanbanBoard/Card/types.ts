import type { CardProps } from "../../../../types/types";

export interface BaseCardProps {
  item: CardProps;
  onUpdate: (card: CardProps) => void;
  onDelete?: (id: string) => void;
}
