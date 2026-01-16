import { useCallback, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

import Card from "../Card";
import CardNewModal from "../CardNewModal";
import Dialog from "../../../../shared/components/Dialog";
import SelectStatus from "../../../../shared/components/SelectStatus/SelectStatus";

import { useSearchStore } from "../../../../stores/searchStore";
import type { CollumnProps } from "./types";
import type {
  CardProps,
  CardPriority,
  CardStatus,
} from "../../../../types/types";

const LOCAL_STORAGE_CARDS_KEY = "kanban-cards";

export default function Collumn({ title, cards, setCards }: CollumnProps) {
  const [openCardModal, setOpenCardModal] = useState(false);

  // Search and Filter
  const { query } = useSearchStore();

  const priorityOptions: CardPriority[] = ["all", "high", "medium", "low"];
  const [priority, setPriority] = useState<CardPriority>("all");
  const onSelectPriority = useCallback((value: string) => {
    setPriority(value as CardPriority);
  }, []);

  const statusOptions: CardStatus[] = ["all", "todo", "in-progress", "done"];
  const [status, setStatus] = useState<CardStatus>("all");
  const onSelectStatus = useCallback((value: string) => {
    setStatus(value as CardStatus);
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
            className={`bg-white rounded-lg shadow-lg p-4 w-80 min-h-[200px] h-[70vh] flex flex-col transition-all
              ${
                snapshot.isDraggingOver
                  ? "border-2 border-blue-400 bg-blue-50"
                  : "border border-gray-100"
              }
            `}
          >
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800">{title}</h2>

              <SelectStatus
                data={priorityOptions}
                value={priority}
                onChange={onSelectPriority}
              />
              <SelectStatus
                data={statusOptions}
                value={status}
                onChange={onSelectStatus}
              />
            </div>
            <div className="flex-1 space-y-3 overflow-auto">
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
