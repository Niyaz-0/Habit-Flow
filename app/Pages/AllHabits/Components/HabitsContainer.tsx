import React from "react";
import HabitsContainerTop from "./HabitsContainer/HabitsContainerTop";
import HabitsContainerMiddle from "./HabitsContainer/HabitsContainerMiddle";
import HabitsCompleted from "./HabitsCompleted";
import { useGlobalContextProvider } from "@/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";
function HabitsContainer() {
  const { darkModeObject } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  return (
    <div
      style={{
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      className="mt-5  rounded-md p-5  flex flex-col gap-3"
    >
      <HabitsContainerTop />
      <HabitsContainerMiddle />
    </div>
  );
}

export default HabitsContainer;
