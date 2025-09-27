import AppTextInput from "@/app/components/AppTextInput";
import {
  createProductSchema,
  type CreateProductSchema,
} from "@/lib/schemas/createProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export default function ProductForm(): React.ReactElement {
  const { control, handleSubmit } = useForm<CreateProductSchema>({
    // mode: "onTouched",
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = (data: CreateProductSchema) => {
    console.log(data);
  };

  return (
    <Box component={Paper} sx={{ p: 4, maxWidth: "lg", mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Product details
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <AppTextInput
              control={control}
              name="name"
              label={"Product name"}
            />
          </Grid>
        </Grid>
        <Box display={"flex"} justifyContent={"space-between"} sx={{ mt: 3 }}>
          <Button variant="contained" color="inherit">
            Cancel
          </Button>
          <Button variant="contained" color="success" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
