import { HabitType } from "@/app/Types/GlobalTypes";
import toast from "react-hot-toast";
async function updateHabitInMongoDB(habit: HabitType) {
  try {
    const response = await fetch(`/api/habits?habitId=${habit._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: habit.name,
        icon: habit.icon,
        areas: habit.areas,
        frequency: habit.frequency,
        notificationTime: habit.notificationTime,
        isNotificationOn: habit.isNotificationOn,
        completedDays: habit.completedDays,
      }),
    });

    if (!response.ok) {
      // Handle non-200 HTTP status codes
      const errorData = await response.json();
      toast.error(errorData.message || "Something went wrong");
      return;
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
}

export default updateHabitInMongoDB;
