import { create } from "zustand";

interface SearchStore {
  query: string;
  setQuery: (newQuery: string) => void;
  searchResults?: string[];
  setSearchResults?: (results: string[]) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  setQuery: (newQuery: string) => set({ query: newQuery }),
  searchResults: [],
  setSearchResults: (results: string[]) => set({ searchResults: results }),
}));
