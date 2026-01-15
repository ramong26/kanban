import type { CardProps } from "../../../types/types";

export interface CollumnProps {
  edit?: boolean;
  title: string;
  items?: CardProps[];
  onAddCard?: (columnTitle: string, card: CardProps) => void;
  onEdit?: (newTitle: string) => void;
  onDelete?: () => void;
}
