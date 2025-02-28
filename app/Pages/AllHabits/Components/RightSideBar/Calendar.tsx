import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { defaultColor, darkModeColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/contextApi";
import { getDateString } from "@/app/utils/allHabitsUtils/DateFunctions";
import dayjs, { Dayjs } from "dayjs";

function Calendar() {
  const { darkModeObject, selectedCurrentDayObject, offsetDayObject } =
    useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  const { selectedCurrentDate, setSelectedCurrentDate } =
    selectedCurrentDayObject;
  const { setOffsetDay } = offsetDayObject;

  // Convert selectedCurrentDate to Dayjs object
  const value: Dayjs | null = selectedCurrentDate
    ? dayjs(selectedCurrentDate)
    : null;

  function handleOnChangeDate(newDate: Dayjs) {
    //Convert from the Day.js object to Javascript Date Object
    const jsDate = newDate.toDate();
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const differenceInMs = jsDate.getTime() - currentDate.getTime();

    // Calculate the difference in days
    const differenceInDays = differenceInMs / (1000 * 3600 * 24);

    setOffsetDay(Math.floor(differenceInDays + 1));
  }

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.backgroundSlate
          : defaultColor.backgroundSlate,
      }}
      className="flex mx-4 flex-col gap-6 justify-center items-center mt-10  
          rounded-xl p-5 pt-7"
    >
      <DateCalendar
        onChange={handleOnChangeDate}
        value={value}
        sx={{
          "& .MuiPickersDay-root": {
            color: isDarkMode
              ? darkModeColor.textColor
              : defaultColor.textColor, // Default text color for the days
            "&.Mui-selected": {
              backgroundColor: defaultColor.default,
              color: "white", // Text color for the selected day
            },
          },
          "& .MuiPickersYear-yearButton": {
            color: isDarkMode
              ? darkModeColor.textColor
              : defaultColor.textColor,
            "&.Mui-selected": {
              backgroundColor: defaultColor.default,
              color: "white", // Text color for the selected year
            },
          },
        }}
      />
    </div>
  );
}

export default Calendar;
