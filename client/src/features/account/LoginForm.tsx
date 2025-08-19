import { LockOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import PasswordInput from "./components/PasswordInput";
import { Link } from "react-router";

export default function LoginForm(): React.ReactElement {
  return (
    <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3, py: 3 }}>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <LockOutlined sx={{ color: "secondary.main", fontSize: 40 }} />
        <Typography variant="h5">Sign in</Typography>
        <Box
          component={"form"}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          marginY={3}
        >
          <TextField fullWidth label="Email" autoFocus />
          <PasswordInput />
          <Button sx={{ ":hover": { color: "#ffffff" } }} variant="contained">
            Sign in
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don't have an account?
            <Typography
              component={Link}
              to={"/register"}
              color="primary"
              sx={{ ml: 1 }}
            >
              Sign up
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
