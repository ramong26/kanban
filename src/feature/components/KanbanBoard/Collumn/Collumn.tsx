import { useCallback, useState } from "react";

import Card from "../Card";
import CardNewModal from "../CardNewModal";

import type { CollumnProps } from "./types";
import type { CardProps } from "../../../../types/types";

import { mockCards } from "../../../../shared/mock";
import { Droppable } from "react-beautiful-dnd";
const LOCAL_STORAGE_CARDS_KEY = "kanban-cards";

export default function Collumn({ title }: CollumnProps) {
  const [openCardModal, setOpenCardModal] = useState(false);

  // first render load from local storage
  const [cards, setCards] = useState<CardProps[]>(() => {
    const storedCards = localStorage.getItem(LOCAL_STORAGE_CARDS_KEY);
    let loadedCards: CardProps[] = [];

    if (storedCards) {
      try {
        const parsed = JSON.parse(storedCards);
        if (
          typeof parsed === "object" &&
          parsed !== null &&
          Array.isArray(parsed[title])
        ) {
          loadedCards = parsed[title];
        }
      } catch (error) {
        console.error("Failed to parse stored cards:", error);
      }
    }

    if (loadedCards.length === 0) {
      loadedCards = mockCards.filter(
        (card) =>
          card.status ===
          (title === "To Do"
            ? "todo"
            : title === "In Progress"
            ? "in-progress"
            : "done")
      );
    }

    return loadedCards;
  });

  // Add Card Handler
  const handleAddCard = useCallback(
    (card: CardProps) => {
      const updatedCards = [...cards, card];
      setCards(updatedCards);

      const raw = localStorage.getItem(LOCAL_STORAGE_CARDS_KEY);
      let allCards: Record<string, CardProps[]> = {};
      if (raw) {
        try {
          allCards = JSON.parse(raw);
        } catch {
          allCards = {};
        }
      }
      allCards[title] = updatedCards;
      localStorage.setItem(LOCAL_STORAGE_CARDS_KEY, JSON.stringify(allCards));
    },
    [cards, title]
  );

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-4 w-80 min-h-[200px] flex flex-col">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        </div>
        <Droppable droppableId={title}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex-1 space-y-3 min-h-[100px] transition-colors ${
                snapshot.isDraggingOver ? "bg-blue-50 rounded" : ""
              }`}
            >
              {cards.length > 0 ? (
                cards.map((item, idx) => (
                  <Card key={item.id} item={item} index={idx} />
                ))
              ) : (
                <p className="text-gray-400 text-sm text-center py-8">
                  카드가 없습니다
                </p>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <button
          type="button"
          className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
          onClick={() => setOpenCardModal(true)}
        >
          + 카드 추가
        </button>
      </div>

      {openCardModal && (
        <CardNewModal
          isOpen={openCardModal}
          onClose={() => setOpenCardModal(false)}
          onSubmit={(card) => {
            handleAddCard(card);
            setOpenCardModal(false);
          }}
        />
      )}
    </>
  );
}
