import type { CardStatus, CardPriority } from "../../../types/types";

export interface SelectStatusProps {
  data: CardStatus[] | CardPriority[];
  value: CardStatus | CardPriority;
  onChange: (status: CardStatus | CardPriority) => void;
  required?: boolean;
}
