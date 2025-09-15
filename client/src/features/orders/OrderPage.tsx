import React from "react";
import { useFetchOrdersQuery } from "./orderApiSlice";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { currencyFormat } from "@/lib/util";

export default function OrderPage(): React.ReactElement {
  const { data: orders, isLoading } = useFetchOrdersQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          Order is loading...
        </Typography>
      </Container>
    );
  }
  if (!orders)
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          No order found
        </Typography>
      </Container>
    );
  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        My orders
      </Typography>
      <Paper sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Order</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                hover
                onClick={() => navigate(`/orders/${order.id}`)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell align="center">#{order.id}</TableCell>
                <TableCell>{format(order.orderDate, "MM/dd/yyyy")}</TableCell>
                <TableCell>{currencyFormat(order.total)}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
