import { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

import Collumn from "./Collumn";

import { mockCards } from "../../../shared/mock";
import type { CardProps, CardStatus } from "../../../types/types";

const columnTitles = ["To Do", "In Progress", "Done"];

const statusMap: Record<string, string> = {
  "To Do": "todo",
  "In Progress": "in-progress",
  Done: "done",
};

function getInitialData() {
  const data: Record<string, CardProps[]> = {};
  columnTitles.forEach((title) => {
    data[title] = mockCards.filter((c) => c.status === statusMap[title]);
  });
  return data;
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState(getInitialData());

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol) {
      const newCards = Array.from(columns[sourceCol]);
      const [moved] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, moved);
      setColumns({ ...columns, [sourceCol]: newCards });
    } else {
      const sourceCards = Array.from(columns[sourceCol]);
      const destCards = Array.from(columns[destCol]);
      const [moved] = sourceCards.splice(source.index, 1);
      moved.status = statusMap[destCol] as CardStatus;
      destCards.splice(destination.index, 0, moved);
      setColumns({
        ...columns,
        [sourceCol]: sourceCards,
        [destCol]: destCards,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 p-4 bg-gray-100 min-h-screen">
        {columnTitles.map((title) => (
          <Droppable droppableId={title} key={title}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
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
