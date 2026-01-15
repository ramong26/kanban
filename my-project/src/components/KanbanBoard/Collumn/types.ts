import type { CardProps } from "../Card/types";

export interface CollumnProps {
  edit?: boolean;
  title: string;
  items?: CardProps[];
  onAddCard?: (
    columnTitle: string,
    card: { title: string; content: string; dateCreated: string }
  ) => void;
  onEdit?: (newTitle: string) => void;
  onDelete?: () => void;
}
