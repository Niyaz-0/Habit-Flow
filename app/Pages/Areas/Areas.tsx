import React, { useState } from "react";
import AreasTopBar from "./Components/AllAreasTopBar";
import AllAreasContainer from "./Components/AllAreasContainer";
import DataFormModal from "@/Modal";
import DropDown from "@/app/Dropdown";
import { ConfirmationWindow } from "@/app/ConfirmationWindow";
import IconsWindow from "../AllHabits/Components/IconsWindow/IconsWindow";
import { fa1 } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/contextApi";
import { Toaster } from "react-hot-toast";

function Areas() {
  const {
    openIconWindowObject: {
      openIconWindow,
      setOpenIconWindow,
      iconSelected,
      setIconSelected,
    },
  } = useGlobalContextProvider();

  return (
    <div className="w-full h-screen p-3 relative">
      <Toaster />
      <IconsWindow
        openIconWindow={openIconWindow}
        setOpenIconWindow={setOpenIconWindow}
        iconSelected={iconSelected}
        setIconSelected={setIconSelected}
      />
      <DropDown />
      <ConfirmationWindow />
      <AreasTopBar />
      <AllAreasContainer />
    </div>
  );
}

export default Areas;
