import React from "react";
import { Container } from "@mui/material";
import type { Product } from "@/app/models/Product";
import Catalog from "@/features/catalog/components/Catalog";
import Navbar from "@/app/layout/Navbar";

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
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 14 }}>
        <Catalog products={products} />
      </Container>
    </>
  );
}

export default App;
