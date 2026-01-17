import { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

import Collumn from "./Collumn";

import { useStaticsStore } from "../../../stores/staticsStore";

import type { CardProps, CardStatus } from "../../../types/types";
import { mockCards } from "../../../shared/mock";

const LOCAL_STORAGE_CARDS_KEY = "kanban-cards";

const columnTitles = ["To Do", "In Progress", "Done"];
const statusMap: Record<string, string> = {
  "To Do": "todo",
  "In Progress": "in-progress",
  Done: "done",
};

function getInitialData() {
  const data: Record<string, CardProps[]> | undefined = {};
  const raw = localStorage.getItem(LOCAL_STORAGE_CARDS_KEY);
  if (raw) {
    try {
      const allCards = JSON.parse(raw);
      columnTitles.forEach((title) => {
        data[title] = allCards[title] || [];
      });
      return data;
    } catch {
      columnTitles.forEach((title) => {
        data[title] = [];
      });
      return data;
    }
  } else {
    const initialData: Record<string, CardProps[]> = {
      "To Do": mockCards.filter((card) => card.status === "todo"),
      "In Progress": mockCards.filter((card) => card.status === "in-progress"),
      Done: mockCards.filter((card) => card.status === "done"),
    };
    localStorage.setItem(LOCAL_STORAGE_CARDS_KEY, JSON.stringify(initialData));
    return initialData;
  }
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState(getInitialData());

  // Drag and Drop Handler
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol) {
      const newCards = Array.from(columns[sourceCol] || []);
      const [moved] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, moved);
      setColumns({ ...columns, [sourceCol]: newCards });
      localStorage.setItem(
        LOCAL_STORAGE_CARDS_KEY,
        JSON.stringify({ ...columns, [sourceCol]: newCards }),
      );
    } else {
      const sourceCards = Array.from(columns[sourceCol] || []);
      const destCards = Array.from(columns[destCol] || []);
      const [moved] = sourceCards.splice(source.index, 1);
      moved.status = statusMap[destCol] as CardStatus;
      destCards.splice(destination.index, 0, moved);
      setColumns({
        ...columns,
        [sourceCol]: sourceCards,
        [destCol]: destCards,
      });
      localStorage.setItem(
        LOCAL_STORAGE_CARDS_KEY,
        JSON.stringify({
          ...columns,
          [sourceCol]: sourceCards,
          [destCol]: destCards,
        }),
      );
    }
  };

  // Statics Store
  const { setTotalCards, setTodoCards, setInProgressCards, setDoneCards } =
    useStaticsStore();

  useEffect(() => {
    const allCards = Object.values(columns).flat();
    setTotalCards(allCards.length);
    setTodoCards(allCards.filter((card) => card.status === "todo").length);
    setInProgressCards(
      allCards.filter((card) => card.status === "in-progress").length,
    );
    setDoneCards(allCards.filter((card) => card.status === "done").length);
  }, [columns, setTotalCards, setTodoCards, setInProgressCards, setDoneCards]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="transition-all flex space-x-4 p-4 bg-gray-100 min-h-screen xl:flex-row  flex-col gap-3">
        {columnTitles.map((title) => (
          <Droppable droppableId={title} key={title}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="m-0"
              >
                <Collumn
                  title={title}
                  cards={columns[title]}
                  setCards={(cards) =>
                    setColumns((prev) => ({ ...prev, [title]: cards }))
                  }
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
