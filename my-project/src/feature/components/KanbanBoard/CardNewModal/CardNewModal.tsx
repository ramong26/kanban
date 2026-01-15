import { useCallback, useRef, useState } from "react";

import SelectStatus from "../../../../shared/components/SelectStatus";
import type { CardNewModalProps } from "./types";
import type {
  CardProps,
  CardStatus,
  CardPriority,
} from "../../../../types/types";
import {
  useModalEsc,
  handleOverlayClick,
} from "../../../../shared/hooks/useModalEsc";

export default function CardNewModal({
  type = "create",
  isOpen,
  onClose,
  onSubmit,
}: CardNewModalProps) {
  useModalEsc(onClose, isOpen);

  // Refs for form fields
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<CardStatus>("todo");
  const statusOptions: CardStatus[] = ["todo", "in-progress", "done"];
  const onSelectStatus = useCallback((status: string) => {
    setStatus(status as CardStatus);
  }, []);

  const [priority, setPriority] = useState<CardPriority>("low");
  const priorityOptions: CardPriority[] = ["low", "medium", "high"];
  const onSelectPriority = useCallback((priority: string) => {
    setPriority(priority as CardPriority);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const cardTitle = titleRef.current?.value.trim() || "";
      const description = descriptionRef.current?.value.trim() || "";
      const date = dateRef.current?.value || "";
      if (cardTitle && priority) {
        onSubmit({
          id: crypto.randomUUID(),
          title: cardTitle,
          description,
          status,
          dateCreated: date,
          priority,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as CardProps);
      }
    },
    [onSubmit, status, priority]
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
        onSubmit={type === "create" ? handleSubmit : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">
            {type === "create" ? "카드 추가" : "카드 편집"}
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
            ref={descriptionRef}
            placeholder="설명을 입력하세요"
            className="border rounded px-3 py-2 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            maxLength={200}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">마감 날짜</span>
          <input
            ref={dateRef}
            type="date"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
        <SelectStatus
          items={statusOptions}
          value={status}
          onChange={onSelectStatus}
        />
        <SelectStatus
          items={priorityOptions}
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
