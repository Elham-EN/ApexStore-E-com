import { Box, Typography, Container, Grid, Link } from "@mui/material";
import React from "react";

export default function Footer(): React.ReactElement {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#121212",
        color: "white",
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* First Column - Brand */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  mb: 1,
                }}
              >
                ApexStore
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "grey.400",
                  maxWidth: 200,
                }}
              >
                Your ultimate destination for premium anime merchandise and
                collectibles.
              </Typography>
            </Box>
          </Grid>

          {/* Second Column - Shop */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Shop
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/catalog" color="grey.300" underline="hover">
                All Products
              </Link>
              <Link
                href="/catalog?types=Boots"
                color="grey.300"
                underline="hover"
              >
                Boots
              </Link>
              <Link
                href="/catalog?types=Boards"
                color="grey.300"
                underline="hover"
              >
                Boards
              </Link>
              <Link
                href="/catalog?types=Gloves"
                color="grey.300"
                underline="hover"
              >
                Gloves
              </Link>
              <Link
                href="/catalog?types=Hats"
                color="grey.300"
                underline="hover"
              >
                Hats
              </Link>
            </Box>
          </Grid>

          {/* Third Column - Support */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Support
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/contact" color="grey.300" underline="hover">
                Contact Us
              </Link>
              <Link href="/shipping" color="grey.300" underline="hover">
                Shipping Info
              </Link>
              <Link href="/returns" color="grey.300" underline="hover">
                Returns
              </Link>
              <Link href="/faq" color="grey.300" underline="hover">
                FAQ
              </Link>
              <Link href="/size-guide" color="grey.300" underline="hover">
                Size Guide
              </Link>
            </Box>
          </Grid>

          {/* Fourth Column - Account */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Account
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/login" color="grey.300" underline="hover">
                Sign In
              </Link>
              <Link href="/register" color="grey.300" underline="hover">
                Create Account
              </Link>
              <Link href="/orders" color="grey.300" underline="hover">
                Order History
              </Link>
              <Link href="/basket" color="grey.300" underline="hover">
                Shopping Cart
              </Link>
              <Link href="/wishlist" color="grey.300" underline="hover">
                Wishlist
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box
          sx={{
            borderTop: "1px solid #333",
            pt: 3,
            mt: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="grey.400">
            © 2025 AnimeApexStore. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
