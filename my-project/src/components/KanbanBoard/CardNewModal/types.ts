type CardNewModalTypes = "edit" | "create";

export interface CardNewModalProps {
  type?: CardNewModalTypes;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (card: {
    title: string;
    content: string;
    dateCreated: string;
  }) => void;
}
