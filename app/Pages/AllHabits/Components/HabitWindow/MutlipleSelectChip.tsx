import * as React from "react";
import { useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAmountDesc, faUsers } from "@fortawesome/free-solid-svg-icons";
import { darkModeColor, defaultColor } from "@/colors";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useGlobalContextProvider } from "@/app/contextApi";
import { AreaType, HabitType } from "@/app/Types/GlobalTypes";
import { iconToText, textToIcon } from "../IconsWindow/IconData";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function getStyles(
  name: string,
  selectedNames: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      selectedNames.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({
  onChange,
}: {
  onChange: (selectedAreasItems: any) => void;
}) {
  const theme = useTheme();

  const {
    allAreasObject,
    darkModeObject,
    habitWindowObject,
    selectedItemsObject,
  } = useGlobalContextProvider();
  const { openHabitWindow } = habitWindowObject;
  const { allAreas } = allAreasObject;
  const { isDarkMode } = darkModeObject;
  const { selectedItems } = selectedItemsObject;

  const [selectedAreas, setSelectedAreas] = React.useState<string[]>([]);

  const [selectedAreasItems, setSelectedAreasItems] = useState<any>([]);
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      },
    },
  };

  const handleChange = (event: SelectChangeEvent<typeof selectedAreas>) => {
    const {
      target: { value },
    } = event;
    setSelectedAreas(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // Filter out the "All" element
  const filteredAreas = allAreas.filter((area) => area.name !== "All");

  // This use effect enable us to save the whole object matches the name is the selectedAreas array
  React.useEffect(() => {
    const selectedAreaObjects = selectedAreas.map((selectedArea) => {
      // Find the corresponding area object in the areas array
      return allAreas.find((area) => area.name === selectedArea); // Non-null assertion operator
    });

    setSelectedAreasItems(selectedAreaObjects);
  }, [selectedAreas]);

  // Use the callback function onChange to pass up the the selectedAreasItems to the parent
  // everytime the selectedAreasItems updates

  React.useEffect(() => {
    onChange(selectedAreasItems);
  }, [selectedAreasItems]);

  React.useEffect(() => {
    //If we want to edit a habit
    if (selectedItems) {
      const habitSelected = selectedItems as HabitType;
      const { areas } = habitSelected;

      const selectedArea = areas.map((area) => {
        return area.name;
      });

      setSelectedAreas(selectedArea);
    } else {
      //when we open the habit window, empty the selectedAreas
      setSelectedAreas([]);
    }
  }, [openHabitWindow]);

  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          width: "100%",
          "& .Mui-focused .MuiInputLabel-root": {
            color: defaultColor.default,
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: defaultColor.default,
          },
        }}
      >
        <InputLabel
          sx={{
            "&.Mui-focused": {
              color: defaultColor.default,
            },
            ...(isDarkMode && { color: "white" }),
          }}
          id="demo-multiple-chip-label"
        >
          Choose Your Area...
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedAreas}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Choose your area..."
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: defaultColor.default,
                },
                ...(isDarkMode && {
                  borderColor: "white",
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }),
              }}
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{
                    backgroundColor: isDarkMode
                      ? darkModeColor.textColor
                      : defaultColor[100],
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {filteredAreas.map((area) => (
            <MenuItem
              key={area._id}
              value={area.name}
              style={getStyles(area.name, selectedAreas, theme)}
              sx={{
                color: isDarkMode
                  ? darkModeColor.textColor
                  : defaultColor.textColor,
              }}
            >
              <FontAwesomeIcon
                className="text-red-500"
                icon={area.icon}
                style={{ marginRight: 8 }}
              />
              {area.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
