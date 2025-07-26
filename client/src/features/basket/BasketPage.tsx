import React from "react";
import { useFetchBasketQuery } from "./basketApiSlice";
import { Container, Grid, Typography } from "@mui/material";
import BasketItem from "@/features/basket/components/BasketItem";
import OrderSummary from "@/app/components/OrderSummary";

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
  if (!data?.items.length) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" align="center">
          Your basket is empty
        </Typography>
      </Container>
    );
  }
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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

        {/* Order summary section - fixed on desktop, normal on mobile */}
        <Grid
          size={{
            xs: 12, // Full width on mobile (below items)
            md: 4, // 1/3 width on desktop (sidebar)
          }}
          sx={{
            // Create space for fixed positioning on desktop
            position: { xs: "static", md: "relative" },
            height: { xs: "auto", md: "fit-content" },
          }}
        >
          {/* Future: Order summary, checkout button, etc. */}
          <OrderSummary items={data.items} />
        </Grid>
      </Grid>
    </Container>
  );
}
