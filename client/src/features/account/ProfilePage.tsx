import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { useUserInfoQuery } from "./accountApiSlice";

export default function ProfilePage(): React.ReactElement {
  const { data: user } = useUserInfoQuery();

  if (!user)
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          No user details found
        </Typography>
      </Container>
    );

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 2, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={"bold"} gutterBottom>
          User Details
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography>Email:</Typography>
          <Typography>{user.email}</Typography>
        </Box>
      </Paper>
      <Box display={"flex"} justifyContent={"flex-end"} gap={4} marginTop={3}>
        <Button variant="contained" sx={{ ":hover": { color: "#ffffff" } }}>
          Reset Password
        </Button>
        <Button variant="outlined" color="error">
          Delete account
        </Button>
      </Box>
    </Container>
  );
}
