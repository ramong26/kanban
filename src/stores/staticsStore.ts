import { create } from "zustand";

interface StaticsStore {
  totalCards: number;
  todoCards: number;
  inProgressCards: number;
  doneCards: number;
  setTotalCards: (count: number) => void;
  setTodoCards: (count: number) => void;
  setInProgressCards: (count: number) => void;
  setDoneCards: (count: number) => void;
}

export const useStaticsStore = create<StaticsStore>((set) => ({
  totalCards: 0,
  todoCards: 0,
  inProgressCards: 0,
  doneCards: 0,
  setTotalCards: (count: number) => set({ totalCards: count }),
  setTodoCards: (count: number) => set({ todoCards: count }),
  setInProgressCards: (count: number) => set({ inProgressCards: count }),
  setDoneCards: (count: number) => set({ doneCards: count }),
}));
