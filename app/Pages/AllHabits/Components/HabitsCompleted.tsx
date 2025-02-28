import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { defaultColor, darkModeColor } from "@/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useGlobalContextProvider } from "@/app/contextApi";
import { HabitCard } from "./SingleHabitCard";
import { HabitType } from "@/app/Types/GlobalTypes";
function HabitsCompleted() {
  const { darkModeObject, allFilteredHabitsObject, selectedCurrentDayObject } =
    useGlobalContextProvider();
  const { selectedCurrentDate } = selectedCurrentDayObject;
  const { isDarkMode } = darkModeObject;
  const { allFilteredHabits } = allFilteredHabitsObject;

  const areAllHabitsNotCompleted = allFilteredHabits.every((singleHabit) => {
    return !singleHabit.completedDays.some(
      (day) => day.date === selectedCurrentDate
    );
  });

  return (
    <div
      style={{
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      className=" mt-7 p-8 py-10   rounded-md"
    >
      <span className="font-bold text-lg mb-2">Habits Completed</span>
      <div className="mt-7  opacity-50  ">
        <div className="mt-10 w-full flex justify-center">
          {areAllHabitsNotCompleted && (
            <p className="text-sm text-gray-400 w-72  text-center">{`Habit stacking is like a superpower! Don't let it go to waste!`}</p>
          )}
        </div>

        {allFilteredHabits.map((singleHabit, index) => (
          <div key={index}>
            {singleHabit.completedDays.some(
              (day) => day.date === selectedCurrentDate
            ) === true && <HabitCard singleHabit={singleHabit} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HabitsCompleted;
