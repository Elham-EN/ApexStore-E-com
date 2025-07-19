import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { useFetchProductQuery } from "../catalogApiSlice";

export default function ProductDetails(): React.ReactElement | undefined {
  const { id } = useParams();

  const { data: product, isLoading } = useFetchProductQuery(
    id ? Number(id) : 0
  );

  if (isLoading || !product) return <div>Loading...</div>;

  const productDetails = [
    { label: "Description", value: product.description },
    { label: "Type", value: product.type },
    { label: "Brand", value: product.brand },
    { label: "Quantity in stock", value: product.quantityInStock },
  ];

  return (
    <Grid container spacing={6} maxWidth={"lg"} sx={{ mx: "auto" }}>
      <Grid size={6}>
        <img
          src={product?.pictureUrl}
          alt={product?.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid size={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table sx={{ "& td": { fontSize: "1rem" } }}>
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {detail.label}
                  </TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} marginTop={5} alignItems={"center"}>
          <Grid size={6}>
            <TextField
              variant="outlined"
              type="number"
              label={"Quantity in cart"}
              fullWidth
              defaultValue={1}
            />
          </Grid>
          <Grid size={6}>
            <Button
              color="inherit"
              variant="contained"
              fullWidth
              sx={{ height: "54px" }}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
