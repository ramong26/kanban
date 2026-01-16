import type { CardProps } from "../../../../types/types";

export interface BaseCardNewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (card: CardProps) => void;
}

interface EditCardNewModalProps extends BaseCardNewModalProps {
  type: "edit";
  data: CardProps;
}

interface CreateCardNewModalProps extends BaseCardNewModalProps {
  type: "create";
}

export type CardNewModalProps = CreateCardNewModalProps | EditCardNewModalProps;
