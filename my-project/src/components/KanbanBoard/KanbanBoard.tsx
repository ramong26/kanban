import { useCallback, useState } from "react";
import Collumn from "./Collumn";
import NewCollumn from "./NewCollumn";

const LOCAL_STORAGE_KEY = "kanban-columns";
const LOCAL_STORAGE_CARDS_KEY = "kanban-cards";

export default function KanbanBoard() {
  // First Render Load from Local Storage
  const [collumns, setCollumns] = useState<string[]>(() => {
    const storedCollumns = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedCollumns) {
      try {
        const parsed = JSON.parse(storedCollumns);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error("Failed to parse stored columns:", error);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        return [];
      }
    }
    return [];
  });

  // Get Cards By Column Title
  const getCardsByColumn = (columnTitle: string) => {
    const raw = localStorage.getItem(LOCAL_STORAGE_CARDS_KEY);
    if (!raw) return [];
    try {
      const cardsByColumn = JSON.parse(raw);

      return Array.isArray(cardsByColumn[columnTitle])
        ? cardsByColumn[columnTitle]
        : [];
    } catch {
      return [];
    }
  };

  // Add New Collumn Handler
  const handleAddCollumn = useCallback(
    (title: string) => {
      const updatedCollumns = [...collumns, title];
      setCollumns(updatedCollumns);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCollumns));
    },
    [collumns]
  );

  // Edit Collumn Handler
  const handleEditCollumn = useCallback(
    (index: number, newTitle: string) => {
      const updated = [...collumns];
      updated[index] = newTitle;
      setCollumns(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    },
    [collumns]
  );

  // Delete Collumn Handler
  const handleDeleteCollumn = useCallback(
    (index: number) => {
      const updated = collumns.filter((_, i) => i !== index);
      setCollumns(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    },
    [collumns]
  );

  return (
    <div className="flex-col  p-4  bg-gray-100 min-h-screen">
      <NewCollumn onAddCollumn={handleAddCollumn} />
      <div className="flex space-x-4">
        {["To Do", "In Progress", "Done", ...collumns].map((title, index) => (
          <Collumn
            edit={index >= 3}
            key={title}
            title={title}
            items={getCardsByColumn(title)}
            onEdit={
              index >= 3
                ? (newTitle) => handleEditCollumn(index - 3, newTitle)
                : undefined
            }
            onDelete={
              index >= 3 ? () => handleDeleteCollumn(index - 3) : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
