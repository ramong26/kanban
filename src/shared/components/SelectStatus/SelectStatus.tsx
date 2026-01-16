import { useCallback } from "react";

import type { SelectStatusProps } from "./types";
import type { CardPriority, CardStatus } from "../../../types/types";

export default function SelectStatus({
  data,
  value,
  onChange,
  required = false,
}: SelectStatusProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value as CardPriority | CardStatus);
    },
    [onChange]
  );

  return (
    <select
      className="border border-gray-300 rounded-md p-2"
      value={value}
      onChange={handleChange}
      required={required}
    >
      {data.map((item) => (
        <option key={item} value={item}>
          {item === "low"
            ? "낮음"
            : item === "medium"
            ? "중간"
            : item === "high"
            ? "높음"
            : item === "todo"
            ? "할 일"
            : item === "in-progress"
            ? "진행 중"
            : "완료"}
        </option>
      ))}
    </select>
  );
}
