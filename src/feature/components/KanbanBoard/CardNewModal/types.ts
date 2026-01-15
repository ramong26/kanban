import type { CardProps } from "../../../../types/types";

type CardNewModalTypes = "edit" | "create";

export interface CardNewModalProps {
  type?: CardNewModalTypes;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (card: CardProps) => void;
}
