export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Kanban Board</h1>
      <input
        type="text"
        placeholder="Search..."
        className="mt-2 p-2 border rounded w-100 "
      />
    </header>
  );
}
