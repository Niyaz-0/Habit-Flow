import React, { useState, useEffect } from "react";
import AllHabitsTopBar from "./Components/AllHabitsTopBar";
import AllHabitsRightSideBar from "./Components/AllHabitsRightSideBar";
import HabitsContainer from "./Components/HabitsContainer";
import HabitsCompleted from "./Components/HabitsCompleted";
import HabitWindow from "./Components/HabitWindow";
import { Toaster } from "react-hot-toast";
import AreasContainer from "./Components/AreasContainer";
import { HabitType } from "@/app/Types/GlobalTypes";
import DropDown from "@/app/Dropdown";
import { ConfirmationWindow } from "@/app/ConfirmationWindow";

function AllHabits() {
  return (
    <div className=" max-lg:flex-col w-full flex flex-row gap-0 relative">
      <ConfirmationWindow />
      <DropDown />
      <Toaster />
      <HabitWindow />
      <div className=" flex-col flex-grow m-3">
        <AllHabitsTopBar />
        <AreasContainer />
        <HabitsContainer />
        <HabitsCompleted />
      </div>

      <AllHabitsRightSideBar />
    </div>
  );
}

export default AllHabits;
