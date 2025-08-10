import { Box, Paper } from "@mui/material";
import React from "react";
import { useFetchFiltersQuery } from "../catalogApiSlice";
import FilterAccordion from "./FilterAccordion";
import SortingAccordion from "./SortingAccordion";
import Search from "./Search";
import { useAppSelector } from "@/app/hooks";
import { useDispatch } from "react-redux";
import { setOrderBy } from "../catalogSlice";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High - Low " },
  { value: "price", label: "Price: Low - High" },
];

export default function Filters(): React.ReactElement {
  const { data } = useFetchFiltersQuery();
  const product = useAppSelector((state) => state.catalog);
  const dispatch = useDispatch();

  return (
    <Box display={"flex"} flexDirection={"column"} gap={3}>
      <Paper>
        <Search />
      </Paper>
      <Paper>
        <SortingAccordion
          label="Sort"
          options={sortOptions}
          selectedValue={product.orderBy}
          onChange={(event) => dispatch(setOrderBy(event.target.value))}
        />
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
