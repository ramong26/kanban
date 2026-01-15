import { useEffect } from "react";

export function useModalEsc(onClose: () => void, isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);
}

export function handleOverlayClick(e: React.MouseEvent, onClose: () => void) {
  if (e.target === e.currentTarget) onClose();
}
