import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  useTheme,
} from "@mui/material";

export default function AboutPage(): React.ReactElement {
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
          About ApexStore
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ maxWidth: 800, mx: "auto", mb: 4 }}
        >
          Your premier destination for authentic anime merchandise and
          collectibles
        </Typography>
      </Box>

      {/* Story Section */}
      <Grid container spacing={6} sx={{ mb: 8 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
            Our Story
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            Founded in 2020 by passionate anime enthusiasts, ApexStore began as
            a small dream to bring authentic Japanese anime merchandise to fans
            worldwide. What started in a small apartment has grown into one of
            the most trusted online destinations for anime collectibles.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            We understand the passion that drives anime culture because we're
            fans too. Every product we curate is selected with the same care and
            attention we'd want for our own collections.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              bgcolor: "grey.100",
              borderRadius: 2,
              p: 4,
              textAlign: "center",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              [Anime Store Image Placeholder]
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Mission Section */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.mode === "dark" ? "black" : "white",
          p: 6,
          borderRadius: 3,
          mb: 8,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 4 }}
        >
          Our Mission
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          To connect anime fans with authentic, high-quality merchandise while
          building a community that celebrates Japanese pop culture and
          storytelling.
        </Typography>
      </Box>

      {/* Values Section */}
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        sx={{ mb: 6 }}
      >
        What We Stand For
      </Typography>
      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: "100%", textAlign: "center", p: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                🎯 Authenticity
              </Typography>
              <Typography variant="body1">
                Every item is sourced directly from official manufacturers and
                licensed distributors to ensure you receive genuine products.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: "100%", textAlign: "center", p: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                🌟 Quality
              </Typography>
              <Typography variant="body1">
                We carefully inspect every product before shipping to maintain
                the highest standards our customers deserve.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: "100%", textAlign: "center", p: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                🤝 Community
              </Typography>
              <Typography variant="body1">
                More than a store, we're building a community where anime fans
                can discover, collect, and celebrate their favorite series.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Team Section */}
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        sx={{ mb: 6 }}
      >
        Meet Our Team
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ textAlign: "center", p: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 2,
                bgcolor: "primary.main",
                fontSize: "2rem",
              }}
            >
              👨‍💼
            </Avatar>
            <Typography variant="h6" fontWeight="bold">
              Akira Tanaka
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Founder & CEO
            </Typography>
            <Typography variant="body2">
              20+ years in anime industry, former manga translator
            </Typography>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ textAlign: "center", p: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 2,
                bgcolor: "secondary.main",
                fontSize: "2rem",
              }}
            >
              👩‍🎨
            </Avatar>
            <Typography variant="h6" fontWeight="bold">
              Yuki Sato
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Head of Curation
            </Typography>
            <Typography variant="body2">
              Expert in collectibles and limited edition merchandise
            </Typography>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ textAlign: "center", p: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 2,
                bgcolor: "success.main",
                fontSize: "2rem",
              }}
            >
              👨‍💻
            </Avatar>
            <Typography variant="h6" fontWeight="bold">
              Kenji Nakamura
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Tech Lead
            </Typography>
            <Typography variant="body2">
              Building the best online experience for anime fans
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Stats Section */}
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 6 }}>
          ApexStore by the Numbers
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="h3" fontWeight="bold" color="primary.main">
              50K+
            </Typography>
            <Typography variant="h6">Happy Customers</Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="h3" fontWeight="bold" color="primary.main">
              10K+
            </Typography>
            <Typography variant="h6">Products Sold</Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="h3" fontWeight="bold" color="primary.main">
              500+
            </Typography>
            <Typography variant="h6">Anime Series</Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="h3" fontWeight="bold" color="primary.main">
              99%
            </Typography>
            <Typography variant="h6">Customer Satisfaction</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
