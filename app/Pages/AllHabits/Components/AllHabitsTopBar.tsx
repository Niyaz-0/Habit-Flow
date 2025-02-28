import React, { useEffect } from "react";
import AllHabitsSearchBar from "./AllHabitsSearchBar";
import DarkMode from "./DarkMode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { useGlobalContextProvider } from "@/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";
function AllHabitsTopBar() {
  const { openSideBarObject, darkModeObject } = useGlobalContextProvider();
  const { openSideBar, setOpenSideBar } = openSideBarObject;
  const { isDarkMode } = darkModeObject;
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-10 h-10", // Custom width and height
      userButtonPopoverActionButton: "text-red-600", // Custom text color for action buttons
    },
  };

  function openSideBarFunction() {
    setOpenSideBar(!openSideBar);
  }

  useEffect(() => {
    function handleResize() {
      setOpenSideBar(false);
    }

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      className="  p-5     rounded-md flex justify-between transition-all"
    >
      <div className="flex gap-4">
        <div className="max-lg:flex hidden   ">
          <UserButton appearance={userButtonAppearance} />
        </div>

        <div className="flex flex-col max-md:hidden ">
          <span className="text-xl">
            <span className="font-bold">Hi There</span>
            <span className="font-light">, Ali</span>
          </span>
          <span className="font-light text-[12px] text-gray-400">
            welcome back!
          </span>
        </div>
      </div>

      <div className="w-[50%] max-md:w-[80%] flex gap-3 justify-between ">
        <AllHabitsSearchBar />
        <DarkMode />
        <FontAwesomeIcon
          onClick={openSideBarFunction}
          className="m-2 max-xl:flex hidden  mt-[13px] cursor-pointer  "
          icon={faBars}
        />
      </div>
    </div>
  );
}

export default AllHabitsTopBar;
