import React from "react";
import { useFetchBasketQuery } from "./basketApiSlice";
import { Box, Container, Grid, Typography } from "@mui/material";
import BasketItem from "@/features/basket/components/BasketItem";
import OrderSummary from "@/app/components/OrderSummary";
import CouponCode from "@/app/components/CouponCode";

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

        {/* Order summary and coupon section - sticky on desktop */}
        <Grid
          size={{
            xs: 12, // Full width on mobile (below items)
            md: 4, // 1/3 width on desktop (sidebar)
          }}
        >
          {/* Container for sticky behavior */}
          <Box
            sx={{
              position: { xs: "static", md: "sticky" },
              // ✅ Increased from 20 to 80px to give space from top
              top: { md: 80 },
              zIndex: 100,
              // Add some spacing from viewport edges
              pt: { md: 2 },
            }}
          >
            {/* Order Summary */}
            <OrderSummary items={data.items} />

            {/* Coupon Code - positioned below OrderSummary */}
            <Box sx={{ mt: 2 }}>
              <CouponCode />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
