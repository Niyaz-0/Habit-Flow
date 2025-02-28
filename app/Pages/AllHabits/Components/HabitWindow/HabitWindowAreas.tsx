import React from "react";
import MultipleSelectChip from "./MutlipleSelectChip";

export default function HabitWindowArea({
  onChange,
}: {
  onChange: (selectedItems: any) => void;
}) {
  function getSelectedItems(selectedItems: any) {
    onChange(selectedItems);
  }

  return (
    <div className="flex flex-col gap-2 mt-10 px-3 ">
      <span className="font-semibold text-[17px]">Areas</span>
      <MultipleSelectChip onChange={getSelectedItems} />
    </div>
  );
}
