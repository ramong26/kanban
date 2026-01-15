import type { CardProps } from "../Card/types";

export interface CollumnProps {
  title: string;
  items?: CardProps[];
  onEdit?: (newTitle: string) => void;
}
