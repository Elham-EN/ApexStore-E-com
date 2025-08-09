import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";

type SortOption = {
  value: string;
  label: string;
};

interface SortingAccordionProps {
  name: string;
  sortOptions: SortOption[];
}

export default function SortingAccordion({
  name,
  sortOptions,
}: SortingAccordionProps): React.ReactElement {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl>
          <RadioGroup>
            {sortOptions.map(({ value, label }) => (
              <FormControlLabel
                key={label}
                control={<Radio />}
                label={label}
                value={value}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
}
