import { useCallback, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

import Card from "../Card";
import CardNewModal from "../CardNewModal";

import type { CollumnProps } from "./types";
import type { CardProps } from "../../../../types/types";

const LOCAL_STORAGE_CARDS_KEY = "kanban-cards";

export default function Collumn({ title, cards, setCards }: CollumnProps) {
  const [openCardModal, setOpenCardModal] = useState(false);

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
    [cards, title, setCards]
  );

  // Update Card Handler (Edit Card)
  const onUpdateCard = useCallback(
    (updatedCard: CardProps) => {
      const updatedCards = cards.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      );
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
    [cards, title, setCards]
  );
  return (
    <>
      <Droppable droppableId={title}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`bg-white rounded-lg shadow-lg p-4 w-80 min-h-[200px] h-[1500px] flex flex-col transition-all
              ${
                snapshot.isDraggingOver
                  ? "border-2 border-blue-400 bg-blue-50"
                  : "border border-gray-100"
              }
            `}
          >
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800">{title}</h2>
            </div>
            <div className="flex-1 space-y-3 overflow-auto">
              {cards && cards.length > 0 ? (
                cards.map((item: CardProps, idx: number) => (
                  <Draggable key={item.id} draggableId={item.id} index={idx}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`transition-all ${
                          snapshot.isDragging
                            ? "bg-blue-100 border-blue-400 shadow-xl scale-105"
                            : ""
                        }`}
                      >
                        <Card item={item} onUpdate={onUpdateCard} />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <p className="text-gray-400 text-sm">카드가 없습니다</p>
              )}
              {provided.placeholder}
            </div>
            <button
              type="button"
              className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
              onClick={() => setOpenCardModal(true)}
            >
              + 카드 추가
            </button>
          </div>
        )}
      </Droppable>
      {openCardModal && (
        <CardNewModal
          type="create"
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
