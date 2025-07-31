import { Box, Paper, TextField } from "@mui/material";
import React from "react";
import { useFetchFiltersQuery } from "../catalogApiSlice";
import FilterAccordion from "./FilterAccordion";
import SortingAccordion from "./SortingAccordion";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High - Low " },
  { value: "price", label: "Price: Low - High" },
];

export default function Filters(): React.ReactElement {
  const { data } = useFetchFiltersQuery();
  return (
    <Box display={"flex"} flexDirection={"column"} gap={3}>
      <Paper>
        <TextField label="Search product" variant="outlined" fullWidth />
      </Paper>
      <Paper>
        <SortingAccordion name="Sort" sortOptions={sortOptions} />
      </Paper>
      <Paper>
        <FilterAccordion name="Brands" list={data?.brands} />
      </Paper>
      <Paper>
        <FilterAccordion name="Types" list={data?.types} />
      </Paper>
    </Box>
  );
}
