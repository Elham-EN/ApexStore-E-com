import React from "react";
import { useParams } from "react-router";
import { useFetchOrderDetailedQuery } from "./orderApiSlice";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { format } from "date-fns";
import { currencyFormat } from "@/lib/util";

export default function OrderDetailsPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const {
    data: order,
    isLoading,
    error,
  } = useFetchOrderDetailedQuery(Number(id));

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          Loading order details...
        </Typography>
      </Container>
    );
  }

  if (error || !order) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          Order not found
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button component={Link} to="/orders" variant="contained">
            Back to Orders
          </Button>
        </Box>
      </Container>
    );
  }

  const addressString = () => {
    const address = order.shippingAddress;
    return `${address?.name} ${address?.line1}, ${address?.city}, ${address?.state}, ${address?.postal_code}, ${address?.country}`;
  };

  const paymentString = () => {
    const card = order.paymentSummary;
    return `${card?.brand?.toUpperCase()}, **** **** **** ${
      card?.last4
    }, Exp: ${card?.exp_month}/${card?.exp_year}`;
  };

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Order #{order.id}
        </Typography>
        <Button component={Link} to="/orders" variant="outlined">
          Back to Orders
        </Button>
      </Box>

      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Order Information
        </Typography>

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body1" color="textSecondary">
            Email Address
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {order.buyerEmail}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body1" color="textSecondary">
            Order Date:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {format(order.orderDate, "MM/dd/yyyy")}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body1" color="textSecondary">
            Status:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {order.orderStatus}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body1" color="textSecondary">
            Payment Method:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {paymentString()}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body1" color="textSecondary">
            Shipping Address:
          </Typography>
          <Typography variant="body1" fontWeight="bold" textAlign="right">
            {addressString()}
          </Typography>
        </Box>
      </Paper>

      <Paper elevation={1} sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Order Items
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.orderItems.map((item) => (
              <TableRow key={item.productId}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                    <Typography variant="body1">{item.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {currencyFormat(item.price)}
                </TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="right">
                  {currencyFormat(item.price * item.quantity)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body1">Subtotal:</Typography>
          <Typography variant="body1">
            {currencyFormat(order.subtotal)}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body1">Delivery Fee:</Typography>
          <Typography variant="body1">
            {currencyFormat(order.deliveryFee)}
          </Typography>
        </Box>

        {order.discount > 0 && (
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body1">Discount:</Typography>
            <Typography variant="body1" color="success.main">
              -{currencyFormat(order.discount)}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 1 }} />

        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" fontWeight="bold">
            Total:
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {currencyFormat(order.total)}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
