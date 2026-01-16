import type { CardProps } from "../../../../types/types";

export interface CardDetailProps {
  isOpen: boolean;
  onClose: () => void;
  data: CardProps;
  onUpdate: (card: CardProps) => void;
  onDelete?: (id: string) => void;
}
