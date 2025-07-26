import { currencyFormat } from "@/lib/util";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import OrderSummaryRow from "./OrderSummaryRow";
import type { BasketItem } from "../models/Basket";

interface OrderSummaryProps {
  items: BasketItem[];
}

function OrderSummary({ items }: OrderSummaryProps): React.ReactElement {
  const subtotal = items.reduce(
    (accItem, currItem) => accItem + currItem.price * currItem.quantity,
    0
  );
  // Delivery fee in cents ($10.00 = 1000 cents)
  const deliveryFee: number = 1000;
  // Discount as percentage (10% = 0.10)
  const discountPercentage: number = 0.1;
  const discountAmount = Math.round(subtotal * discountPercentage);
  const total = subtotal + deliveryFee - discountAmount;
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
          <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }}>
            Checkout
          </Button>
          <Button fullWidth>Continue Shopping</Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default OrderSummary;
