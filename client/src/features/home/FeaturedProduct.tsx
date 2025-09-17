import React from "react";
import { useFetchProductsQuery } from "../catalog/catalogApiSlice";
import { Box, Container, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useAppSelector } from "@/app/hooks";

import ProductCard from "../catalog/components/ProductCard";

export default function FeaturedProduct(): React.ReactElement {
  const productParams = useAppSelector((state) => state.catalog);
  const { data: products, isLoading } = useFetchProductsQuery(productParams);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

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
      {isDesktop ? (
        // Desktop: Flexbox layout
        <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"}>
          {products.productItems.map((item, index) => {
            if (index <= 4) {
              return <ProductCard key={item.id} product={item} />;
            }
          })}
        </Box>
      ) : (
        // Mobile & Tablet: Grid layout
        <Grid container spacing={2}>
          {products.productItems.slice(0, 5).map((item) => (
            <Grid
              key={item.id}
              size={{
                xs: 6,   // 2 columns on mobile
                sm: 4,   // 3 columns on tablet
              }}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%"
              }}
            >
              <ProductCard product={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
