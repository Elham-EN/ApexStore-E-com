import OrderSummaryRow from "@/app/components/OrderSummaryRow";

import { useBasket } from "@/lib/hooks/useBasket";
import { currencyFormat } from "@/lib/util";
import { Paper, Box, Typography, Divider, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router";

export default function CheckoutOrderSummary(): React.ReactElement {
  const { discountAmount, subtotal, deliveryFee, total } = useBasket();
  return (
    <Paper
      sx={{
        borderRadius: 3,
        p: { xs: 2.5, sm: 3 },
        mb: { xs: 2, md: 0 }, // Margin only on mobile
      }}
    >
      <Box>
        <Typography variant="h6" component={"p"} fontWeight={"bold"}>
          Order Summary
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          Orders over $100 qualify for free delivery
        </Typography>
        <Box mt={2}>
          <OrderSummaryRow label="Subtotal" value={currencyFormat(subtotal)} />
          <OrderSummaryRow
            label="Discount"
            value={
              discountAmount > 0
                ? `-${currencyFormat(discountAmount)}`
                : "-$0.00"
            }
            color="success"
          />
          <OrderSummaryRow
            label="Delivery fee"
            value={currencyFormat(deliveryFee)}
          />
          <Divider sx={{ my: 2 }} />
          <OrderSummaryRow
            label="Total"
            value={currencyFormat(total)}
            isTotal
          />
        </Box>
        <Box mt={2}>
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mb: 1,
              ":hover": {
                color: "#ffffff",
              },
            }}
          >
            Pay now
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
