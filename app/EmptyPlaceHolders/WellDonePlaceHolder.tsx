import { SuccessIcon } from "../Assets/SuucessIcon";

import { defaultColor } from "@/colors";

export default function WellDonePlaceHolder() {
  return (
    <div className="flex justify-center items-center p-5 flex-col">
      <SuccessIcon color={defaultColor.textColor50} />
      <span className="text-[13px] text-gray-400">
        {`Great job! You've completed all your habits for today. 🌟`}
      </span>
    </div>
  );
}
