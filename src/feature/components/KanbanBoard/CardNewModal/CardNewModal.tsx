import { useCallback, useRef, useState } from "react";

import SelectStatus from "../../../../shared/components/SelectStatus";
import type { CardNewModalProps } from "./types";
import type { CardStatus, CardPriority } from "../../../../types/types";
import {
  useModalEsc,
  handleOverlayClick,
} from "../../../../shared/hooks/useModalEsc";

export default function CardNewModal({
  isOpen,
  onClose,
  onSubmit,
  ...props
}: CardNewModalProps) {
  const isEdit = props.type === "edit" && "data" in props;
  const onDelete = isEdit && "onDelete" in props ? props.onDelete : undefined;

  useModalEsc(onClose, isOpen);

  // Refs for form fields
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<CardStatus>(
    isEdit ? props.data.status : "todo"
  );
  const statusOptions: CardStatus[] = ["todo", "in-progress", "done"];
  const onSelectStatus = useCallback((status: string) => {
    setStatus(status as CardStatus);
  }, []);

  const [priority, setPriority] = useState<CardPriority>(
    isEdit ? props.data.priority : "low"
  );
  const priorityOptions: CardPriority[] = ["low", "medium", "high"];
  const onSelectPriority = useCallback((priority: string) => {
    setPriority(priority as CardPriority);
  }, []);

  // Form submission handler
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const isEdit = props.type === "edit" && "data" in props;
      const title = titleRef.current?.value.trim() || "";
      const description = descriptionRef.current?.value.trim() || "";
      const dateCreated = dateRef.current?.value || "";

      if (isEdit) {
        onSubmit({
          ...props.data,
          title: title || props.data.title,
          description: description || props.data.description,
          dateCreated: dateCreated || props.data.dateCreated,
          status,
          priority,
          updatedAt: new Date().toISOString(),
        });
      } else {
        onSubmit({
          id: crypto.randomUUID(),
          title,
          description,
          dateCreated,
          status,
          priority,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    },
    [props, status, priority, onSubmit]
  );

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={(e) => handleOverlayClick(e, onClose)}
      role="dialog"
      aria-modal="true"
    >
      <form
        className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-2xl p-10 w-full max-w-lg flex flex-col gap-6 border-2 border-purple-100"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-purple-800">
            {props.type === "create" ? "카드 추가" : "카드 편집"}
          </h2>
          <button
            type="button"
            className="text-purple-400 hover:text-purple-600 text-4xl py-1 px-2 transition-colors"
            onClick={onClose}
            aria-label="닫기"
          >
            ×
          </button>
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold text-purple-700">제목</span>
          <input
            defaultValue={isEdit ? props.data.title : ""}
            ref={titleRef}
            type="text"
            placeholder="제목을 입력하세요"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            maxLength={40}
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold text-purple-700">설명</span>
          <textarea
            defaultValue={isEdit ? props.data.description : ""}
            ref={descriptionRef}
            placeholder="설명을 입력하세요"
            className="border-2 border-purple-200 rounded-xl px-5 py-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 bg-white resize-none transition-all"
            maxLength={200}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold text-purple-700">마감 날짜</span>
          <input
            defaultValue={isEdit ? props.data.dateCreated : ""}
            ref={dateRef}
            type="date"
            className="border-2 border-purple-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 bg-white transition-all"
          />
        </label>
        <SelectStatus
          data={statusOptions}
          value={status}
          onChange={onSelectStatus}
        />
        <SelectStatus
          data={priorityOptions}
          value={priority}
          onChange={onSelectPriority}
          required
        />
        <div className="flex justify-between items-center mt-4 gap-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-black rounded py-2 font-semibold border-2 border-blue-600"
          >
            저장
          </button>
          {isEdit && (
            <button
              type="button"
              className="w-full bg-red-500 text-black rounded py-2 font-semibold hover:bg-red-600"
              onClick={() => {
                onDelete?.();
                onClose();
              }}
            >
              삭제
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
