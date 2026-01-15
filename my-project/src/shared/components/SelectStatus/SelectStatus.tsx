import { useCallback } from "react";

import type { SelectStatusProps } from "./types";
import type { CardPriority, CardStatus } from "../../../types/types";

export default function SelectStatus({
  items,
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
      {items.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
