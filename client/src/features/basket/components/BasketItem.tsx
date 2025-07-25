import type { BasketItem as Item } from "@/app/models/Basket";
import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { type ReactElement } from "react";
import {
  useAddBasketItemMutation,
  useRemoveBasketItemMutation,
} from "../basketApiSlice";

interface Props {
  item: Item;
}

export default function BasketItem({ item }: Props): ReactElement {
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  return (
    <Paper
      sx={{
        borderRadius: 3,
        mb: 2,
        p: { xs: 2.5, sm: 3 },
        // Auto height on mobile for content flexibility, fixed
        // height on desktop for consistency
        minHeight: { xs: "auto", sm: 140 },
      }}
    >
      {/* Mobile Layout */}
      <Box
        sx={{
          // Stack vertically on mobile, horizontal layout
          // on desktop
          display: { xs: "block", sm: "flex" },
          // Spread content apart on desktop only
          justifyContent: { sm: "space-between" },
          // Center align items vertically on desktop
          alignItems: { sm: "center" },
        }}
      >
        {/* Top Section: Image + Product Info */}
        <Box
          // Always horizontal for image + product details
          display="flex"
          alignItems="center"
          gap={{ xs: 2, sm: 2 }}
          mb={{ xs: 3, sm: 0 }}
        >
          {/* Product Image */}
          <Box
            component="img"
            src={item.pictureUrl}
            alt={item.name}
            sx={{
              // Smaller on mobile to save space, larger on desktop
              width: { xs: 70, sm: 100 },
              height: { xs: 70, sm: 100 },
              // Crop image to fit dimensions without distortion
              objectFit: "cover",
              borderRadius: 2,
              // Prevent image from shrinking when text is long
              flexShrink: 0,
            }}
          />

          {/* Product Name & Price */}
          {/* Take remaining horizontal space */}
          <Box flex={1}>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
                fontWeight: 600,
                mb: 1,
                lineHeight: 1.3,
              }}
            >
              {item.name}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.1rem" },
                color: "text.secondary",
                mb: { xs: 0.5, sm: 0 },
              }}
            >
              ${(item.price / 100).toFixed(2)} each
            </Typography>
          </Box>
        </Box>

        {/* Bottom Section: Controls + Total + Delete */}
        <Box
          sx={{
            // Stack on mobile, flex column on desktop
            display: { xs: "block", sm: "flex" },
            // Vertical stack on desktop for right-aligned controls
            flexDirection: { sm: "column" },
            // Right-align all controls on desktop
            alignItems: { sm: "flex-end" },
            gap: { xs: 2, sm: 1 },
          }}
        >
          {/* Quantity Controls Row */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={{ xs: 2, sm: 0 }}
          >
            {/* Quantity Controls */}
            <Box display="flex" alignItems="center" gap={1.5}>
              <IconButton
                onClick={() =>
                  removeBasketItem({ productId: item.productId, quantity: 1 })
                }
                color="inherit"
                size="small"
                sx={{
                  border: 1,
                  borderRadius: 1,
                  width: { xs: 36, sm: 36 },
                  height: { xs: 36, sm: 36 },
                  borderColor: "divider",
                }}
              >
                <Remove fontSize="small" />
              </IconButton>

              <Typography
                sx={{
                  minWidth: 32,
                  textAlign: "center",
                  fontSize: { xs: "1.1rem", sm: "1rem" },
                  fontWeight: 500,
                }}
              >
                {item.quantity}
              </Typography>

              <IconButton
                onClick={() =>
                  addBasketItem({ productId: item.productId, quantity: 1 })
                }
                color="inherit"
                size="small"
                sx={{
                  border: 1,
                  borderRadius: 1,
                  width: { xs: 36, sm: 36 },
                  height: { xs: 36, sm: 36 },
                  borderColor: "divider",
                }}
              >
                <Add fontSize="small" />
              </IconButton>
            </Box>

            {/* Delete Button - Mobile */}
            <Typography
              onClick={() =>
                removeBasketItem({
                  productId: item.productId,
                  quantity: item.quantity,
                })
              }
              color="error"
              variant="button"
              sx={{
                // Only show on mobile (hidden on desktop)
                display: { xs: "block", sm: "none" },
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 600,
                ":hover": {
                  color: "error.dark",
                },
              }}
            >
              DELETE
            </Typography>
          </Box>

          {/* Total Price */}
          <Typography
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.1rem" },
              fontWeight: 700,
              color: "primary.main",
              textAlign: { xs: "center", sm: "right" },
              mb: { xs: 0, sm: 1 },
              mt: { xs: 0, sm: 2 },
            }}
          >
            Total: ${((item.price / 100) * item.quantity).toFixed(2)}
          </Typography>

          {/* Delete Button - Desktop */}
          <Typography
            onClick={() =>
              removeBasketItem({
                productId: item.productId,
                quantity: item.quantity,
              })
            }
            color="error"
            variant="button"
            sx={{
              // Only show on desktop (hidden on mobile)
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: 600,
              ":hover": {
                color: "error.dark",
              },
            }}
          >
            DELETE
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
