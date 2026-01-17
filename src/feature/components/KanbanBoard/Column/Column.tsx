import { useCallback, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

import Card from "../Card";
import CardNewModal from "../CardNewModal";
import Dialog from "../../../../shared/components/Dialog";
import SelectStatus from "../../../../shared/components/SelectStatus/SelectStatus";

import { useSearchStore } from "../../../../stores/searchStore";

import type { ColumnProps } from "./types";
import type { CardProps, CardPriority } from "../../../../types/types";

const LOCAL_STORAGE_CARDS_KEY = "kanban-cards";

export default function Column({ title, cards, setCards }: ColumnProps) {
  const [openCardModal, setOpenCardModal] = useState(false);

  // Search and Filter
  const { query } = useSearchStore();

  const priorityOptions: CardPriority[] = ["all", "high", "medium", "low"];
  const [priority, setPriority] = useState<CardPriority>("all");
  const onSelectPriority = useCallback((value: string) => {
    setPriority(value as CardPriority);
  }, []);

  const filteredCards = cards
    .filter((card) => card.title.toLowerCase().includes(query.toLowerCase()))
    .filter((card) => (priority === "all" ? true : card.priority === priority))
    .filter((card) => (status === "all" ? true : card.status === status));

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
          console.error("Failed to parse local storage data");
        }
      }
      allCards[title] = updatedCards;
      localStorage.setItem(LOCAL_STORAGE_CARDS_KEY, JSON.stringify(allCards));
    },
    [cards, title, setCards],
  );

  // Update Card Handler (Edit Card)
  const onUpdateCard = useCallback(
    (updatedCard: CardProps) => {
      const updatedCards = cards.map((card) =>
        card.id === updatedCard.id ? updatedCard : card,
      );
      setCards(updatedCards);
      const raw = localStorage.getItem(LOCAL_STORAGE_CARDS_KEY);
      let allCards: Record<string, CardProps[]> = {};
      if (raw) {
        try {
          allCards = JSON.parse(raw);
        } catch {
          allCards = {};
          console.error("Failed to parse local storage data");
        }
      }
      allCards[title] = updatedCards;
      localStorage.setItem(LOCAL_STORAGE_CARDS_KEY, JSON.stringify(allCards));
    },
    [cards, title, setCards],
  );

  // Delete Card Handler (Delete Card)
  const [modalDialogOpen, setModalDialogOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);

  const handleDeleteCard = useCallback((id: string) => {
    setCardToDelete(id);
    setModalDialogOpen(true);
  }, []);

  const confirmDeleteCard = useCallback(() => {
    if (!cardToDelete) return;
    const updatedCards = cards.filter((card) => card.id !== cardToDelete);
    setCards(updatedCards);

    const raw = localStorage.getItem(LOCAL_STORAGE_CARDS_KEY);
    let allCards: Record<string, CardProps[]> = {};
    if (raw) {
      try {
        allCards = JSON.parse(raw);
      } catch {
        allCards = {};
        console.error("Failed to parse local storage data");
      }
    }
    allCards[title] = updatedCards;
    localStorage.setItem(LOCAL_STORAGE_CARDS_KEY, JSON.stringify(allCards));
    setCardToDelete(null);
    setModalDialogOpen(false);
  }, [cards, title, setCards, cardToDelete]);

  return (
    <>
      <Droppable droppableId={title}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`rounded-2xl shadow-sm p-6 min-h-[300px] h-[65vh] flex flex-col transition-all
              ${
                snapshot.isDraggingOver
                  ? "border-2 border-purple-300 bg-purple-50"
                  : "border-2 border-purple-100 bg-gradient-to-b from-purple-50 to-pink-50"
              }
            `}
          >
            <div className="flex gap-3 justify-between items-center mb-5 pb-4 border-b-2 border-purple-200">
              <span className="transition-all md:text-2xl text-xl font-bold text-purple-700 whitespace-nowrap overflow-hidden text-ellipsis">
                {title}
              </span>

              <div className="flex items-center gap-3">
                <SelectStatus
                  data={priorityOptions}
                  value={priority}
                  onChange={onSelectPriority}
                />
              </div>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto overflow-x-hidden">
              {filteredCards && filteredCards.length > 0 ? (
                filteredCards.map((data: CardProps, idx: number) => (
                  <Draggable key={data.id} draggableId={data.id} index={idx}>
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
                        <Card
                          data={data}
                          onUpdate={onUpdateCard}
                          onDelete={() => handleDeleteCard(data.id)}
                          highlight={
                            !!(
                              query &&
                              data.title
                                .toLowerCase()
                                .includes(query.toLowerCase())
                            )
                          }
                        />
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
              className="w-full mt-4 py-3 text-purple-600 hover:text-purple-700 hover:bg-purple-100 rounded-xl border-2 border-dashed border-purple-300 hover:border-purple-400 transition-all font-semibold"
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
          col={title}
          isOpen={openCardModal}
          onClose={() => setOpenCardModal(false)}
          onSubmit={(card) => {
            handleAddCard(card);
            setOpenCardModal(false);
          }}
        />
      )}
      {modalDialogOpen && (
        <Dialog
          title="카드 삭제"
          isOpen={modalDialogOpen}
          onClose={() => setModalDialogOpen(false)}
          onConfirm={confirmDeleteCard}
        />
      )}
    </>
  );
}
