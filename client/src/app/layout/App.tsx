import React from "react";
import type { Product } from "../models/Product";
import Catalog from "../../features/catalog/components/Catalog";
import { Container, Typography } from "@mui/material";

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
      <Typography variant="h1" fontSize={"2.5em"}>
        React Client App: ApexStore
      </Typography>
      <Catalog products={products} />
    </Container>
  );
}

export default App;
