import React from "react";
import type { Product } from "../../../app/models/Product";

interface CatalogProps {
  products: Product[];
}

function Catalog({ products }: CatalogProps): React.ReactElement {
  return (
    <ul>
      {products &&
        products.map((product, index) => (
          <li key={index}>
            <p> Product Name: {product.name}</p>
            <p> Product Price: {product.price}</p>
          </li>
        ))}
    </ul>
  );
}

export default Catalog;
