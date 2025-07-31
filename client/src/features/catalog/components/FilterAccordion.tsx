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
import { ArrowDownwardOutlined } from "@mui/icons-material";

interface FilterAccordionProps {
  list: string[] | undefined;
  name: string;
}

export default function FilterAccordion({
  list,
  name,
}: FilterAccordionProps): React.ReactElement {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDownwardOutlined fontSize="small" />}>
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup>
          {list &&
            list.map((item) => (
              <FormControlLabel
                key={item}
                control={<Checkbox />}
                label={item}
              />
            ))}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
}
