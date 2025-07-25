import React from "react";
import ProductList from "@/features/catalog/components/ProductList";
import { useFetchProductsQuery } from "../catalogApiSlice";
import { Container, Typography } from "@mui/material";

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

  return <ProductList products={data} />;
}

export default Catalog;
