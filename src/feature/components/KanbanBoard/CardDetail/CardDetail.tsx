import { useModalEsc } from "../../../../shared/hooks/useModalEsc";
import type { CardDetailProps } from "./types";

export default function CardDetail({
  isOpen,
  onClose,
  data,
  onUpdate,
  onDelete,
}: CardDetailProps) {
  useModalEsc(onClose, isOpen);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-2xl p-10 w-full max-w-2xl flex flex-col gap-6 relative border-2 border-purple-100">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
          aria-label="닫기"
        >
          ×
        </button>
        <h2 className="text-3xl font-bold text-gray-900 mb-3 pr-8">
          {data.title}
        </h2>
        <p className="text-gray-600 mb-2">{data.description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {data.tags &&
            data.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
        </div>
        <div className="flex gap-4 text-sm text-gray-500 mb-2">
          <span>
            <b>상태:</b>{" "}
            {data.status === "todo"
              ? "할 일"
              : data.status === "in-progress"
              ? "진행 중"
              : "완료"}
          </span>
          <span>
            <b>우선순위:</b>{" "}
            {data.priority === "low"
              ? "낮음"
              : data.priority === "medium"
              ? "중간"
              : "높음"}
          </span>
        </div>
        <div className="flex gap-4 text-sm text-gray-400">
          <span>
            <b>담당자:</b> {data.assignee || "-"}
          </span>
          <span>
            <b>마감일:</b>{" "}
            {data.dateCreated
              ? new Date(data.dateCreated).toLocaleDateString("ko-KR")
              : "-"}
          </span>
        </div>
        <div className="flex gap-4 mt-10">
          <button
            className="flex-1 bg-gradient-to-r from-purple-400 to-blue-400 text-white rounded-xl py-4 font-bold hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg hover:shadow-xl"
            onClick={() => onUpdate?.(data)}
          >
            편집
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-pink-400 to-red-400 text-white rounded-xl py-4 font-bold hover:from-pink-500 hover:to-red-500 transition-all shadow-lg hover:shadow-xl"
            onClick={() => onDelete?.(data.id)}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
