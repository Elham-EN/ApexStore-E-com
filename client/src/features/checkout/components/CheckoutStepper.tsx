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
  Checkbox,
} from "@mui/material";
import {
  AddressElement,
  PaymentElement,
  useElements,
} from "@stripe/react-stripe-js";
import React from "react";
import Review from "./Review";
import {
  useFetchAddressQuery,
  useUpdateUserAddressMutation,
} from "@/features/account/accountApiSlice";
import type { Address } from "@/app/models/User";
import type {
  StripeAddressElementChangeEvent,
  StripePaymentElementChangeEvent,
} from "@stripe/stripe-js";
import { useBasket } from "@/lib/hooks/useBasket";
import { currencyFormat } from "@/lib/util";

export default function CheckoutStepper(): React.ReactElement {
  // Keep track of which step we're currently on
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [address, setAddress] = React.useState<Partial<Address>>();
  const [fullname, setFullName] = React.useState<string>("");
  const [savedAddressChecked, setSaveAddressChecked] =
    React.useState<boolean>(false);
  const [addressComplete, setAddressComplete] = React.useState<boolean>(false);
  const [paymentComplete, setPaymentComplete] = React.useState<boolean>(false);
  const { data } = useFetchAddressQuery();
  const [updateAddress] = useUpdateUserAddressMutation();
  const elements = useElements();
  const { total } = useBasket();

  React.useEffect(() => {
    if (data) {
      const { name, ...restAddress } = data;
      setFullName(name || "");
      setAddress({
        line1: restAddress.line1 || "",
        line2: restAddress.line2 || "",
        city: restAddress.city || "",
        state: restAddress.state || "",
        postal_code: restAddress.postal_code || "",
        country: restAddress.country || "",
      });
    }
  }, [data]);

  const steps: string[] = ["Address", "Payment", "Review"];

  const handleNext = async (): Promise<void> => {
    if (activeStep === 0 && savedAddressChecked && elements) {
      const address = await getStripeAddress();
      if (address) await updateAddress(address);
    }
    setActiveStep((step) => step + 1);
  };

  const getStripeAddress = async (): Promise<Address | null> => {
    const addressElement = elements?.getElement("address");
    if (!addressElement) return null;
    const {
      value: { name, address },
    } = await addressElement.getValue();
    if (name && address) return { ...address, name };
    return null;
  };

  const handleBack = (): void => {
    setActiveStep((step) => step - 1);
  };

  const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    setAddressComplete(event.complete);
  };

  const handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    setPaymentComplete(event.complete);
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
              onChange={handleAddressChange}
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
            control={
              <Checkbox
                checked={savedAddressChecked}
                onChange={(event) =>
                  setSaveAddressChecked(event.target.checked)
                }
              />
            }
            label={"Save as default address"}
          />
        </Box>
        <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
          <PaymentElement onChange={handlePaymentChange} />
        </Box>
        <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
          <Review />
        </Box>
      </Box>
      <Box display={"flex"} paddingTop={4} justifyContent={"space-between"}>
        <Button onClick={handleBack}>Back</Button>
        <Button
          onClick={handleNext}
          disabled={
            (activeStep === 0 && !addressComplete) ||
            (activeStep === 1 && !paymentComplete)
          }
        >
          {activeStep === steps.length - 1
            ? `Pay ${currencyFormat(total)}`
            : "Next"}
        </Button>
      </Box>
    </Paper>
  );
}
