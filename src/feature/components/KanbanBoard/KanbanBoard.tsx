import Collumn from "./Collumn";

export default function KanbanBoard() {
  return (
    <div className="flex-col  p-4  bg-gray-100 min-h-screen">
      <div className="flex space-x-4">
        {["To Do", "In Progress", "Done"].map((title) => (
          <Collumn key={title} title={title} />
        ))}
      </div>
    </div>
  );
}
