import { Container, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";

export default function ServerError(): React.ReactElement {
  // Gives you access to the current URL location object
  // Read Navigation state data from any route that was sent from
  const { state } = useLocation();
  return (
    <Container component={Paper}>
      {state.error ? (
        <>
          <Typography
            gutterBottom
            variant="h3"
            sx={{ px: 4, pt: 2 }}
            color="secondary"
          >
            {state.error.title}
          </Typography>
          <Divider />
          <Typography
            variant="h5"
            sx={{ p: 4, wordWrap: "break-word", whiteSpace: "normal" }}
            noWrap={false}
          >
            {state.error.detail}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server error
        </Typography>
      )}
    </Container>
  );
}
