import type { CardProps } from "../../../types/types";

export default function Card({ item }: { item?: CardProps }) {
  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">{item?.title}</h3>
      <p className="text-gray-700 mb-2">{item?.content}</p>
      <span className="text-sm text-gray-500">
        {item?.dateCreated
          ? new Date(item.dateCreated).toLocaleDateString()
          : ""}
      </span>
    </div>
  );
}
