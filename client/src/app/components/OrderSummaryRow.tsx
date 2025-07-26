import { Box, Typography } from "@mui/material";
import React, { type ReactNode } from "react";

interface OrderSummaryRowProps {
  label: string;
  value: string | ReactNode;
  isTotal?: boolean;
  color?: "success" | "error" | "textSecondary";
}

export default function OrderSummaryRow({
  label,
  value,
  isTotal = false,
  color = "textSecondary",
}: OrderSummaryRowProps): React.ReactElement {
  return (
    <Box display="flex" justifyContent="space-between" mb={1}>
      <Typography
        color={color}
        fontWeight={isTotal ? "bold" : "bold"}
        variant={isTotal ? "subtitle1" : "body2"}
      >
        {label}
      </Typography>
      <Typography
        color={color === "success" ? "success.main" : "text.primary"}
        fontWeight={isTotal ? "bold" : "normal"}
        variant={isTotal ? "subtitle1" : "body2"}
      >
        {value}
      </Typography>
    </Box>
  );
}
