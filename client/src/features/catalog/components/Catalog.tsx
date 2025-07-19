import React from "react";
import ProductList from "@/features/catalog/components/ProductList";
import { useFetchProductsQuery } from "../catalogApiSlice";

function Catalog(): React.ReactElement {
  const { data, isLoading } = useFetchProductsQuery();

  if (isLoading || !data) return <div>Loading...</div>;

  return <ProductList products={data} />;
}

export default Catalog;
