export function sendNotifications(habitName: string) {
  if ("Notification" in window && Notification.permission === "granted") {
    const notification = new Notification("Habit Stacker", {
      body: `It's time to do your habit: ${habitName}`,
    });

    // Close the notification after a specified time (e.g., 5 seconds)
    setTimeout(() => {
      notification.close();
    }, 5000); // 5000 milliseconds = 5 seconds
  }
}
