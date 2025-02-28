import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import {
  calculateStreak,
  calculateTotalPerfectDays,
} from "@/app/Pages/Statistics/Components/StatisticsBoard";
import { defaultColor, darkModeColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/contextApi";
import AllHabits from "../../AllHabits";
import { getCurrentDayName } from "@/app/utils/allHabitsUtils/DateFunctions";
import { HabitType } from "@/app/Types/GlobalTypes";
function MainStatistics() {
  const {
    darkModeObject,
    allHabitsObject: { allHabits },
    selectedCurrentDayObject: { selectedCurrentDate },
  } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;

  const [statisticsInfo, setStatisticsInfo] = useState([
    { id: 1, num: 7, subTitle: "Total streaks" },
    { id: 2, num: 10, subTitle: "Total Perfect days" },
  ]);

  const [progress, setProgress] = useState<number>(0);

  function calculateThePercentageOfTodaysProgress(
    allHabits: HabitType[]
  ): number {
    //1. GET THE COMPLETED DAYS OF THE CURRENT DATE
    //2.GET ALL THE HABITS THAT NEED TO BE DONE FOR THIS CURRENT DAY
    if (allHabits.length === 0 || !selectedCurrentDate) {
      return 0;
    }

    let totalHabitsOfCompletedDays = 0;
    let totalAllHabitsOfCurrentDay = 0;

    if (allHabits) {
      //GET THE COMPLETED DAYS OF THE CURRENT DATE
      const completedHabitsOfCurrentDate: HabitType[] = allHabits.filter(
        (habit) =>
          habit.completedDays.some((day) => day.date === selectedCurrentDate)
      );

      totalHabitsOfCompletedDays = completedHabitsOfCurrentDate.length;

      //GET ALL THE HABITS THAT NEED TO BE DONE FOR THIS CURRENT DAY
      const getTwoLetterOfCurrentDay = getCurrentDayName(
        selectedCurrentDate
      ).slice(0, 2);

      const allHabitsOfCurrentDay = allHabits.filter((habit) =>
        habit.frequency[0].days.some((day) => day === getTwoLetterOfCurrentDay)
      );

      totalAllHabitsOfCurrentDay = allHabitsOfCurrentDay.length;
      const result =
        (totalHabitsOfCompletedDays / totalAllHabitsOfCurrentDay) * 100;

      console.log(result);

      if (result === undefined || isNaN(result)) {
        return 0;
      }
      return result ?? 0;
    }

    return 0;
  }

  useEffect(() => {
    setProgress(calculateThePercentageOfTodaysProgress(allHabits));
  }, [selectedCurrentDate, allHabits]);

  useEffect(() => {
    //Calculate the total streak
    //:::::::::::::::::::::::::::::::::::::::::::::
    const streaks = allHabits.map((habit) => calculateStreak(habit));
    const totalStreak = streaks.reduce((a, b) => a + b, 0);

    //Calculate the total perfect days
    const perfectDays = calculateTotalPerfectDays(allHabits);
    //Updating the statistics
    const copyStatsInfo = [...statisticsInfo];
    copyStatsInfo[0].num = totalStreak;
    copyStatsInfo[1].num = perfectDays;
    setStatisticsInfo(copyStatsInfo);
  }, [allHabits]);

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.backgroundSlate
          : defaultColor.backgroundSlate,
      }}
      className="flex mx-4 flex-col gap-6 justify-center items-center mt-14
          rounded-xl p-5 pt-7   "
    >
      <span className="font-bold text-xl cursor-pointer hover:text-customRed">
        Statistics
      </span>
      {/* the circular progress bar */}
      <div className="relative pt-3">
        <CircularProgressBar progress={progress} />
        <div className="flex flex-col justify-center items-center absolute top-[59%] left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
          <span className="font-bold text-xl text-customRed">
            {progress.toFixed(0)}%
          </span>
          <span className="text-[11px] text-slate-400 text-center mt-1">{`Current Day's Progress`}</span>
        </div>
      </div>
      {/* best streaks and perfect days */}
      <div className=" my-4  flex justify-center gap-6 flex-wrap items-center    w-full">
        {statisticsInfo.map((singleItem, singleItemIndex) => (
          <div className=" flex items-center gap-3" key={singleItemIndex}>
            <div className="w-2 h-2 bg-customRed rounded-full"></div>
            <div className="text-[12px]">
              <span className="flex flex-col font-bold  ">
                {singleItem.num}
              </span>
              <span
                style={{
                  color: isDarkMode
                    ? darkModeColor.textColor
                    : defaultColor.textColor50,
                }}
                className=" "
              >
                {singleItem.subTitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface CircularProgressBarProps {
  progress: number; // Progress in percentage (0-100)
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
}) => {
  const data = [
    { name: "Completed", value: progress },
    { name: "Remaining", value: 100 - progress },
  ];

  const COLORS = [defaultColor.default, "#edf2f4"];

  return (
    <PieChart
      width={200}
      height={160}
      // className="bg-red-300"
      margin={{ top: -20, right: 0, bottom: 40, left: 0 }}
    >
      <Pie
        data={data}
        cx={100}
        cy={100}
        startAngle={180}
        endAngle={-180}
        innerRadius={66}
        outerRadius={progress === 100 ? 80 : 78}
        fill="#edf2f4"
        paddingAngle={0}
        dataKey="value"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default MainStatistics;
