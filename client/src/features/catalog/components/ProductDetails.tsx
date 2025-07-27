import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { type ChangeEvent } from "react";
import { useParams } from "react-router";
import { useFetchProductQuery } from "../catalogApiSlice";
import {
  useAddBasketItemMutation,
  useFetchBasketQuery,
  useRemoveBasketItemMutation,
} from "@/features/basket/basketApiSlice";

export default function ProductDetails(): React.ReactElement | undefined {
  const { id } = useParams();

  const { data: product, isLoading } = useFetchProductQuery(
    id ? Number(id) : 0
  );

  const [addBasketItem, { isLoading: addingToBasket }] =
    useAddBasketItemMutation();
  const [removeBasketItem, { isLoading: removingBasketItem }] =
    useRemoveBasketItemMutation();
  const { data: basket } = useFetchBasketQuery();
  // Check if this item in the basket match the product in product details
  const item = basket?.items.find((item) => item.productId === Number(id));

  const [countQty, setCountQty] = React.useState<number>(0);

  // Side effect: When component loads or basket changes,
  // sync input field with current basket quantity
  React.useEffect(() => {
    if (item) setCountQty(item.quantity);
  }, [item]);

  // Show loading screen while fetching product data
  if (isLoading || !product)
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          Loading product details...
        </Typography>
      </Container>
    );

  // Update basket based on what user entered in quantity input
  const handleUpdateBasket = () => {
    // Item not in basket yet
    if (!item) {
      // Add new item with entered quantity
      addBasketItem({ productId: product.id, quantity: countQty });
      // User entered higher quantity than currently in basket
    } else if (countQty > item.quantity) {
      // User wants more items: add the difference
      addBasketItem({
        productId: product.id,
        quantity: Math.abs(countQty - item.quantity),
      });
      // User entered lower quantity than currently in basket
    } else if (countQty < item.quantity) {
      // User wants fewer items: remove the difference
      removeBasketItem({
        productId: product.id,
        quantity: Math.abs(item.quantity - countQty),
      });
    }
  };

  // Handle quantity input changes with validation
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= 0) setCountQty(value); // Only allow positive numbers
  };

  const productDetails = [
    { label: "Description", value: product.description },
    { label: "Type", value: product.type },
    { label: "Brand", value: product.brand },
    { label: "Quantity in stock", value: product.quantityInStock },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      <Grid container spacing={{ xs: 3, md: 6 }}>
        {/* Left Column - Product Image and Description */}
        <Grid size={{ xs: 12, md: 6 }}>
          {/* Product Image */}
          <Box
            sx={{
              width: "100%",
              mb: 4,
              p: { xs: 2, md: 3 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: { xs: 300, md: 400 },
            }}
          >
            <img
              src={product?.pictureUrl}
              alt={product?.name}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "600px",
                objectFit: "contain",
                borderRadius: 4,
              }}
            />
          </Box>

          {/* Product Description Section */}
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "grey.400",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Product Description
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              {product.description}
            </Typography>
          </Box>
        </Grid>
        {/* END OF Left Column - Product Image and Description */}

        {/* Right Column - Product Details and Purchase */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ p: { xs: 1, md: 2 } }}>
            {/* Product Title */}
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: 2,
              }}
            >
              {product.name}
            </Typography>

            {/* Price */}
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontWeight: 600,
                color: "primary.main",
                mb: 1,
              }}
            >
              ${(product.price / 100).toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Free shipping on orders over $100
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* Product Specifications */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Specifications
              </Typography>
              <Grid container spacing={2}>
                {productDetails
                  .filter((detail) => detail.label !== "Description")
                  .map((detail, index) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={index}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: "1px solid",
                          borderColor: "grey.400",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 600,
                            color: "text.secondary",
                            textTransform: "uppercase",
                          }}
                        >
                          {detail.label}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ mt: 0.5, fontWeight: 500 }}
                        >
                          {detail.value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </Box>

            {/* Add to Cart Section */}
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "grey.400",
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Add to Basket
              </Typography>

              <Grid container spacing={2} alignItems="flex-end">
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    variant="outlined"
                    type="number"
                    label="Quantity"
                    fullWidth
                    onChange={handleInputChange}
                    value={countQty}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 8 }}>
                  <Button
                    disabled={
                      countQty === item?.quantity || (!item && countQty === 0)
                    }
                    loading={addingToBasket || removingBasketItem}
                    onClick={() => handleUpdateBasket()}
                    color="primary"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      height: 56,
                      ":hover": {
                        color: "#ffffff",
                      },
                    }}
                  >
                    {item ? "Update quantity" : "Add to basket"}
                  </Button>
                </Grid>
              </Grid>
            </Box>

            {/* Trust Indicators */}
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ textAlign: "center", p: 2 }}>
                    <Typography variant="h6" sx={{ fontSize: "1.5rem", mb: 1 }}>
                      🚚
                    </Typography>
                    <Typography variant="caption">Free Shipping</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ textAlign: "center", p: 2 }}>
                    <Typography variant="h6" sx={{ fontSize: "1.5rem", mb: 1 }}>
                      ↩️
                    </Typography>
                    <Typography variant="caption">Easy Returns</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ textAlign: "center", p: 2 }}>
                    <Typography variant="h6" sx={{ fontSize: "1.5rem", mb: 1 }}>
                      🔒
                    </Typography>
                    <Typography variant="caption">Secure Payment</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {/* END OF Trust Indicators */}
          </Box>
        </Grid>
        {/* END OF Right Column - Product Details and Purchase */}
      </Grid>
    </Container>
  );
}
