import { useUserInfoQuery } from "@/features/account/accountApiSlice";
import { Container, Typography } from "@mui/material";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";

export default function RequireAuth(): React.ReactElement {
  const { data: user, isLoading } = useUserInfoQuery();
  const location = useLocation();

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

  const adminRoutes = ["/inventory", "/admin-dashboard"];

  if (
    adminRoutes.includes(location.pathname) &&
    !user.roles.includes("Admin")
  ) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
}
