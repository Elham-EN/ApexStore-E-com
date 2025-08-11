import React from "react";
import ProductList from "@/features/catalog/components/ProductList";
import {
  useFetchFiltersQuery,
  useFetchProductsQuery,
} from "../catalogApiSlice";
import { Container, Grid, Typography } from "@mui/material";
import Filters from "./Filters";
import { useAppSelector } from "@/app/hooks";
import AppPagination from "@/app/components/AppPagination";
import { useDispatch } from "react-redux";
import { setPageNumber } from "../catalogSlice";

function Catalog(): React.ReactElement {
  const productParams = useAppSelector((state) => state.catalog);
  const { data, isLoading } = useFetchProductsQuery(productParams);
  const { data: filterData, isLoading: filtersLoading } =
    useFetchFiltersQuery();
  const dispatch = useDispatch();

  if (isLoading || !data || filtersLoading || !filterData)
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          Loading products...
        </Typography>
      </Container>
    );

  return (
    <Grid container spacing={4}>
      <Grid size={{ sm: 12, lg: 3 }} width={"100%"}>
        <Filters filterData={filterData} />
      </Grid>
      <Grid size={{ sm: 12, lg: 9 }}>
        {data.productItems && data.productItems.length > 0 ? (
          <>
            <ProductList products={data.productItems} />
            <AppPagination
              metadata={data.pagination}
              onPageChange={(page: number) => {
                dispatch(setPageNumber(page));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </>
        ) : (
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h5" align="center">
              There are not products for this filter
            </Typography>
          </Container>
        )}
      </Grid>
    </Grid>
  );
}

export default Catalog;
