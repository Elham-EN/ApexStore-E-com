import React from "react";
import { useRegisterMutation } from "./accountApiSlice";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterSchema,
} from "@/lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import PasswordInput from "./components/PasswordInput";
import { Link } from "react-router";

interface ApiValidationError {
  data: {
    isValidationError: boolean;
    validationErrors: string[];
  };
  status: number;
}

export default function RegisterForm(): React.ReactElement {
  const [registerUser] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isLoading },
  } = useForm<RegisterSchema>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await registerUser(data).unwrap();
    } catch (error) {
      const apiError = error as ApiValidationError;
      if (apiError?.data?.validationErrors?.length > 0) {
        const emailErrorMsg = apiError.data.validationErrors[0];
        setError("email", { message: emailErrorMsg });
      } else {
        console.error("Unknown error structure:", error);
      }
    }
  };

  return (
    <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3, py: 3 }}>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <LockOutlined sx={{ color: "secondary.main", fontSize: 40 }} />
        <Typography variant="h5">Register</Typography>
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
            disabled={isLoading || !isValid}
          >
            Sign up
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?
            <Typography
              component={Link}
              to={"/login"}
              color="primary"
              sx={{ ml: 1 }}
            >
              Sign in here
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
