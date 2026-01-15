type CardNewModalTypes = "edit" | "create";

export interface CardNewModalProps {
  type?: CardNewModalTypes;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cardTitle: string, content: string, dateCreated: string) => void;
}
