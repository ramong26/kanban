import { useCallback, useEffect, useState } from "react";
import { useSearchStore } from "../../../../stores/searchStore";

export default function Header() {
  // Search Handler
  const { query, setQuery } = useSearchStore();
  const [searchQuery, setSearchQuery] = useState(query);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  useEffect(() => {
    const debouncedSave = setTimeout(() => {
      setQuery(searchQuery);
    }, 300);

    return () => clearTimeout(debouncedSave);
  }, [searchQuery, setQuery]);

  return (
    <header className="bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 p-8 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-purple-800">
          칸반 보드
        </h1>
        <input
          type="search"
          placeholder="검색..."
          className="px-6 py-3 rounded-2xl border-2 border-purple-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 text-gray-700 placeholder-gray-400 transition-all w-96"
          value={searchQuery}
          onChange={handleChange}
        />
      </div>
    </header>
  );
}
