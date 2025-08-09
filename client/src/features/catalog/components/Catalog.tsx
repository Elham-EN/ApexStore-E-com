import React from "react";
import ProductList from "@/features/catalog/components/ProductList";
import { useFetchProductsQuery } from "../catalogApiSlice";
import { Container, Grid, Typography } from "@mui/material";
import Filters from "./Filters";
import { useAppSelector } from "@/app/hooks";

function Catalog(): React.ReactElement {
  const productParams = useAppSelector((state) => state.catalog);
  const { data, isLoading } = useFetchProductsQuery(productParams);

  if (isLoading || !data)
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
        <Filters />
      </Grid>
      <Grid size={{ sm: 12, lg: 9 }}>
        <ProductList products={data} />
      </Grid>
    </Grid>
  );
}

export default Catalog;
