import { useUserInfoQuery } from "@/features/account/accountApiSlice";
import { Navigate, Outlet } from "react-router";
import React from "react";
import { Container, Typography } from "@mui/material";

export default function RequireGuest(): React.ReactElement {
  const { data: user, isLoading } = useUserInfoQuery();

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  // If user is logged in, redirect to home
  if (user) {
    return <Navigate to={"/"} replace />;
  }

  // If no user, allow access to guest-only routes
  return <Outlet />;
}
