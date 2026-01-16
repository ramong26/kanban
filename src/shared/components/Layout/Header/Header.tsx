import { useCallback, useEffect, useState } from "react";
import { useSearchStore } from "../../../../stores/searchStore";

export default function Header() {
  // Search Handler
  const { query, setQuery, searchResults, setSearchResults } = useSearchStore();
  const [searchQuery, setSearchQuery] = useState(query);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  useEffect(() => {
    const debouncedSave = setTimeout(() => {
      setQuery(searchQuery);

      if (searchQuery && setSearchResults) {
        const updatedResults = [searchQuery, ...(searchResults || [])]
          .filter((item, index, self) => self.indexOf(item) === index)
          .slice(0, 5);
        setSearchResults(updatedResults);
      }
    }, 300);

    return () => clearTimeout(debouncedSave);
  }, [searchQuery, setQuery, searchResults, setSearchResults]);

  return (
    <header className="bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 p-8 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-purple-800">
          칸반 보드
        </h1>
        <div className="flex flex-col items-end">
          <input
            type="search"
            placeholder="검색..."
            className="px-6 py-3 rounded-2xl border-2 border-purple-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 text-gray-700 placeholder-gray-400 transition-all w-96"
            value={searchQuery}
            onChange={handleChange}
          />
          {searchResults && searchResults.length > 0 && (
            <div className="flex gap-2 mt-2">
              {searchResults.map((word, idx) => (
                <span
                  key={idx}
                  className="bg-pink-100 text-purple-700 px-3 py-1 rounded-full shadow-sm border border-pink-200 text-sm cursor-pointer hover:bg-purple-100 transition"
                  onClick={() => setSearchQuery(word)}
                >
                  {word}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
