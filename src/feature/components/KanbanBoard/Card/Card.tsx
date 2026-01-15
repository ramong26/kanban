import type { CardProps } from "../../../../types/types";

const priorityColor = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

export default function Card({ item }: { item: CardProps }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-bold truncate">{item.title}</h3>
        <span
          className={`text-xs px-2 py-0.5 rounded ${
            priorityColor[item.priority]
          }`}
        >
          {item.priority === "low"
            ? "낮음"
            : item.priority === "medium"
            ? "중간"
            : "높음"}
        </span>
      </div>
      {item.description && (
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {item.description}
        </p>
      )}
      <div className="flex flex-wrap gap-1 mb-2">
        {item.tags &&
          item.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
      </div>
      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>
          {item.assignee && (
            <span className="font-medium text-gray-500 mr-2">
              👤 {item.assignee}
            </span>
          )}
        </span>
        <span>
          {item.dateCreated
            ? new Date(item.dateCreated).toLocaleDateString("ko-KR")
            : ""}
        </span>
      </div>
    </div>
  );
}
