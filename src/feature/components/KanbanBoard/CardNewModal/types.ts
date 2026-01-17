import type { CardProps } from "../../../../types/types";

export interface BaseCardNewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (card: CardProps) => void;
}

interface EditCardNewModalProps extends BaseCardNewModalProps {
  type: "edit";
  data: CardProps;
  onDelete?: () => void;
}

interface CreateCardNewModalProps extends BaseCardNewModalProps {
  type: "create";
  col: string;
}

export type CardNewModalProps = CreateCardNewModalProps | EditCardNewModalProps;
