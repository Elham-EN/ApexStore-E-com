import { Grid, Typography } from "@mui/material";
import React from "react";
import { useFetchBasketQuery } from "../basket/basketApiSlice";
import CheckoutOrderSummary from "./components/CheckoutOrderSummary";
import CheckoutStepper from "./components/CheckoutStepper";

export default function CheckoutPage(): React.ReactElement {
  const { data } = useFetchBasketQuery();

  if (!data?.items) return <Typography></Typography>;

  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        <CheckoutStepper />
      </Grid>
      <Grid size={4}>
        <CheckoutOrderSummary items={data.items} />
      </Grid>
    </Grid>
  );
}
