import { Dispatch, SetStateAction } from "react";
import { HabitType, AreaType } from "@/app/Types/GlobalTypes";
import toast from "react-hot-toast";

//
export async function deleteHabit(
  allHabits: HabitType[],
  setAllHabits: Dispatch<SetStateAction<HabitType[]>>,
  selectedItems: AreaType | HabitType | null
) {
  try {
    const updatedHabits: HabitType[] = allHabits.filter(
      (habit) => habit._id !== selectedItems?._id
    );

    const response = await fetch(`/api/habits`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ habitId: selectedItems?._id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      return { success: false, message: errorData.message };
    }

    const data = await response.json();
    toast.success("Habit has been deleted successfully");
    setAllHabits(updatedHabits);
    return { success: true, message: data.message };
  } catch (error) {
    toast.error("Something went wrong");
  }
}
