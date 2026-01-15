import { useState, useCallback } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";

import Collumn from "./Collumn";
import { mockColumns } from "../../../shared/mock";
import type { CardProps, CardStatus } from "../../../types/types";

const LOCAL_STORAGE_CARDS_KEY = "kanban-cards";

export default function KanbanBoard() {
  const [refreshKey, setRefreshKey] = useState(0);

  const onDragEnd = useCallback((result: DropResult) => {
    const { destination, source } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const cardJson = localStorage.getItem(LOCAL_STORAGE_CARDS_KEY);

    if (!cardJson) return;

    const allCards = JSON.parse(cardJson);
    const sourceColCards = Array.from(
      allCards[source.droppableId] || []
    ) as CardProps[];
    const destColCards = Array.from(
      allCards[destination.droppableId] || []
    ) as CardProps[];

    if (source.droppableId === destination.droppableId) {
      const [movedCard] = sourceColCards.splice(source.index, 1);
      sourceColCards.splice(destination.index, 0, movedCard);
      allCards[source.droppableId] = sourceColCards;
    } else {
      const [movedCard] = sourceColCards.splice(source.index, 1);

      const statusMap: Record<string, CardStatus> = {
        "To Do": "todo",
        "In Progress": "in-progress",
        Done: "done",
      };
      movedCard.status = statusMap[destination.droppableId];
      destColCards.splice(destination.index, 0, movedCard);
      allCards[source.droppableId] = sourceColCards;
      allCards[destination.droppableId] = destColCards;
    }

    localStorage.setItem(LOCAL_STORAGE_CARDS_KEY, JSON.stringify(allCards));
    setRefreshKey((prev) => prev + 1);
  }, []);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex-col  p-4  bg-gray-100 min-h-screen">
        <div className="flex space-x-4">
          {mockColumns.map((column) => (
            <Collumn key={`${column.id}-${refreshKey}`} title={column.title} />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}
