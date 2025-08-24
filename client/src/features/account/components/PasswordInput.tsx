import type { LoginSchema } from "@/lib/schemas/loginSchema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import type { UseFormRegister } from "react-hook-form";

interface PasswordInputProps {
  register: UseFormRegister<LoginSchema>;
  error?: boolean;
  helperText?: string;
}

export default function PasswordInput({
  register,
  error,
  helperText,
}: PasswordInputProps): React.ReactElement {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <TextField
      fullWidth
      label="Password"
      type={showPassword ? "text" : "password"}
      {...register("password")}
      error={error}
      helperText={helperText}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
