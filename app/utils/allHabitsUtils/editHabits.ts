import { iconToText } from "@/app/Pages/AllHabits/Components/IconsWindow/IconData";
import { HabitType, AreaType } from "@/app/Types/GlobalTypes";
import toast from "react-hot-toast";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import scheduleNotifications from "../notificationFunctions";
export default function convertIconsToTextOfHabits(habit: HabitType) {
  const { icon, areas } = habit;

  //Convert the icon to text and store it in the habitIconToText variable
  const habitIconToText = iconToText(icon as IconProp);

  //Convert the icons in the areas array
  const areasCopy = areas.map((area) => ({
    ...area,
    icon: iconToText(area.icon as IconProp),
  }));

  //Update the icon and the areas in the habit object to update in the DB
  const updatedHabit = { ...habit, icon: habitIconToText, areas: areasCopy };

  return updatedHabit;
}

export async function editHabit({
  allHabits,
  setAllHabits,
  selectedItems,
  habit,
}: {
  allHabits: HabitType[];
  setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
  selectedItems: AreaType | HabitType | null;
  habit: HabitType;
}) {
  try {
    const currentHabitSelected = selectedItems as HabitType;
    //Find the habit in the all habits array
    const findTheHabit = allHabits.findIndex(
      (singleHabit) => singleHabit._id === currentHabitSelected._id
    );
    //Create a shallow copy of the habits array
    const copyAllHabits = [...allHabits];
    //Update the habits array
    copyAllHabits[findTheHabit] = habit;

    //Convert the icon from IconProp to string in the icon property and in the areas property
    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    //Update the icon and the areas in the habit object to update in the DB
    const updatedHabit = convertIconsToTextOfHabits(habit);

    console.log(currentHabitSelected._id);

    //Use the fetch method to update the habit in the DB
    const response = await fetch(
      `/api/habits?habitId=${currentHabitSelected._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedHabit.name,
          icon: updatedHabit.icon,
          areas: updatedHabit.areas,
          frequency: updatedHabit.frequency,
          notificationTime: updatedHabit.notificationTime,
          isNotificationOn: updatedHabit.isNotificationOn,
          completedDays: updatedHabit.completedDays,
        }),
      }
    );
    if (!response.ok) {
      // Handle non-200 HTTP status codes
      const errorData = await response.json();
      toast.error(errorData.message || "Something went wrong");
      return;
    }

    const data = await response.json();

    //Update the allHabits state
    setAllHabits(copyAllHabits);
    toast.success("Habit has been updated successfully");

    if (updatedHabit.isNotificationOn) {
      // notificationTime: "09:49 PM"
      // days ['Mo', 'We', 'Su']
      scheduleNotifications(
        updatedHabit.notificationTime,
        updatedHabit.frequency[0].days,
        updatedHabit.name
      );
    }
  } catch (error) {
    toast.error("Something went wrong");
    console.log(error);
  }
}
