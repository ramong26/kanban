import type { CardProps } from "../../../../types/types";

export interface BaseCardProps {
  data: CardProps;
  onUpdate: (card: CardProps) => void;
  onDelete?: (id: string) => void;
  highlight?: string;
}
