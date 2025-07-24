import React from "react";
import { useFetchBasketQuery } from "./basketApiSlice";
import { Container, Grid, Typography } from "@mui/material";
import BasketItem from "./components/BasketItem";

export default function BasketPage(): React.ReactElement {
  const { data, isLoading } = useFetchBasketQuery();
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          Loading basket...
        </Typography>
      </Container>
    );
  }
  if (!data) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" align="center">
          Your basket is empty
        </Typography>
      </Container>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {/* Main basket items - responsive grid */}
        <Grid
          size={{
            xs: 12, // Full width on mobile
            md: 8, // 2/3 width on desktop
          }}
        >
          {data.items.map((item) => (
            <BasketItem item={item} key={item.productId} />
          ))}
        </Grid>

        {/* Order summary section - you can add this later */}
        <Grid
          size={{
            xs: 12, // Full width on mobile (below items)
            md: 4, // 1/3 width on desktop (sidebar)
          }}
        >
          {/* Future: Order summary, checkout button, etc. */}
        </Grid>
      </Grid>
    </Container>
  );
}
