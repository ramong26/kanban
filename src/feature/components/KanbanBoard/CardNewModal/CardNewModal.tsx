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
        console.log(props.data);
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={(e) => handleOverlayClick(e, onClose)}
      role="dialog"
      aria-modal="true"
    >
      <form
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col gap-4"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">
            {props.type === "create" ? "카드 추가" : "카드 편집"}
          </h2>
          <button
            type="button"
            className="text-gray-600 hover:text-gray-700 text-xl py-1 px-2"
            onClick={onClose}
            aria-label="닫기"
          >
            ×
          </button>
        </div>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">제목</span>
          <input
            defaultValue={isEdit ? props.data.title : ""}
            ref={titleRef}
            type="text"
            placeholder="제목을 입력하세요"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            maxLength={40}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">설명</span>
          <textarea
            defaultValue={isEdit ? props.data.description : ""}
            ref={descriptionRef}
            placeholder="설명을 입력하세요"
            className="border rounded px-3 py-2 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            maxLength={200}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">마감 날짜</span>
          <input
            defaultValue={isEdit ? props.data.dateCreated : ""}
            ref={dateRef}
            type="date"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        <button
          type="submit"
          className="bg-blue-500 text-black rounded py-2 font-semibold hover:bg-blue-600"
        >
          저장
        </button>
      </form>
    </div>
  );
}
