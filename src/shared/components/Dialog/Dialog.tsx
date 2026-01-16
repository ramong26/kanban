import type { DialogProps } from "./types";

export default function Dialog({
  isOpen,
  onClose,
  onConfirm,
  title = "확인",
  message = "정말 삭제하시겠습니까?",
}: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-gray-700">{message}</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="px-4 py-2 rounded bg-red-500 text-gray-700 hover:bg-red-600"
            onClick={onConfirm}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
