import React from "react";
import { Box } from "@mui/material";
import type { Product } from "@/app/models/Product";
import ProductCard from "@/features/catalog/components/ProductCard";

interface Props {
  products: Product[];
}

function ProductList({ products }: Props): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
      }}
    >
      {products &&
        products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
    </Box>
  );
}

export default ProductList;
