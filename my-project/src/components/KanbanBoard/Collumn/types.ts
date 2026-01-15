import type { CardProps } from "../Card/types";

export interface CollumnProps {
  edit?: boolean;
  title: string;
  items?: CardProps[];
  onEdit?: (newTitle: string) => void;
  onDelete?: () => void;
}
