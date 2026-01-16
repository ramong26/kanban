import { useState } from "react";

import CardDetail from "../CardDetail";

import type { BaseCardProps } from "./types";
import CardNewModal from "../CardNewModal";

const priorityColor = {
  all: "bg-gray-100 text-gray-700",
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const statusColor = {
  all: "bg-gray-100 text-gray-700",
  todo: "bg-blue-100 text-blue-700",
  "in-progress": "bg-yellow-100 text-yellow-700",
  done: "bg-green-100 text-green-700",
};

export default function Card({
  data,
  onUpdate,
  onDelete,
  highlight,
}: BaseCardProps) {
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <div
        className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-sm p-6 mb-4 border-2 border-purple-100 hover:shadow-lg hover:border-purple-200 hover:scale-[1.02] transition-all cursor-pointer"
        onClick={() => {
          setOpenDetail(true);
        }}
      >
        <div className={`flex justify-between items-center mb-2 ${highlight}`}>
          <h3 className="text-base font-bold truncate whitespace-nowrap overflow-hidden text-ellipsis w-[100px] ">
            {data.title}
          </h3>
          <div className="flex gap-2">
            <span
              className={`text-xs px-2 py-0.5 rounded ${
                priorityColor[data.priority]
              }`}
            >
              {data.priority === "low"
                ? "낮음"
                : data.priority === "medium"
                ? "중간"
                : "높음"}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded whitespace-nowrap overflow-hidden text-ellipsis ${
                statusColor[data.status]
              }`}
            >
              {data.status === "todo"
                ? "#할 일"
                : data.status === "in-progress"
                ? "#진행 중"
                : "#완료"}
            </span>
          </div>
        </div>
        {data.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
            {data.description}
          </p>
        )}
        <div className="flex flex-wrap gap-1 mb-2">
          {data.tags &&
            data.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-200 text-blue-700 text-sm px-3 py-1 rounded-full font-medium border border-blue-300"
              >
                #{tag}
              </span>
            ))}
        </div>
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>
            {data.assignee && (
              <span className="font-medium text-gray-500 mr-2">
                👤 {data.assignee}
              </span>
            )}
          </span>
          <span>
            {data.dateCreated
              ? new Date(data.dateCreated).toLocaleDateString("ko-KR")
              : ""}
          </span>
        </div>
      </div>

      {openDetail && (
        <CardDetail
          data={data}
          isOpen={openDetail}
          onClose={() => setOpenDetail(false)}
          onUpdate={() => {
            setOpenDetail(false);
            setOpenEdit(true);
          }}
          onDelete={() => {
            onDelete?.(data.id);
            setOpenDetail(false);
          }}
        />
      )}
      {openEdit && (
        <CardNewModal
          type="edit"
          data={data}
          isOpen={openEdit}
          onClose={() => setOpenEdit(false)}
          onSubmit={(updatedCard) => {
            onUpdate(updatedCard);
            setOpenEdit(false);
          }}
          onDelete={() => {
            onDelete?.(data.id);
            setOpenEdit(false);
          }}
        />
      )}
    </>
  );
}
