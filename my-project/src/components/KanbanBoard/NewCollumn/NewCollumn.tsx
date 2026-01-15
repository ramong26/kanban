import { useState } from "react";
import ColumnNewModal from "../Collumn/ColumnNewModal";
import type { NewCollumnProps } from "./types";

export default function NewCollumn({ onAddCollumn }: NewCollumnProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="flex items-center justify-center p-2 bg-white border-2 border-gray-300 rounded cursor-pointer mb-4 h-20  font-semibold text-gray-600 hover:bg-gray-300"
        onClick={() => setModalOpen(true)}
      >
        + New Column
      </div>
      {modalOpen && (
        <ColumnNewModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={onAddCollumn}
        />
      )}
    </>
  );
}
