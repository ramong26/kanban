import { useSearchStore } from "../../../../stores/searchStore";

export default function Header() {
  const { query, setQuery } = useSearchStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Kanban Board</h1>
      <input
        type="search"
        placeholder="Search..."
        className="mt-2 p-2 border rounded w-100 "
        value={query}
        onChange={handleChange}
      />
    </header>
  );
}
