import { CheckBox } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { AddressElement, PaymentElement } from "@stripe/react-stripe-js";
import React from "react";
import Review from "./Review";

export default function CheckoutStepper(): React.ReactElement {
  // Keep track of which step we're currently on
  const [activeStep, setActiveStep] = React.useState<number>(0);

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
          <AddressElement
            options={{
              mode: "shipping",
            }}
          />
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
