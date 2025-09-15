import { SearchOff } from "@mui/icons-material";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";
import React from "react";

export default function NotFound(): React.ReactElement {
  const { state } = useLocation();
  return (
    state?.error && (
      <Container
        component={Paper}
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          p: 6,
        }}
      >
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <SearchOff sx={{ fontSize: 100 }} color="error" />
          <Typography variant="h2" color="error">
            {state.error.title} - {state.error.status} Error
          </Typography>
        </Box>
        <Typography gutterBottom variant="h3">
          Oops - we could not find what you were looking for
        </Typography>
        <Button
          fullWidth
          component={Link}
          to="/catalog"
          size="large"
          sx={{ marginTop: "12px" }}
        >
          Go back to the catalog
        </Button>
      </Container>
    )
  );
}
