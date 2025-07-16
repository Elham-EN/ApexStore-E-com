import React from "react";
import { Box, Container } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import type { Product } from "@/app/models/Product";
import Catalog from "@/features/catalog/components/Catalog";
import Navbar from "@/app/layout/Navbar";

function App() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const { mode } = useColorScheme();

  React.useEffect(() => {
    fetch("https://localhost:7214/api/Products")
      .then((response) =>
        // parsing it to produce a JavaScript object
        response.json()
      )
      .then((data) => setProducts(data as Product[]));
  }, []);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background:
            mode === "dark"
              ? "radial-gradient(circle, #c4c5c7, #111B27)"
              : "radial-gradient(circle, #baecf9, #103f5e)",
          py: 6,
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          <Catalog products={products} />
        </Container>
      </Box>
    </>
  );
}

export default App;
