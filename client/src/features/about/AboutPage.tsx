import {
  useLazyGet400ErrorQuery,
  useLazyGet401ErrorQuery,
  useLazyGetValidationErrorQuery,
  useLazyGet404ErrorQuery,
  useLazyGet500ErrorQuery,
} from "@/app/api/errorApi";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";

export default function AboutPage(): React.ReactElement {
  const [trigger400Error] = useLazyGet400ErrorQuery();
  const [trigger401Error] = useLazyGet401ErrorQuery();
  const [trigger404Error] = useLazyGet404ErrorQuery();
  const [trigger500Error] = useLazyGet500ErrorQuery();

  const [
    // Function to manually start the API call
    triggerValidationError,
    {
      // Error object with details if request fails
      // object with details (status, data)
      error,
      // Boolean: true if request failed
      isError,
    },
  ] = useLazyGetValidationErrorQuery();
  const [validationErrors, setValidationErrors] = React.useState<string[]>([]);
  React.useEffect(() => {
    if (isError && error && "data" in error) {
      const errorData = error.data as {
        isValidationError: boolean;
        validationErrors: string[];
      };
      // Check if it's our custom validation error
      if (errorData.isValidationError) {
        setValidationErrors(errorData.validationErrors);
      }
    }
  }, [error, isError]);

  return (
    <div>
      <Typography variant="h2">About Page</Typography>
      <Divider />
      <Typography marginTop={"20px"} variant="h4">
        Testing out the Error API
      </Typography>
      <Box display={"flex"} flexDirection="column" gap={5}>
        <Button onClick={() => trigger400Error()} variant="contained">
          Trigger 400 Bad Request Error
        </Button>
        <Button onClick={() => trigger401Error()} variant="contained">
          Trigger 401 Unauthorized Error
        </Button>
        <Button onClick={() => triggerValidationError()} variant="contained">
          Trigger 400 Validation Error
        </Button>
        <Button onClick={() => trigger404Error()} variant="contained">
          Trigger 404 Not Found Error
        </Button>
        <Button onClick={() => trigger500Error()} variant="contained">
          Trigger 500 Server Error
        </Button>
        {validationErrors.length > 0 && (
          <Alert severity="error">
            <AlertTitle>Validation Errors:</AlertTitle>
            <List>
              {validationErrors.map((err, index) => (
                <ListItem key={index}>
                  <Typography>{err}</Typography>
                </ListItem>
              ))}
            </List>
          </Alert>
        )}
      </Box>
    </div>
  );
}
