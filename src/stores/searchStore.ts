import { create } from "zustand";

interface SearchStore {
  query: string;
  setQuery: (newQuery: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  setQuery: (newQuery: string) => set({ query: newQuery }),
}));
