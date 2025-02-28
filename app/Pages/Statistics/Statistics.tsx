import React, { useState } from "react";
import StatisticsTopBar from "./Components/StatisticsTopBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBorderAll,
  faChartSimple,
  faCheck,
  faChevronCircleRight,
  faChevronDown,
  faChevronUp,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { defaultColor } from "@/colors";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import StatisticsBoard from "./Components/StatisticsBoard";
import StatisticsHabitsArea from "./Components/StatisticsHabitArea";

function Statistics() {
  return (
    <div className="w-full  p-3">
      <StatisticsTopBar />
      <StatisticsBoard />
      <StatisticsHabitsArea />
    </div>
  );
}

export default Statistics;
