import type { CardPriority } from "@/types/types";

export interface SelectStatusProps {
  data: CardPriority[];
  value: CardPriority;
  onChange: (status: CardPriority) => void;
  required?: boolean;
}
