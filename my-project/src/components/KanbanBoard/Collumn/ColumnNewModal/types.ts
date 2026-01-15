export interface ColumnNewModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
}
