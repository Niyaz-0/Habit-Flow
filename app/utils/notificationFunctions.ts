import { sendNotifications } from "../SendNotification";

export default function scheduleNotifications(
  notificationTime: string,
  days: string[],
  habitName: string
) {
  // Map of days to their corresponding numeric value
  const daysMap: Record<string, number> = {
    Su: 0,
    Mo: 1,
    Tu: 2,
    We: 3,
    Th: 4,
    Fr: 5,
    Sa: 6,
  };

  // Split the notification time into the time and the AM/PM modifier
  const [time, modifier] = notificationTime.split(" ");
  // Split the time into hours and minutes
  let [hours, minutes] = time.split(":").map(Number);
  // Adjust hours based on AM/PM modifier
  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  // Create a new Date object for the notification time
  const notificationDate = new Date();
  notificationDate.setHours(hours);
  notificationDate.setMinutes(minutes);
  notificationDate.setSeconds(0);

  // Get the current date and time
  const now = new Date();
  // Get the current day of the week
  const nowDay = now.getDay();
  // Get the current time in milliseconds
  const nowTime = now.getTime();

  // Loop through the specified days to schedule notifications
  days.forEach((day) => {
    // Get the target day as a number
    const targetDay = daysMap[day];
    // Calculate the difference in days
    let diff = targetDay - nowDay;
    // Adjust if the target day is in the next week
    if (diff < 0) diff += 7;
    // Create a new Date object for the target date
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + diff);
    targetDate.setHours(hours);
    targetDate.setMinutes(minutes);
    targetDate.setSeconds(0);

    // Calculate the timeout duration
    const timeout = targetDate.getTime() - nowTime;
    // Schedule the notification
    setTimeout(() => sendNotifications(habitName), timeout);
  });
}
