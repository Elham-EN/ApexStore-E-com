import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import {
  Security,
  LocalShipping,
  Replay,
  CreditCard,
  Chat,
  People,
} from "@mui/icons-material";

export default function StorePolicyPage(): React.ReactElement {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          fontWeight="bold"
          sx={{ mb: 3, color: "primary.main" }}
        >
          Store Policies
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ maxWidth: 800, mx: "auto", mb: 4 }}
        >
          Clear guidelines to ensure a smooth and secure shopping experience
        </Typography>
      </Box>

      {/* Quick Policy Overview */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: "100%", textAlign: "center", p: 3 }}>
            <CardContent>
              <Security sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Secure Shopping
              </Typography>
              <Typography variant="body2">
                SSL encryption and secure payment processing for all
                transactions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: "100%", textAlign: "center", p: 3 }}>
            <CardContent>
              <LocalShipping
                sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
              />
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Fast Shipping
              </Typography>
              <Typography variant="body2">
                Free shipping on orders over $50, worldwide delivery available
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: "100%", textAlign: "center", p: 3 }}>
            <CardContent>
              <Replay sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Easy Returns
              </Typography>
              <Typography variant="body2">
                30-day return policy for most items with hassle-free process
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Detailed Policies */}
      <Grid container spacing={6}>
        {/* Shipping Policy */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: "100%", p: 4 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              📦 Shipping Policy
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <LocalShipping />
                </ListItemIcon>
                <ListItemText
                  primary="Free standard shipping on orders over $50"
                  secondary="Typically 5-7 business days"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocalShipping />
                </ListItemIcon>
                <ListItemText
                  primary="Express shipping available"
                  secondary="1-3 business days for $9.99"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocalShipping />
                </ListItemIcon>
                <ListItemText
                  primary="International shipping to 50+ countries"
                  secondary="Delivery times vary by location"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocalShipping />
                </ListItemIcon>
                <ListItemText
                  primary="Order tracking provided"
                  secondary="Receive updates via email and SMS"
                />
              </ListItem>
            </List>
          </Card>
        </Grid>

        {/* Return Policy */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: "100%", p: 4 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              🔄 Return Policy
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Replay />
                </ListItemIcon>
                <ListItemText
                  primary="30-day return window"
                  secondary="From the date of delivery"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Replay />
                </ListItemIcon>
                <ListItemText
                  primary="Items must be in original condition"
                  secondary="Unopened packages and undamaged items"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Replay />
                </ListItemIcon>
                <ListItemText
                  primary="Free return shipping"
                  secondary="We provide prepaid return labels"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Replay />
                </ListItemIcon>
                <ListItemText
                  primary="Full refund or exchange"
                  secondary="Processed within 5-7 business days"
                />
              </ListItem>
            </List>
          </Card>
        </Grid>

        {/* Payment Policy */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: "100%", p: 4 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              💳 Payment Policy
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CreditCard />
                </ListItemIcon>
                <ListItemText
                  primary="Secure payment processing"
                  secondary="SSL encryption for all transactions"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CreditCard />
                </ListItemIcon>
                <ListItemText
                  primary="Multiple payment methods"
                  secondary="Credit cards, PayPal, Apple Pay, Google Pay"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CreditCard />
                </ListItemIcon>
                <ListItemText
                  primary="No hidden fees"
                  secondary="All costs displayed at checkout"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CreditCard />
                </ListItemIcon>
                <ListItemText
                  primary="Instant payment confirmation"
                  secondary="Order processed immediately"
                />
              </ListItem>
            </List>
          </Card>
        </Grid>

        {/* Customer Service Policy */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: "100%", p: 4 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              🎧 Customer Service
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Chat />
                </ListItemIcon>
                <ListItemText
                  primary="24/7 customer support"
                  secondary="Live chat, email, and phone support"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Chat />
                </ListItemIcon>
                <ListItemText
                  primary="Expert product knowledge"
                  secondary="Our team are anime enthusiasts too"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Chat />
                </ListItemIcon>
                <ListItemText
                  primary="Quick response times"
                  secondary="Usually within 2 hours during business hours"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Chat />
                </ListItemIcon>
                <ListItemText
                  primary="Multilingual support"
                  secondary="English, Japanese, and Spanish available"
                />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>

      {/* Privacy & Security Section */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.mode === "dark" ? "black" : "white",
          p: 6,
          borderRadius: 3,
          mt: 8,
          mb: 8,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 4 }}
        >
          Privacy & Security
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Security sx={{ mr: 1.5 }} />
              <Typography variant="h6" fontWeight="bold">
                Data Protection
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 3 }}>
              We never share your personal information with third parties. All
              data is encrypted and stored securely according to industry
              standards.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <People sx={{ mr: 1.5 }} />
              <Typography variant="h6" fontWeight="bold">
                Account Security
              </Typography>
            </Box>
            <Typography variant="body1">
              Two-factor authentication available for enhanced account security.
              We recommend using strong, unique passwords for your account.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Contact Information */}
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Questions About Our Policies?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: "auto" }}>
          Our customer service team is here to help. Contact us anytime with
          questions about shipping, returns, or any other policy concerns.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" fontWeight="bold">
              📧 Email
            </Typography>
            <Typography variant="body2">support@apexstore.com</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" fontWeight="bold">
              📞 Phone
            </Typography>
            <Typography variant="body2">1-800-APEX-SHOP</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" fontWeight="bold">
              💬 Live Chat
            </Typography>
            <Typography variant="body2">
              Available 24/7 on our website
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
