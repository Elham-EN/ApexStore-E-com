import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { type FiltersType } from "../catalogApiSlice";
import FilterAccordion from "./FilterAccordion";
import SortingAccordion from "./SortingAccordion";
import Search from "./Search";
import { useAppSelector } from "@/app/hooks";
import { useDispatch } from "react-redux";
import { resetParams, setBrands, setOrderBy, setTypes } from "../catalogSlice";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High - Low " },
  { value: "price", label: "Price: Low - High" },
];

interface FiltersProps {
  filterData: FiltersType;
}

function Filters({ filterData: data }: FiltersProps): React.ReactElement {
  const product = useAppSelector((state) => state.catalog);
  const dispatch = useDispatch();

  if (!data?.brands || !data.types)
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          Loading...
        </Typography>
      </Container>
    );

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
        <FilterAccordion
          name="Brands"
          items={data.brands}
          checked={product.brands}
          onChange={(items: string[]) => dispatch(setBrands(items))}
        />
      </Paper>
      <Paper>
        <FilterAccordion
          name="Types"
          items={data.types}
          checked={product.types}
          onChange={(items: string[]) => dispatch(setTypes(items))}
        />
      </Paper>
      <Button onClick={() => dispatch(resetParams())}>Reset Filters</Button>
    </Box>
  );
}

export default Filters;
