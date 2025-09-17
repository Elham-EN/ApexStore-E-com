import React from "react";
import { useFetchProductsQuery } from "../catalog/catalogApiSlice";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useAppSelector } from "@/app/hooks";

import ProductCard from "../catalog/components/ProductCard";

export default function FeaturedProduct(): React.ReactElement {
  const productParams = useAppSelector((state) => state.catalog);
  const { data: products, isLoading } = useFetchProductsQuery(productParams);

  if (!products || isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          Loading products...
        </Typography>
      </Container>
    );
  }

  return (
    <Box display={"flex"} flexDirection={"column"} marginTop={8} gap={5}>
      <Typography variant="h3" fontWeight={"bold"} align="center">
        Latest Products
      </Typography>
      {/* <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"}>
        {products.productItems.map((item, index) => {
          if (index <= 4) {
            return <ProductCard product={item} />;
          }
        })}
      </Box> */}
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: {
            xs: "center",
            sm: "flex-start",
          },
        }}
      >
        {products.productItems.slice(0, 4).map((item) => (
          <Grid
            key={item.id}
            size={{
              xs: 6, // 2 columns on mobile (6/12 = 50%)
              sm: 4, // 3 columns on small screens (4/12 = 33.33%)
              md: 3, // 4 columns on medium+ screens (3/12 = 25%)
            }}
            sx={{
              minWidth: { xs: "140px", sm: "200px", md: "240px" },
            }}
          >
            <ProductCard product={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
