import React from "react";
import type { Product } from "@/app/models/Product";
import ProductList from "@/features/catalog/components/ProductList";

function Catalog(): React.ReactElement {
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    fetch("https://localhost:7214/api/Products")
      .then((response) =>
        // parsing it to produce a JavaScript object
        response.json()
      )
      .then((data) => setProducts(data as Product[]));
  }, []);

  return <ProductList products={products} />;
}

export default Catalog;
