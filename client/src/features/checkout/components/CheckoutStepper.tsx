import { CheckBox } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { AddressElement, PaymentElement } from "@stripe/react-stripe-js";
import React from "react";
import Review from "./Review";
import { useFetchAddressQuery } from "@/features/account/accountApiSlice";
import type { Address } from "@/app/models/User";

export default function CheckoutStepper(): React.ReactElement {
  // Keep track of which step we're currently on
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [address, setAddress] = React.useState<Partial<Address>>();
  const [fullname, setFullName] = React.useState<string>("");
  const { data } = useFetchAddressQuery();

  React.useEffect(() => {
    if (data) {
      const { name, ...restAddress } = data;
      // Stripe expects country codes like "AU" but API returns "Australia"
      const countryCode =
        restAddress.country === "Australia" ? "AU" : restAddress.country;
      // Stripe expects state codes like "VIC" but API returns "Victoria"
      const stateCode =
        restAddress.state === "Victoria" ? "VIC" : restAddress.state;

      setFullName(name || "");

      setAddress({
        line1: restAddress.line1 || "",
        line2: restAddress.line2 || "",
        city: restAddress.city || "",
        state: stateCode || "",
        postal_code: restAddress.postal_code || "",
        country: countryCode || "",
      });
    }
  }, [data]);

  const steps: string[] = ["Address", "Payment", "Review"];

  const handleNext = (): void => {
    setActiveStep((step) => step + 1);
  };

  const handleBack = (): void => {
    setActiveStep((step) => step - 1);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: activeStep === 0 ? "block" : "none" }}>
          {data && address ? (
            <AddressElement
              options={{
                mode: "shipping",
                defaultValues: {
                  name: fullname,
                  address: address as Address,
                },
              }}
            />
          ) : (
            <Container maxWidth="lg" sx={{ py: 4 }}>
              <Typography variant="h5" align="center">
                Loading address...
              </Typography>
            </Container>
          )}
          <FormControlLabel
            sx={{
              display: "flex",
              justifyContent: "end",
              mt: 4,
            }}
            control={<CheckBox />}
            label={"Save as default address"}
          />
        </Box>
        <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
          <PaymentElement />
        </Box>
        <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
          <Review />
        </Box>
      </Box>
      <Box display={"flex"} paddingTop={4} justifyContent={"space-between"}>
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handleNext}>Next</Button>
      </Box>
    </Paper>
  );
}
