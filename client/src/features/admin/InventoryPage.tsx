import { useAppDispatch, useAppSelector } from "@/app/hooks";
import React from "react";
import { useFetchProductsQuery } from "../catalog/catalogApiSlice";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { currencyFormat } from "@/lib/util";
import { Delete, Edit } from "@mui/icons-material";
import AppPagination from "@/app/components/AppPagination";
import { setPageNumber } from "../catalog/catalogSlice";
import ProductForm from "./components/ProductForm";
import { type Product } from "@/app/models/Product";

export default function InventoryPage(): React.ReactElement {
  const productParams = useAppSelector((state) => state.catalog);
  const { data: products } = useFetchProductsQuery(productParams);
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditMode(true);
  };

  if (editMode)
    return <ProductForm setEditMode={setEditMode} product={selectedProduct} />;

  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography sx={{ p: 2 }} variant="h4">
          Inventory
        </Typography>
        <Button
          onClick={() => setEditMode(true)}
          sx={{
            m: 2,
            ":hover": {
              color: "#ffffff",
            },
          }}
          size="large"
          variant="contained"
        >
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.productItems.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component={"th"} scope="row">
                    {product.id}
                  </TableCell>
                  <TableCell align="left">
                    <Box display={"flex"} alignItems={"center"}>
                      <img
                        src={product.pictureUrl}
                        alt={product.name}
                        style={{ height: 50, marginRight: 20 }}
                      />
                      <span>{product.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {currencyFormat(product.price)}
                  </TableCell>
                  <TableCell align="center">{product.type}</TableCell>
                  <TableCell align="center">{product.brand}</TableCell>
                  <TableCell align="center">
                    {product.quantityInStock}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      startIcon={<Edit />}
                      onClick={() => handleSelectProduct(product)}
                    />
                    <Button startIcon={<Delete />} color="error" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Box sx={{ p: 2 }}>
          {products?.pagination && products.productItems.length > 0 && (
            <AppPagination
              metadata={products.pagination}
              onPageChange={(page: number) => dispatch(setPageNumber(page))}
            />
          )}
        </Box>
      </TableContainer>
    </>
  );
}
