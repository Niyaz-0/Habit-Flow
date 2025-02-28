import { useGlobalContextProvider } from "@/app/contextApi";
import StatisticsHabitCard from "./StatisticsHabitCard";
import { darkModeColor } from "@/colors";

function StatisticsHabitArea() {
  const {
    allHabitsObject: { allHabits },
    darkModeObject: { isDarkMode },
  } = useGlobalContextProvider();
  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.background : "white",
      }}
      className="p-4   mt-4 rounded-md"
    >
      {allHabits.map((habit, index) => (
        <div key={index}>
          <StatisticsHabitCard habit={habit} />
        </div>
      ))}
    </div>
  );
}

export default StatisticsHabitArea;
