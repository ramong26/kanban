import { useCallback, useState } from "react";
import Card from "../Card";
import CardNewModal from "../CardNewModal";
import ColumnNewModal from "./ColumnNewModal";
import type { CollumnProps } from "./types";

const LOCAL_STORAGE_CARDS_KEY = "kanban-cards";

export default function Collumn({
  edit,
  title,
  onEdit,
  onDelete,
}: CollumnProps) {
  const [openCollumnModal, setOpenCollumnModal] = useState(false);
  const [openCardModal, setOpenCardModal] = useState(false);

  // first render load from local storage
  const [cards, setCards] = useState<
    { title: string; content: string; dateCreated: string }[]
  >(() => {
    const storedCards = localStorage.getItem(LOCAL_STORAGE_CARDS_KEY);
    if (storedCards) {
      try {
        const parsed = JSON.parse(storedCards);
        if (typeof parsed === "object" && parsed !== null) {
          return Array.isArray(parsed[title]) ? parsed[title] : [];
        }
      } catch (error) {
        console.error("Failed to parse stored cards:", error);
      }
    }
    return [];
  });

  // Add Card Handler
  const handleAddCard = useCallback(
    (card: { title: string; content: string; dateCreated: string }) => {
      const updatedCards = [...cards, card];
      setCards(updatedCards);

      // localStorage 전체 카드 데이터 가져와서 업데이트
      const raw = localStorage.getItem(LOCAL_STORAGE_CARDS_KEY);
      let allCards: Record<
        string,
        { title: string; content: string; dateCreated: string }[]
      > = {};
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
          {edit && (
            <div className="flex gap-2">
              {onEdit && (
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-700 text-sm px-3 py-1 rounded hover:bg-gray-100 transition-colors"
                  onClick={() => setOpenCollumnModal(true)}
                  aria-label="수정"
                >
                  수정
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  className="text-gray-400 hover:text-red-600 text-sm px-3 py-1 rounded hover:bg-gray-100 transition-colors"
                  onClick={onDelete}
                  aria-label="삭제"
                >
                  삭제
                </button>
              )}
            </div>
          )}
        </div>
        <div className="flex-1 space-y-3">
          {cards.length > 0 ? (
            cards.map((item, idx) => <Card key={idx} item={item} />)
          ) : (
            <p className="text-gray-400 text-sm">카드가 없습니다</p>
          )}
        </div>
        <button
          type="button"
          className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
          onClick={() => setOpenCardModal(true)}
        >
          + 카드 추가
        </button>
      </div>
      {openCollumnModal && onEdit && (
        <ColumnNewModal
          title="컬럼 이름 수정"
          isOpen={openCollumnModal}
          onClose={() => setOpenCollumnModal(false)}
          onSubmit={(newTitle) => {
            onEdit(newTitle);
            setOpenCollumnModal(false);
          }}
        />
      )}
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
