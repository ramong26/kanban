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
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md flex flex-col gap-4 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
          aria-label="닫기"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.title}</h2>
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
        <div className="flex gap-2 mt-6">
          <button
            className="flex-1 bg-blue-500 text-black rounded py-2 font-semibold hover:bg-blue-600"
            onClick={() => onUpdate(data)}
          >
            편집
          </button>
          <button
            className="flex-1 bg-red-500 text-black rounded py-2 font-semibold hover:bg-red-600"
            onClick={() => onDelete?.(data.id)}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
