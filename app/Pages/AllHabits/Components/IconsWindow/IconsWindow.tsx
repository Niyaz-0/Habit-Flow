"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { iconsData } from "./IconData";
import { useGlobalContextProvider } from "@/app/contextApi";
import { defaultColor, darkModeColor } from "@/colors";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
function IconsWindow({
  openIconWindow,
  setOpenIconWindow,
  iconSelected,
  setIconSelected,
}: {
  openIconWindow: boolean;
  setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
  iconSelected: IconProp;
  setIconSelected: React.Dispatch<React.SetStateAction<IconProp>>;
}) {
  const [allIcons, setAllIcons] = useState(iconsData);
  const { darkModeObject } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.background : "white",
        color: isDarkMode ? darkModeColor.textColor : "black",
      }}
      className={`z-[60] w-[70%] left-1/2 transform -translate-x-1/2 p-4 rounded-md 
      border flex flex-col gap-6 shadow-md top-20   ${
        openIconWindow ? "absolute" : "hidden"
      } `}
    >
      <FontAwesomeIcon
        onClick={() => {
          setOpenIconWindow(false);
        }}
        height={20}
        width={20}
        className={`     absolute top-8 right-4 text-gray-300 cursor-pointer`}
        icon={faClose}
      />
      <span className="font-bold text-lg   bg-transparent mt-3 ">
        Choose Your Icon
      </span>
      <div
        className="border border-gray-200 p-5 flex flex-wrap gap-4
        items-center rounded-md mb-5  "
      >
        {allIcons.map((icon, iconIndex) => (
          <FontAwesomeIcon
            key={iconIndex}
            className={`border p-2   border-gray-300 rounded-md text-xl cursor-pointer
              hover:text-customRed hover:border-customRed
                `}
            height={50}
            width={50}
            icon={icon.faIcon}
            onClick={() => {
              setIconSelected(icon.faIcon);
              setOpenIconWindow(false);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default IconsWindow;
