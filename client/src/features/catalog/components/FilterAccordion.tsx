import React from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

interface FilterAccordionProps {
  // List of filter options (e.g., ["Nike", "Adidas"])
  items: string[] | undefined;
  // Filter title (e.g., "Brands")
  name: string;
  // Currently selected items from Redux
  checked: string[];
  // Function to update Redux when selection changes
  onChange: (items: string[]) => void;
}

export default function FilterAccordion({
  items,
  checked,
  onChange,
  name,
}: FilterAccordionProps): React.ReactElement {
  // Local state for checked items (immediate UI updates)
  const [checkedItems, setCheckedItem] = React.useState(checked);

  // Sync local state with Redux when checked items change externally
  React.useEffect(() => {
    setCheckedItem(checked);
  }, [checked]);

  // Handle checkbox clicks - add/remove items from selection
  const handleToggle = (value: string) => {
    // If item is checked, remove it; if unchecked, add it
    const updatedChecked = checkedItems.includes(value)
      ? // Remove
        checkedItems.filter((item) => item !== value)
      : // Add
        [...checkedItems, value];
    // Update local state (immediate UI)
    setCheckedItem(updatedChecked);
    // Update Redux store
    onChange(updatedChecked);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup>
          {items &&
            items.map((item) => (
              <FormControlLabel
                key={item}
                control={<Checkbox />}
                label={item}
                checked={checkedItems.includes(item)}
                onClick={() => handleToggle(item)}
              />
            ))}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
}
