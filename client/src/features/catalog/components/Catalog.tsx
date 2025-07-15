import React from "react";
import type { Product } from "@/app/models/Product";
import ProductList from "@/features/catalog/components/ProductList";

interface CatalogProps {
  products: Product[];
}

function Catalog({ products }: CatalogProps): React.ReactElement {
  return <ProductList products={products} />;
}

export default Catalog;
