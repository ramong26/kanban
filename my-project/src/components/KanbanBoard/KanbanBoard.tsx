import Collumn from "./Collumn";
import NewCollumn from "./NewCollumn";

export default function KanbanBoard() {
  const items = [
    {
      title: "Sample Task 1",
      content: "This is a sample task.",
      dateCreated: new Date(),
    },
    {
      title: "Sample Task 2",
      content: "Thi is another sample task.",
      dateCreated: new Date(),
    },
  ];
  return (
    <div className="flex-col  p-4  bg-gray-100 min-h-screen">
      <NewCollumn />
      <div className="flex space-x-4">
        <Collumn title="To Do" items={items} />
        <Collumn title="In Progress" />
        <Collumn title="Done" />
      </div>
    </div>
  );
}
