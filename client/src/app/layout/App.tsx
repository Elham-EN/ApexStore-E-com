import React from "react";
import type { Product } from "../models/Product";

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
    <div>
      <h1 style={{ fontFamily: "sans-serif", fontSize: "2.5rem" }}>
        React Client App: ApexStore
      </h1>
      <ul>
        {products &&
          products.map((product, index) => (
            <li key={index}>
              <p> Product Name: {product.name}</p>
              <p> Product Price: {product.price}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
