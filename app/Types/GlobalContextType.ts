import { DarkModeItem } from "./DarkModeTypes";
import { AreaType, HabitType } from "./GlobalTypes";
import { menuItemType } from "./MenuItemType";
import { Dispatch, SetStateAction } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
export type GlobalContextType = {
  menuItemsObject: {
    menuItems: menuItemType[];
    setMenuItems: Dispatch<SetStateAction<menuItemType[]>>;
  };
  openSideBarObject: {
    openSideBar: boolean;
    setOpenSideBar: Dispatch<SetStateAction<boolean>>;
  };
  darkModeObject: {
    isDarkMode: boolean;
    setDarkMode: Dispatch<SetStateAction<boolean>>;
    darkModeItems: DarkModeItem[];
    setDarkModeItems: Dispatch<SetStateAction<DarkModeItem[]>>;
  };
  habitWindowObject: {
    openHabitWindow: boolean;
    setOpenHabitWindow: Dispatch<SetStateAction<boolean>>;
  };
  openTimePickerObject: {
    openTimePickerWindow: boolean;
    setOpenTimePickerWindow: Dispatch<SetStateAction<boolean>>;
  };
  allAreasObject: {
    allAreas: AreaType[];
    setAllAreas: Dispatch<SetStateAction<AreaType[]>>;
  };
  allHabitsObject: {
    allHabits: HabitType[];
    setAllHabits: Dispatch<SetStateAction<HabitType[]>>;
  };

  selectedCurrentDayObject: {
    selectedCurrentDate: string;
    setSelectedCurrentDate: Dispatch<SetStateAction<string>>;
  };
  offsetDayObject: {
    offsetDay: number;
    setOffsetDay: Dispatch<SetStateAction<number>>;
  };
  selectedAreaStringObject: {
    selectedAreaString: string;
    setSelectedAreaString: Dispatch<SetStateAction<string>>;
  };
  allFilteredHabitsObject: {
    allFilteredHabits: HabitType[];
    setAllFilteredHabits: Dispatch<SetStateAction<HabitType[]>>;
  };
  openDropDownObject: {
    openDropDown: boolean;
    setOpenDropDown: Dispatch<SetStateAction<boolean>>;
  };
  dropDownPositionsObject: {
    dropDownPositions: {
      top: number;
      left: number;
    };
    setDropDownPositions: Dispatch<
      SetStateAction<{ top: number; left: number }>
    >;
  };

  openConfirmationWindowObject: {
    openConfirmationWindow: boolean;
    setOpenConfirmationWindow: Dispatch<SetStateAction<boolean>>;
  };
  selectedItemsObject: {
    selectedItems: HabitType | AreaType | null;
    setSelectedItems: Dispatch<SetStateAction<HabitType | AreaType | null>>;
  };

  openAreaFormObject: {
    openAreaForm: boolean;
    setOpenAreaForm: Dispatch<SetStateAction<boolean>>;
  };

  openIconWindowObject: {
    openIconWindow: boolean;
    setOpenIconWindow: Dispatch<SetStateAction<boolean>>;
    iconSelected: IconProp;
    setIconSelected: Dispatch<SetStateAction<IconProp>>;
  };

  searchInputObject: {
    searchInput: string;
    setSearchInput: Dispatch<SetStateAction<string>>;
  };

  loadingObject: {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
  };
};
