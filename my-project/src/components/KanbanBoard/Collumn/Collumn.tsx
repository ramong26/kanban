import Card from "../Card";
import type { CollumnProps } from "./types";

export default function Collumn({ title, items }: CollumnProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 w-64 mr-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {items?.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </div>
  );
}
