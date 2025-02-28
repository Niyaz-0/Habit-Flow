import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { darkModeColor, defaultColor } from "@/colors";
import { useGlobalContextProvider } from "./contextApi";
import { AreaType, HabitType } from "./Types/GlobalTypes";
interface dropMenuItem {
  name: string;
  icon: IconProp;
}

function DropDown() {
  const {
    darkModeObject,
    openDropDownObject,
    dropDownPositionsObject,
    openConfirmationWindowObject,
    selectedItemsObject,
    habitWindowObject,
    openAreaFormObject,
  } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  const { openDropDown, setOpenDropDown } = openDropDownObject;
  const { dropDownPositions } = dropDownPositionsObject;
  const { setOpenConfirmationWindow, openConfirmationWindow } =
    openConfirmationWindowObject;
  const { setSelectedItems, selectedItems } = selectedItemsObject;
  const ref = useRef<HTMLDivElement>(null);
  const { openHabitWindow, setOpenHabitWindow } = habitWindowObject;
  const { setOpenAreaForm, openAreaForm } = openAreaFormObject;

  const dropDownMenuItems: dropMenuItem[] = [
    { name: "Edit", icon: faPencil },
    { name: "Remove", icon: faTrash },
  ];

  const [hover, setHover] = useState(false);
  const [indexHovered, setIndexHovered] = useState(0);

  function handleHoverChange(index: number, state: boolean) {
    setIndexHovered(index);
    setHover(state);
  }

  //Creating the typeGuards to check if the selectedItems is of type AreaType or HabitType
  function isAreaType(item: any): item is AreaType {
    return "name" in item && "icon" in item && !("frequency" in item);
  }

  function isHabitType(item: any): item is HabitType {
    return "frequency" in item && "notificationTime" in item;
  }

  function handleClickOption(index: number) {
    switch (index) {
      //Edit option
      case 0:
        if (isHabitType(selectedItems)) {
          setOpenHabitWindow(true);
        } else if (isAreaType(selectedItems)) {
          setOpenAreaForm(true);
        }

        setOpenDropDown(false);

        break;
      //Delete option
      case 1:
        setOpenConfirmationWindow(true);
        setOpenDropDown(false);

        break;
      default:
        break;
    }
  }

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (ref && !ref.current?.contains(event.target as Node)) {
        setOpenDropDown(false);

        if (!openConfirmationWindow && !openHabitWindow && !openAreaForm) {
          setSelectedItems(null);
        }
      }
    }

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [openDropDown]);

  return (
    <div
      ref={ref}
      style={{
        left: dropDownPositions.left - 135,
        top: dropDownPositions.top + 40,
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      className={`p-3 w-40 fixed z-[60] shadow-md flex rounded-lg flex-col gap-3   
  text-[11px]   ${openDropDown ? "block" : "hidden"}`}
    >
      {dropDownMenuItems.map((menuItem, index) => (
        <div
          style={{
            backgroundColor:
              hover && index === indexHovered ? defaultColor.default : "",
            color: hover && index === indexHovered ? "#ffffff" : "",
          }}
          key={index}
          onMouseEnter={() => handleHoverChange(index, true)}
          onMouseLeave={() => handleHoverChange(index, false)}
          className={`flex gap-2 items-center  rounded-md p-3 
          select-none cursor-pointer transition-all `}
          onClick={() => handleClickOption(index)}
        >
          <FontAwesomeIcon
            style={{
              color:
                hover && index === indexHovered
                  ? "#ffffff"
                  : defaultColor.default,
            }}
            className="size-4   "
            icon={menuItem.icon}
          />
          <div
            style={{
              color:
                hover && index === indexHovered
                  ? "#ffffff"
                  : !isDarkMode
                  ? "black"
                  : "white",
            }}
            className={` }`}
          >
            {menuItem.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DropDown;
