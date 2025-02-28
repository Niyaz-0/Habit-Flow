import { faFlask, faStairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import { useGlobalContextProvider } from "@/app/contextApi";
import { AreaType } from "@/app/Types/GlobalTypes";
import { textToIcon } from "../../AllHabits/Components/IconsWindow/IconData";
import { darkModeColor, defaultColor } from "@/colors";
import DropDown from "@/app/Dropdown";
import DataFormModal from "@/Modal";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import addNewArea from "@/app/utils/allAreasUtils/addNewArea";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import editArea from "@/app/utils/allAreasUtils/editArea";
import { HabitType } from "@/app/Types/GlobalTypes";

function AllAreasContainer() {
  const {
    allAreasObject: { allAreas, setAllAreas },
    darkModeObject: { isDarkMode },
    openAreaFormObject: { openAreaForm, setOpenAreaForm },
    selectedItemsObject: { selectedItems, setSelectedItems },
    openIconWindowObject: { setOpenIconWindow, iconSelected },
    allHabitsObject: { allHabits, setAllHabits },
  } = useGlobalContextProvider();

  const { user } = useUser();

  const [areaItem, setAreaItem] = useState<AreaType>({
    _id: "",
    name: "",
    icon: faFlask,
    clerkUserId: "",
  });

  function handleOnClose() {
    setOpenAreaForm(!openAreaForm);
    setSelectedItems(null);
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAreaItem({
      ...areaItem,
      name: event.target.value,
    });
  }
  function isAreaType(item: any): item is AreaType {
    return "name" in item && "icon" in item && !("frequency" in item);
  }

  function handleOnClick() {
    if (!selectedItems) {
      //Check if the area name is not empty
      if (areaItem.name.trim() === "") {
        return toast.error("The area name field is still empty");
      }

      //Check if there's no area with the same name
      const areaExist = allAreas.some(
        (singleArea) =>
          singleArea.name.toLocaleLowerCase() ===
          areaItem.name.toLocaleLowerCase()
      );
      if (areaExist) {
        toast.error("The area already exists");
        return;
      }

      try {
        addNewArea({ allAreas, setAllAreas, areaItem });
        setOpenAreaForm(false);
      } catch (error) {}
    } else {
      if (isAreaType(selectedItems)) {
        editArea({ areaItem, allAreas, setAllAreas, allHabits, setAllHabits });
        setSelectedItems(null);
        setOpenAreaForm(false);
      }
    }
  }

  useEffect(() => {
    //When the form is closed reset the area item
    if (!openAreaForm) {
      setAreaItem((prevAreaItem) => ({
        ...prevAreaItem,
        name: "",
      }));
      return;

      //When the window is opened
    } else {
      //If we are going to create an new are
      if (!selectedItems) {
        //Generate a new Id when it is opened
        setAreaItem({
          ...areaItem,
          _id: "",
          clerkUserId: user?.id as string,
        });
      } else {
        setAreaItem(selectedItems);
      }
    }
  }, [openAreaForm]);

  //Change the icon property of the area item when the iconSelected changes
  useEffect(() => {
    setAreaItem({
      ...areaItem,
      icon: iconSelected,
    });
  }, [iconSelected]);

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      className="  w-full mt-5 p-6 flex flex-col gap-6 rounded-md"
    >
      <DropDown />
      <DataFormModal
        isOpen={openAreaForm}
        onClose={handleOnClose}
        FormTitle={selectedItems ? "Edit Area" : "Add Area"}
        textValue={areaItem.name}
        onChange={handleOnChange}
        onClick={handleOnClick}
      />

      {allAreas.map((singleArea, index) => (
        <div key={index}>
          <AreaCard singleArea={singleArea} />
        </div>
      ))}
    </div>
  );
}

export default AllAreasContainer;

function AreaCard({ singleArea }: { singleArea: AreaType }) {
  const {
    darkModeObject: { isDarkMode },
    openDropDownObject: { openDropDown, setOpenDropDown },
    dropDownPositionsObject: { setDropDownPositions },
    selectedItemsObject: { setSelectedItems },
    openAreaFormObject: { openAreaForm, setOpenAreaForm },
    allHabitsObject: { allHabits, setAllHabits },
  } = useGlobalContextProvider();

  function openTheDropDown(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const top = rect.top;
    const left = rect.left;
    setDropDownPositions({ top, left });
    setSelectedItems(singleArea);
    setOpenDropDown(true);
  }

  function calculateHabitsCount(allHabits: HabitType[], singleArea: AreaType) {
    let count = 0;

    allHabits.forEach((habit) => {
      if (habit.areas.length > 0) {
        count += habit.areas.filter(
          (area) => area._id === singleArea._id
        ).length;
      }
    });

    return count;
  }

  function countAll(allHabits: HabitType[], singleArea: AreaType) {
    let countAll = 0;

    allHabits.forEach((habit) => {
      if (habit.areas.length === 0) {
        countAll++;
      }
    });

    return countAll;
  }

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.backgroundSlate
          : defaultColor.backgroundSlate,
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
      }}
      className="flex justify-between   p-5 rounded-md"
    >
      {/* Icons and texts */}
      <div className="flex  items-center gap-4">
        <FontAwesomeIcon
          className="w-5 h-5 text-customRed"
          height={20}
          width={20}
          icon={singleArea.icon}
        />
        <div className="flex flex-col">
          <span className="font-semibold ">{singleArea.name}</span>
          <span className="text-gray-400 text-[13px] flex gap-[2px] items-center">
            <span className=" ">
              {singleArea.name === "All"
                ? countAll(allHabits, singleArea)
                : calculateHabitsCount(allHabits, singleArea)}
            </span>
            <span className=" font-light">Habits</span>
          </span>
        </div>
      </div>
      {/* Three dots */}
      {/* div for the three dots button */}
      <div className="w-10 flex items-center justify-center">
        {singleArea.name !== "All" && (
          <IconButton onClick={openTheDropDown}>
            <MoreVertIcon sx={{ color: "gray" }} />
          </IconButton>
        )}
      </div>
    </div>
  );
}
