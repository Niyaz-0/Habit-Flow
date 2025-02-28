import { AreaType } from "@/app/Types/GlobalTypes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import toast from "react-hot-toast";
import { iconToText } from "@/app/Pages/AllHabits/Components/IconsWindow/IconData";
import { HabitType } from "@/app/Types/GlobalTypes";
import updateHabitInMongoDB from "./updateHabitInMongoDB";
export default async function editArea({
  areaItem,
  allAreas,
  setAllAreas,
  allHabits,
  setAllHabits,
}: {
  areaItem: AreaType;
  allAreas: AreaType[];
  setAllAreas: React.Dispatch<React.SetStateAction<AreaType[]>>;
  allHabits: HabitType[];
  setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
}) {
  console.log(allHabits);

  //Convert the icon to text
  const { icon } = areaItem;
  const areaIconText = iconToText(icon as IconProp);
  const copyAreaItem = { ...areaItem, icon: areaIconText };

  const updateAllAreas = allAreas.map((area) => {
    if (area._id === areaItem._id) {
      return areaItem;
    } else {
      return area;
    }
  });

  // Update the area in the habit that have the same area in the areas property
  const updateAllHabits = allHabits.map((habit) => {
    if (habit.areas.some((area) => area._id === areaItem._id)) {
      return {
        ...habit,
        areas: habit.areas.map((area) => {
          if (area._id === areaItem._id) {
            return areaItem;
          } else {
            return area;
          }
        }),
      };
    } else {
      return habit;
    }
  });

  console.log(allHabits);

  //Convert all the icons to text of all UpdatedHabits
  const convertIconToTextOfAllHabits: HabitType[] = updateAllHabits.map(
    (habit) => {
      return {
        ...habit,
        icon: iconToText(habit.icon),
        areas: habit.areas.map((area) => ({
          ...area,
          icon: iconToText(area.icon),
        })),
      };
    }
  );

  console.log(updateAllAreas);

  //Update the area in the DB
  convertIconToTextOfAllHabits.forEach((habit) => {
    updateHabitInMongoDB(habit);
  });

  //Update the area in the state
  try {
    const response = await fetch(`/api/areas?areaId=${copyAreaItem._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: copyAreaItem.name,
        icon: copyAreaItem.icon,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to edit area");
    }

    setAllAreas(updateAllAreas);
    setAllHabits(updateAllHabits);
    toast.success("Area has been updated successfully");
  } catch (error) {}
}
