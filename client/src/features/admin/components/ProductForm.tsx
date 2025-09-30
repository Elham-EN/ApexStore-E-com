import AppDropzone from "@/app/components/AppDropzone";
import AppSelectInput from "@/app/components/AppSelectInput";
import AppTextInput from "@/app/components/AppTextInput";
import type { Product } from "@/app/models/Product";
import { useFetchFiltersQuery } from "@/features/catalog/catalogApiSlice";
import {
  createProductSchema,
  type CreateProductSchema,
} from "@/lib/schemas/createProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../adminApiSlice";

type Props = {
  setEditMode: (value: boolean) => void;
  product: Product | null;
  refetch: () => void;
};

export default function ProductForm({
  setEditMode,
  product,
  refetch,
}: Props): React.ReactElement {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateProductSchema>({
    mode: "onTouched",
    resolver: zodResolver(createProductSchema),
  });

  const watchFile = watch("file");
  const filePreview = watchFile ? URL.createObjectURL(watchFile) : null;

  const { data } = useFetchFiltersQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  React.useEffect(() => {
    if (product) reset(product);
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [product, reset, filePreview]);

  const onSubmit = async (data: CreateProductSchema): Promise<void> => {
    try {
      if (product) await updateProduct({ id: product.id, data });
      else await createProduct(data);
      setEditMode(false);
      refetch(); // Get latest list of product
    } catch (error) {
      console.log("====================================");
      console.error(error);
      console.log("====================================");
    }
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
          <Grid size={6}>
            {data?.brands && (
              <AppSelectInput
                control={control}
                name="brand"
                label="Brand"
                items={data.brands}
              />
            )}
          </Grid>
          <Grid size={6}>
            {data?.types && (
              <AppSelectInput
                control={control}
                name="type"
                label="Type"
                items={data.types}
              />
            )}
          </Grid>
          <Grid size={6}>
            <AppTextInput
              type="number"
              control={control}
              name="price"
              label={"Price"}
            />
          </Grid>
          <Grid size={6}>
            <AppTextInput
              type="number"
              control={control}
              name="quantityInStock"
              label={"Quantity in stock"}
            />
          </Grid>
          <Grid size={12}>
            <AppTextInput
              control={control}
              name="description"
              label={"Description"}
              multiline
              rows={4}
            />
          </Grid>
          <Grid
            size={12}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <AppDropzone control={control} name="file" />
            {watchFile ? (
              <img
                src={filePreview || undefined}
                alt="preview of image"
                style={{ maxHeight: 200 }}
              />
            ) : (
              <img
                src={product?.pictureUrl || undefined}
                alt="preview of image"
                style={{ maxHeight: 200 }}
              />
            )}
          </Grid>
        </Grid>
        <Box display={"flex"} justifyContent={"space-between"} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </Button>
          <Button
            loading={isSubmitting}
            variant="contained"
            color="success"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
