import { useState } from "react";

import Card from "../Card";
import ColumnNewModal from "./ColumnNewModal";
import type { CollumnProps } from "./types";

export default function Collumn({ title, items, onEdit }: CollumnProps) {
  const [openCollumnModal, setOpenCollumnModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-4 w-80 min-h-[200px]">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-700 text-sm px-3 py-1 rounded hover:bg-gray-100 transition-colors"
            onClick={() => setOpenCollumnModal(!openCollumnModal)}
            aria-label="수정"
          >
            수정
          </button>
        </div>
        <div className="space-y-3">
          {items?.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
        <button
          type="button"
          className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
          onClick={() => {}}
        >
          + 카드 추가
        </button>
      </div>
      {openCollumnModal && onEdit && (
        <ColumnNewModal
          title="컬럼 이름 수정"
          isOpen={openCollumnModal}
          onClose={() => setOpenCollumnModal(false)}
          onSubmit={(newTitle) => {
            onEdit(newTitle);
            setOpenCollumnModal(false);
          }}
        />
      )}
    </>
  );
}
