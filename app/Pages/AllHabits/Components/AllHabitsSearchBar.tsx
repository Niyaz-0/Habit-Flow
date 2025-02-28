import React, { useState, useEffect, useRef, InputHTMLAttributes } from "react";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContextProvider } from "@/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";
function AllHabitsSearchBar() {
  const {
    darkModeObject,
    allHabitsObject: { allHabits },
    searchInputObject: { searchInput, setSearchInput },
  } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function changeSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchInput(value);
  }

  useEffect(() => {
    if (searchInput.length === 0) {
      inputRef.current?.focus();
    }
  }, [searchInput]);

  return (
    <div className="w-[75%]  ">
      <div
        style={{
          backgroundColor: isDarkMode
            ? darkModeColor.backgroundSlate
            : defaultColor.backgroundSlate,
        }}
        className="  flex gap-3 items-center bg-  p-3   rounded-3xl"
      >
        <FontAwesomeIcon
          height={20}
          width={20}
          icon={faSearch}
          className="text-gray-300"
        />
        <input
          ref={inputRef}
          style={{
            backgroundColor: isDarkMode
              ? darkModeColor.backgroundSlate
              : defaultColor.backgroundSlate,
          }}
          onChange={changeSearchInput}
          value={searchInput}
          className={`outline-none text-[14px] font-light    w-full `}
          placeholder="Search..."
        />

        {searchInput.length > 0 && (
          <FontAwesomeIcon
            height={20}
            width={20}
            icon={faClose}
            className="text-gray-300 cursor-pointer"
            onClick={() => {
              setSearchInput("");
            }}
          />
        )}
      </div>
    </div>
  );
}

export default AllHabitsSearchBar;
