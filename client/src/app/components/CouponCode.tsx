import { Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";

export default function CouponCode(): React.ReactElement {
  return (
    <Paper
      sx={{
        borderRadius: 3,
        p: { xs: 2.5, sm: 3 },
        mb: { xs: 2, md: 0 }, // Margin only on mobile
      }}
    >
      <form>
        <Typography variant="subtitle1" component={"label"}>
          Do you have a voucher code?
        </Typography>
        <TextField
          label="Voucher code"
          variant="outlined"
          fullWidth
          sx={{ my: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth color="primary">
          Apply code
        </Button>
      </form>
    </Paper>
  );
}
