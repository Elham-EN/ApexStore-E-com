import { Container, Grid, Typography } from "@mui/material";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useMemo, useRef } from "react";
import { useFetchBasketQuery } from "../basket/basketApiSlice";
import CheckoutOrderSummary from "./components/CheckoutOrderSummary";
import CheckoutStepper from "./components/CheckoutStepper";
import { useCreatePaymentIntentMutation } from "./checkoutApiSlice";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK as string);

export default function CheckoutPage(): React.ReactElement {
  const { data: basket } = useFetchBasketQuery();
  const [createPaymentIntent, { isLoading }] = useCreatePaymentIntentMutation();
  // Problem: In React development mode it will call effect twice but we don't
  // want paymentIntent mutatation function to be call twice. To prevent this
  // useRef value is unaffected by checkout component re-rendering, the value
  // persist
  const created = useRef(false);

  // So next time when effect is called, created will be set to true, means
  // createPaymentIntent will not be called to avoid creating additional
  // payment intent
  React.useEffect(() => {
    // First time it will create payment intent
    if (!created.current) createPaymentIntent();
    created.current = true;
  }, [createPaymentIntent]);

  const options: StripeElementsOptions | undefined = useMemo(() => {
    if (!basket?.clientSecret) return undefined;
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
        {!stripePromise || !options || isLoading ? (
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
