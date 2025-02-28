import React, { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGlobalContextProvider } from "@/app/contextApi";

import { AreaType } from "@/app/Types/GlobalTypes";
import { darkModeColor, defaultColor } from "@/colors";

export default function AreasContainer() {
  const { allAreasObject, darkModeObject, selectedAreaStringObject } =
    useGlobalContextProvider();
  const { allAreas } = allAreasObject;
  const { isDarkMode } = darkModeObject;
  const { setSelectedAreaString } = selectedAreaStringObject;

  // State to keep track of selected area
  const [selectedAreas, setSelectedAreas] = useState<{
    [key: number]: boolean;
  }>({});
  //

  // Function to toggle selection
  const toggleSelection = (index: number) => {
    //Copy the selectedAreas object to ensure immutability
    const selectedAreasCopy = { ...selectedAreas };

    //Make all the indexes in the selectedAreasCopy false
    Object.keys(selectedAreasCopy).forEach((key) => {
      selectedAreasCopy[parseInt(key)] = false;
    });

    //Only set the index that we clicked on to true
    selectedAreasCopy[index] = true;

    //Update the selectedAreaString by using the index clicked and use it in the AllAreas array
    setSelectedAreaString(allAreas[index].name);

    //Update the selectedAreas state
    setSelectedAreas(selectedAreasCopy);
  };

  // Initialize selectedAreas based on allAreas
  useEffect(() => {
    //Create an empty key value pair object
    const initialSelectedArea: { [key: number]: boolean } = {};

    //Add in it the indexes based on the areas item with false as a value for all of them
    //: {0: false, 1: false, 2: false}
    allAreas.forEach((_, index) => {
      initialSelectedArea[index] = false;
    });

    //Set the first index as true which is All
    initialSelectedArea[0] = true;

    //Update the selectedAreas state
    setSelectedAreas(initialSelectedArea);
  }, [allAreas]);

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      className="p-5    rounded-md flex gap-3 items-center  transition-all mt-5 text-sm "
    >
      <div className="  flex gap-3  ">
        {allAreas.map((area: AreaType, index) => (
          <div onClick={() => toggleSelection(index)} key={index}>
            <SingleAreaContainer
              singleArea={area}
              isSelected={selectedAreas[index]}
            />
          </div>
        ))}
      </div>
    </div>
  );

  function SingleAreaContainer({
    singleArea,
    isSelected,
  }: {
    singleArea: AreaType;
    isSelected: boolean;
  }) {
    return (
      <div
        className={`  p-2 px-3  rounded-md flex gap-2   items-center cursor-pointer select-none ${
          isSelected ? "bg-customRed text-white" : "text-gray-400"
        } `}
      >
        <FontAwesomeIcon icon={singleArea.icon} />
        <span>{singleArea.name}</span>
      </div>
    );
  }
}
