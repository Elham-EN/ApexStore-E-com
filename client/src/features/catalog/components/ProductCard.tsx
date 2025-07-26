import type { ReactElement } from "react";
import type { Product } from "@/app/models/Product";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { useAddBasketItemMutation } from "@/features/basket/basketApiSlice";
import { currencyFormat } from "@/lib/util";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props): ReactElement {
  const [addBasketItem, { isLoading }] = useAddBasketItemMutation();
  return (
    <Card
      elevation={3}
      sx={{
        width: 280,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
      }}
    >
      <CardMedia
        component={"img"}
        sx={{ height: 240, backgroundSize: "cover" }}
        image={product.pictureUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="subtitle2"
          sx={{ textTransform: "uppercase" }}
        >
          {product.name}
        </Typography>
        <Typography variant="h6" sx={{ color: "secondary.main" }}>
          {currencyFormat(product.price)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          disabled={isLoading}
          loading={isLoading}
          onClick={() =>
            addBasketItem({
              productId: product.id,
              quantity: 1,
            })
          }
        >
          Add to card
        </Button>
        <Button component={Link} to={`/catalog/${product.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
