//This function format the Date object to yy-mm-dd format
export function getDateString(currentDate: Date, daysOffset = 0) {
  // Create a new Date object based on the current date and the offset
  const adjustedDate = new Date(currentDate);
  adjustedDate.setDate(currentDate.getDate() + daysOffset);

  const year = adjustedDate.getFullYear();
  const month = String(adjustedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(adjustedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

//This function gets the name of the string date
export function getCurrentDayName(dateString: string) {
  // Array of day names
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  //Get the current date
  const currentDate = new Date(dateString);

  //Current Day Number
  const currentDayNumber = currentDate.getDay();

  return daysOfWeek[currentDayNumber];
}

//Get the formatted date dd month yy
export function getFormattedDate(dateString: string): string {
  // Create a new Date object based on the current date and the offset
  const currentDate = new Date(dateString);

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the day, month, and year
  const day = currentDate.getDate();
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  // Format the date string
  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
}
