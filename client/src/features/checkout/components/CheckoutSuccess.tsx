import type { Order } from "@/app/models/Order";
import { Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";

export default function CheckoutSuccess(): React.ReactElement {
  const { state } = useLocation();
  const order = state as Order;
  return <Typography>{JSON.stringify(order, null, 2)}</Typography>;
}
