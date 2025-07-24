import React from "react";
import { useFetchBasketQuery } from "./basketApiSlice";
import { Typography } from "@mui/material";

export default function BasketPage(): React.ReactElement {
  const { data, isLoading } = useFetchBasketQuery();
  if (isLoading) {
    return <Typography variant="h5">Loading basket...</Typography>;
  }
  if (!data) {
    return <Typography variant="h3">Your basket is empty</Typography>;
  }
  return <div>{data && <h2>{data.basketId}</h2>}</div>;
}
