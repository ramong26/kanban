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
      className="border border-[#d1c4e9] bg-[#f3e8ff] text-[#6d4c9b] rounded-xl p-2 px-4 shadow-md focus:outline-none focus:ring-2 focus:ring-[#b39ddb] transition hover:border-[#b39ddb] font-semibold"
      value={value}
      onChange={handleChange}
      required={required}
    >
      {data.map((item) => (
        <option
          key={item}
          value={item}
          className="bg-[#f3e8ff] text-[#6d4c9b] font-semibold"
        >
          {item === "all"
            ? "전체"
            : item === "low"
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
