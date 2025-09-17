import React from "react";
import Carousel from "./Carousel";
import { Box } from "@mui/material";
import FeaturedProduct from "./FeaturedProduct";

export default function HomePage(): React.ReactElement {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Carousel />
      <FeaturedProduct />
    </Box>
  );
}
