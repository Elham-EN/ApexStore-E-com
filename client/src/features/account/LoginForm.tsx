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
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/lib/schemas/loginSchema";
import { useLazyUserInfoQuery, useLoginMutation } from "./accountApiSlice";

export default function LoginForm(): React.ReactElement {
  const [login, { isLoading }] = useLoginMutation();

  const [fetchUserInfo] = useLazyUserInfoQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const location = useLocation();

  const onSubmit = async (data: LoginSchema) => {
    await login(data);
    await fetchUserInfo();

    navigate(location.state?.from?.pathname || "/catalog");
  };

  return (
    <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3, py: 3 }}>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <LockOutlined sx={{ color: "secondary.main", fontSize: 40 }} />
        <Typography variant="h5">Sign in</Typography>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          marginY={3}
        >
          <TextField
            fullWidth
            label="Email"
            autoFocus
            {...register("email")}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <PasswordInput
            register={register}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          <Button
            sx={{ ":hover": { color: "#ffffff" } }}
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
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
