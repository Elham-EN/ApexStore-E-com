import React from "react";
import { Grid } from "@mui/material";
import type { Product } from "@/app/models/Product";
import ProductCard from "@/features/catalog/components/ProductCard";

interface Props {
  products: Product[];
}

function ProductList({ products }: Props): React.ReactElement {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {products &&
        products.map((product, index) => (
          <Grid
            size={{ xs: 6, sm: 6, md: 4, lg: 3 }}
            display={"flex"}
            justifyContent="center"
          >
            <ProductCard key={index} product={product} />
          </Grid>
        ))}
    </Grid>
  );
}

export default ProductList;
