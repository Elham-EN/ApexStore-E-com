import type { Order } from "@/app/models/Order";
import { currencyFormat } from "@/lib/util";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router";
import { format } from "date-fns";

export default function CheckoutSuccess(): React.ReactElement {
  const { state } = useLocation();
  const order = state.data as Order;

  const addressString = () => {
    const address = order.shippingAddress;
    return `${address?.name} ${address?.line1}, ${address?.city}, ${address?.state}, 
      ${address?.postal_code}, ${address?.country}`;
  };

  const paymentString = () => {
    const card = order.paymentSummary;
    return `${card?.brand?.toUpperCase()}, **** **** **** ${card?.last4},
      Exp: ${card?.exp_month}/${card?.exp_year}`;
  };

  if (!order)
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          Loading products...
        </Typography>
      </Container>
    );
  return (
    <Container maxWidth="md">
      <>
        <Typography variant="h4" gutterBottom fontWeight={"bold"}>
          Thanks for your order {order?.shippingAddress?.name}!
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Your order <strong>#{order.id}</strong> is being processed
        </Typography>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            mb: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="body1" color="textSecondary">
              Order date
            </Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              {format(order.orderDate, "MM/dd/yyyy")}
            </Typography>
          </Box>
          <Divider />
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="body1" color="textSecondary">
              Payment method
            </Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              {paymentString()}
            </Typography>
          </Box>
          <Divider />
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="body1" color="textSecondary">
              Address
            </Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              {addressString()}
            </Typography>
          </Box>
          <Divider />
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="body1" color="textSecondary">
              Amount
            </Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              {currencyFormat(order.total)}
            </Typography>
          </Box>
        </Paper>
        <Box display={"flex"} justifyContent={"flex-start"} gap={2}>
          <Button
            component={Link}
            to={`/orders/${order.id}`}
            variant="contained"
            color="primary"
            sx={{ ":hover": { color: "white" } }}
          >
            View your order
          </Button>
          <Button
            component={Link}
            to={`/catalog`}
            variant="outlined"
            color="primary"
          >
            Continue shopping
          </Button>
        </Box>
      </>
    </Container>
  );
}
