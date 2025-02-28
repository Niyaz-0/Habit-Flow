import { ListIcon } from "../Assets/ListIcon";

import { defaultColor } from "@/colors";
export default function EmptyHabitsPlaceHolder() {
  return (
    <div className="flex justify-center items-center p-5 flex-col">
      <ListIcon color={defaultColor.textColor50} />
      <span className="text-[13px] text-gray-400">
        Nothing scheduled for this day
      </span>
    </div>
  );
}
