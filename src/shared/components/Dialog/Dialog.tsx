import { useModalEsc } from "@/shared/hooks/useModalEsc";
import type { DialogProps } from "./types";

export default function Dialog({
  isOpen,
  onClose,
  onConfirm,
  title = "확인",
  message = "정말 삭제하시겠습니까?",
}: DialogProps) {
  useModalEsc(onClose, isOpen);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-white to-pink-50 rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col gap-6 border-2 border-pink-100">
        <h2 className="text-3xl font-bold text-pink-700">{title}</h2>
        <p className="text-gray-700 text-base leading-relaxed">{message}</p>
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-8 py-3 rounded-xl bg-purple-200 text-purple-700 hover:bg-purple-300 font-bold transition-colors border-2 border-purple-300"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-red-400 text-white hover:from-pink-500 hover:to-red-500 font-bold transition-all shadow-lg hover:shadow-xl"
            onClick={onConfirm}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
