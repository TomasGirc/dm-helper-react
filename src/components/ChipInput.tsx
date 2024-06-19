import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

function getStyles(name: string, chipData: readonly string[], theme: Theme) {
  return {
    fontWeight:
      chipData.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ChipInput({
  options,
  name,
  changeData,
}: {
  options: string[];
  name: string;
  changeData: (data: string) => void;
}) {
  const theme = useTheme();
  const [chipData, setChipData] = React.useState<string[]>([]);

  const handleChange = async (event: SelectChangeEvent<typeof chipData>) => {
    const {
      target: { value },
    } = event;
    await setChipData(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    await changeData(value.toString());
  };

  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label">{name}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={chipData}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, chipData, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
