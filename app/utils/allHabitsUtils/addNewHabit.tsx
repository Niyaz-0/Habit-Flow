import { AreaType, HabitType } from "@/app/Types/GlobalTypes";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import toast from "react-hot-toast";
import { iconToText } from "@/app/Pages/AllHabits/Components/IconsWindow/IconData";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import scheduleNotifications from "../notificationFunctions";
export async function addNewHabit({
  allHabits,
  setAllHabits,
  habit,
}: {
  allHabits: HabitType[];
  setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
  habit: Omit<HabitType, "_id">;
}) {
  const { icon, areas } = habit;

  // Convert the main icon to text
  const habitIconText = iconToText(icon);

  // Make a copy of the areas array and convert icons to text
  const areasCopy = areas.map((area) => ({
    ...area,
    icon: iconToText(area.icon as IconProp),
  }));

  // Create the updated habit object
  const updatedHabit = { ...habit, icon: habitIconText, areas: areasCopy };

  try {
    const response = await fetch("/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(updatedHabit),
    });

    if (!response.ok) {
      throw new Error("Failed to add habit");
    }
    //Extract the _id from the response
    const data = await response.json();
    const { _id } = data.habit;
    //Update the _id of the habit
    const updatedIdOfHabit = { ...habit, _id: _id };
    //Add the updated habit to the allHabits array
    setAllHabits([...allHabits, updatedIdOfHabit]);

    if (updatedIdOfHabit.isNotificationOn) {
      //notificationTime: "09:49 PM"
      //days ['Mo', 'We', 'Su']
      scheduleNotifications(
        updatedHabit.notificationTime,
        updatedHabit.frequency[0].days,
        updatedHabit.name
      );
    }
    toast.success("Habit added successfully!");
  } catch (error) {
    toast.error("Something went wrong!...");
  }
}
