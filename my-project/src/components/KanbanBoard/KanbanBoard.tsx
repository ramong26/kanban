import { useCallback, useState } from "react";
import Collumn from "./Collumn";
import NewCollumn from "./NewCollumn";

const LOCAL_STORAGE_KEY = "kanban-columns";

export default function KanbanBoard() {
  const items = [
    {
      title: "Sample Task 1",
      content: "This is a sample task.",
      dateCreated: new Date(),
    },
    {
      title: "Sample Task 2",
      content: "Thi is another sample task.",
      dateCreated: new Date(),
    },
  ];

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

  return (
    <div className="flex-col  p-4  bg-gray-100 min-h-screen">
      <NewCollumn onAddCollumn={handleAddCollumn} />
      <div className="flex space-x-4">
        <Collumn title="To Do" items={items} />
        <Collumn title="In Progress" />
        <Collumn title="Done" />
        {collumns.map((title, index) => (
          <Collumn
            key={index}
            title={title}
            onEdit={(newTitle) => handleEditCollumn(index, newTitle)}
          />
        ))}
      </div>
    </div>
  );
}
