import type { Product } from "@/app/models/Product";
import React, { useState } from "react";
import { data, useParams } from "react-router";

export default function ProductDetails(): React.ReactElement {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  React.useEffect(() => {
    fetch(`https://localhost:7214/api/Products/id?id=${id}`).then((response) =>
      response
        .json()
        .then((data) => setProduct(data))
        .catch((error) => console.error(error))
    );
  }, [id]);

  console.log("====================================");
  console.log(product);
  console.log("====================================");
  return <div>{product?.name}</div>;
}
