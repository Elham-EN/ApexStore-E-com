import React from "react";
import type { Product } from "@/app/models/Product";
import Catalog from "@/features/catalog/components/Catalog";
import { Box, Container, Typography } from "@mui/material";

function App() {
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    fetch("https://localhost:7214/api/Products")
      .then((response) =>
        // parsing it to produce a JavaScript object
        response.json()
      )
      .then((data) => setProducts(data as Product[]));
  }, []);

  return (
    <Container maxWidth="xl">
      <Box display={"flex"} justifyContent={"center"} gap={3} marginY={3}>
        <Typography variant="h1" fontSize={"2.5em"}>
          React Client App: ApexStore
        </Typography>
      </Box>
      <Catalog products={products} />
    </Container>
  );
}

export default App;
