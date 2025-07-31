import React from "react";
import ProductList from "@/features/catalog/components/ProductList";
import { useFetchProductsQuery } from "../catalogApiSlice";
import { Container, Grid, Typography } from "@mui/material";
import Filters from "./Filters";

function Catalog(): React.ReactElement {
  const { data, isLoading } = useFetchProductsQuery();

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
      <Grid size={{ xs: 12, md: 3 }}>
        <Filters />
      </Grid>
      <Grid size={{ xs: 12, md: 9 }}>
        <ProductList products={data} />
      </Grid>
    </Grid>
  );
}

export default Catalog;
