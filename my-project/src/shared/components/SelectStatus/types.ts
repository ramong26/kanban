import type { CardStatus, CardPriority } from "../../../types/types";

export interface SelectStatusProps {
  items: CardStatus[] | CardPriority[];
  value: CardStatus | CardPriority;
  onChange: (status: CardStatus | CardPriority) => void;
  required?: boolean;
}
