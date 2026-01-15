import { useCallback, useEffect, useRef } from "react";
import type { ColumnNewModalProps } from "./types";

const LOCAL_STORAGE_KEY = "kanban-columns";

export default function ColumnNewModal({
  isOpen,
  onClose,
}: ColumnNewModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const value = inputRef.current?.value.trim();
      if (value) {
        localStorage.setItem(LOCAL_STORAGE_KEY, value);
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <form
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col gap-4"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">새 컬럼 추가</h2>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-700 text-xl"
            onClick={onClose}
            aria-label="닫기"
          >
            ×
          </button>
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="컬럼 이름"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          maxLength={20}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-black rounded py-2 font-semibold hover:bg-blue-600"
        >
          추가
        </button>
      </form>
    </div>
  );
}

// /**
//  * TODO
//  * 컬럼 추가 모달 구현
//  * esc, 바깥 클릭 시 모달 닫기
//  * 로컬로 컬럼 추가 기능 구현
//  */
