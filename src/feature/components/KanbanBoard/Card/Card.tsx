import { useState } from "react";

import CardDetail from "../CardDetail";

import type { BaseCardProps } from "./types";
import CardNewModal from "../CardNewModal";

const priorityColor = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

export default function Card({ data, onUpdate, onDelete }: BaseCardProps) {
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-md p-4 mb-3 border border-gray-100 hover:shadow-lg transition-shadow"
        onClick={() => {
          setOpenDetail(true);
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-base font-bold truncate">{data.title}</h3>
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
        </div>
        {data.description && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {data.description}
          </p>
        )}
        <div className="flex flex-wrap gap-1 mb-2">
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
