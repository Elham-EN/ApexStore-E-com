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
import React, { type ChangeEvent } from "react";

type SortOption = {
  value: string;
  label: string;
};

interface SortingAccordionProps {
  label: string;
  options: SortOption[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedValue: string;
}

export default function SortingAccordion({
  label,
  options,
  onChange,
  selectedValue,
}: SortingAccordionProps): React.ReactElement {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl>
          <RadioGroup onChange={onChange} value={selectedValue}>
            {options.map(({ value, label }) => (
              <FormControlLabel
                key={label}
                control={<Radio color="secondary" />}
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
