import { Container, Grid, Typography } from "@mui/material";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useMemo } from "react";
import { useFetchBasketQuery } from "../basket/basketApiSlice";
import CheckoutOrderSummary from "./components/CheckoutOrderSummary";
import CheckoutStepper from "./components/CheckoutStepper";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK as string);

export default function CheckoutPage(): React.ReactElement {
  const { data: basket } = useFetchBasketQuery();

  const options: StripeElementsOptions | undefined = useMemo(() => {
    if (!basket?.clientSecret) return undefined;
    console.log("====================================");
    console.log(basket.clientSecret);
    console.log("====================================");
    return {
      clientSecret: basket.clientSecret,
    };
  }, [basket?.clientSecret]);

  if (!basket?.items)
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          You have no item in your cart
        </Typography>
      </Container>
    );

  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        {!stripePromise || !options ? (
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h5" align="center">
              Loading...
            </Typography>
          </Container>
        ) : (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutStepper />
          </Elements>
        )}
      </Grid>
      <Grid size={4}>
        <CheckoutOrderSummary items={basket.items} />
      </Grid>
    </Grid>
  );
}
