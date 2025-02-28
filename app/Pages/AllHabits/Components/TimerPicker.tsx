import { useGlobalContextProvider } from "@/app/contextApi";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { defaultColor } from "@/colors";
import { darkModeColor } from "@/colors";
import { faClose } from "@fortawesome/free-solid-svg-icons";

//Types
type TimeValue = {
  text: string;
  isSelected: boolean;
};

function TimerPicker({
  onSaveTime,
}: {
  onSaveTime: (timeValue: string) => void;
}) {
  // Constants
  const { darkModeObject, openTimePickerObject } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  const { openTimePickerWindow, setOpenTimePickerWindow } =
    openTimePickerObject;

  //Time Values HH:MM
  const [timeValues, setTimeValues] = useState<TimeValue[]>([
    { text: "11", isSelected: true },
    { text: "12", isSelected: false },
  ]);

  // Meridiem
  const [meridiem, setMeridiem] = useState([
    { text: "AM", isSelected: true },
    { text: "PM", isSelected: false },
  ]);

  //Refs
  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  //Functions
  //---------

  // Update the meridiem variable
  function updateMeridiemFx(clickedIndex: number) {
    const updateMeridiem = meridiem.map((singleMeridiem, index) => {
      if (index === clickedIndex) {
        return { ...singleMeridiem, isSelected: true };
      }

      return { ...singleMeridiem, isSelected: false };
    });

    setMeridiem(updateMeridiem);
  }

  // Update the timesValues variable
  function updateTimeValues(clickedIndex: number) {
    const updateTimeValues = timeValues.map((singleTimeValue, index) => {
      if (index === clickedIndex) {
        return { ...singleTimeValue, isSelected: true };
      }

      return { ...singleTimeValue, isSelected: false };
    });

    setTimeValues(updateTimeValues);
  }

  //Update the time values text in the array
  function updateTimeValuesText(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const timesValuesCopy = [...timeValues];
    const currentText = event.target.value;
    const parsedValue = parseInt(currentText, 10);

    // Check if the input consists of only digits
    const isNumeric = /^\d*$/.test(currentText);

    function isValidInput(
      currentText: string,
      parsedValue: number,
      index: number
    ) {
      if (
        (index === 0 &&
          currentText.length <= 2 &&
          parsedValue >= 0 &&
          parsedValue <= 12) ||
        (index === 1 &&
          currentText.length <= 2 &&
          parsedValue >= 0 &&
          parsedValue <= 59) ||
        currentText === ""
      ) {
        return true;
      }

      return false;
    }

    if (isNumeric && isValidInput(currentText, parsedValue, index)) {
      timesValuesCopy[index].text = currentText;
      setTimeValues(timesValuesCopy);
    }
  }

  //Handle the exit of each input
  function handleOnBlur(index: number) {
    const timesValuesCopy = [...timeValues];
    const currentText = timesValuesCopy[index].text;

    if (currentText === "") {
      timesValuesCopy[index].text = "00";
    } else if (currentText.length === 1) {
      timesValuesCopy[index].text = "0" + currentText;
    }

    setTimeValues(timesValuesCopy);
  }

  //Save the time in a formatted text
  function saveTime() {
    const meridiemSelected = meridiem.filter(
      (singleMeridiem) => singleMeridiem.isSelected
    )[0].text;

    const selectedTimeFormatted =
      timeValues[0].text + ":" + timeValues[1].text + " " + meridiemSelected;

    onSaveTime(selectedTimeFormatted);
    setOpenTimePickerWindow(false);
  }

  //UseEffect hooks
  //--------------

  useEffect(() => {
    if (openTimePickerWindow) {
      if (timeValues[0].isSelected) {
        hoursRef.current?.focus();
      } else if (timeValues[1].isSelected) {
        minutesRef.current?.focus();
      }
    }
  }, [openTimePickerWindow]);

  useEffect(() => {
    function getCurrentTime() {
      const now = new Date();
      let currentHour = now.getHours();
      const currentMinutes = now.getMinutes().toString().padStart(2, "0");
      const AmPm = currentHour >= 12 ? "PM" : "AM";

      // Convert hours from 24-hour format to 12-hour format
      currentHour = currentHour % 12;
      currentHour = currentHour ? currentHour : 12;
      const formattedHour = currentHour.toString().padStart(2, "0");

      //Update The TimeValues
      const timeValuesCopy = [...timeValues];
      timeValuesCopy[0].text = formattedHour;
      timeValuesCopy[1].text = currentMinutes;
      setTimeValues(timeValuesCopy);

      const copyMeridiem = meridiem.map((singleMeridiem) => {
        if (singleMeridiem.text === AmPm) {
          return { ...singleMeridiem, isSelected: true };
        }

        return { ...singleMeridiem, isSelected: false };
      });

      setMeridiem(copyMeridiem);
    }

    getCurrentTime();
  }, [openTimePickerWindow]);

  // JSX
  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.background : "white",
      }}
      className={` w-[413px] top-[89px] left-1/2
    transform -translate-x-1/2 z-50 p-7 rounded-md shadow-md ${
      openTimePickerWindow ? "absolute" : "hidden"
    } `}
    >
      {/* Select time + closing icon */}
      <span className="font-bold flex justify-between items-center">
        {/* Select time */}
        <span>Select Time</span>

        {/* Closing icon */}
        <FontAwesomeIcon
          height={20}
          width={20}
          className={`top-8 right-4 text-gray-300 cursor-pointer`}
          onClick={() => setOpenTimePickerWindow(false)}
          icon={faClose}
        />
      </span>
      {/* -------------------------------------------- */}
      {/* Input fields */}
      <div className=" flex  gap-8 mt-9">
        <div className=" flex gap-2 justify-center items-center">
          {/* Hours field */}
          <input
            value={timeValues[0].text}
            onClick={() => {
              updateTimeValues(0);
            }}
            ref={hoursRef}
            onChange={(event) => updateTimeValuesText(event, 0)}
            onBlur={() => handleOnBlur(0)}
            readOnly={!timeValues[0].isSelected}
            style={{
              backgroundColor: timeValues[0].isSelected
                ? defaultColor[100]
                : defaultColor.backgroundSlate,
              color: timeValues[0].isSelected
                ? defaultColor.default
                : defaultColor.textColorGray,
            }}
            className=" w-[100px] text-[45px] p-4 rounded-md text-center outline-none"
          />

          <span className="text-2x font-bold">:</span>

          {/* minutes field */}
          <input
            value={timeValues[1].text}
            ref={minutesRef}
            onClick={() => {
              updateTimeValues(1);
            }}
            onChange={(event) => updateTimeValuesText(event, 1)}
            onBlur={() => handleOnBlur(1)}
            readOnly={!timeValues[1].isSelected}
            style={{
              backgroundColor: timeValues[1].isSelected
                ? defaultColor[100]
                : defaultColor.backgroundSlate,
              color: timeValues[1].isSelected
                ? defaultColor.default
                : defaultColor.textColorGray,
            }}
            className=" w-[100px] text-[45px] p-4 rounded-md text-center outline-none"
          />
        </div>
        {/* -------------------------------------------- */}
        {/* AM OR PM Options */}
        <div className="flex flex-col gap-3  ">
          {meridiem.map((singleMeridiem, index) => (
            <span
              key={index}
              onClick={() => updateMeridiemFx(index)}
              style={{
                backgroundColor: singleMeridiem.isSelected
                  ? defaultColor[100]
                  : defaultColor.backgroundSlate,
                color: singleMeridiem.isSelected
                  ? defaultColor.default
                  : defaultColor.textColorGray,
              }}
              className="  text-xl flex justify-center items-center w-[104px] h-[45px] rounded-md cursor-pointer select-none"
            >
              {singleMeridiem.text}
            </span>
          ))}
        </div>
      </div>
      {/* -------------------------------------------- */}
      {/* Save Button */}
      <button
        onClick={saveTime}
        className="bg-customRed p-3 text-white w-full rounded-md mt-10 mb-1"
      >
        Save
      </button>
    </div>
  );
}

export default TimerPicker;
