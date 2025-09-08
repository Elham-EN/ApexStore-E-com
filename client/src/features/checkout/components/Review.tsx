import { useFetchBasketQuery } from "@/features/basket/basketApiSlice";
import { currencyFormat } from "@/lib/util";
import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import type { ConfirmationToken } from "@stripe/stripe-js";
import React from "react";

interface Props {
  confirmationToken: ConfirmationToken | null;
}

function Review({ confirmationToken }: Props): React.ReactElement {
  const { data: basket } = useFetchBasketQuery();

  const nameString = (): string => {
    if (!confirmationToken?.shipping) return "";
    const { name } = confirmationToken.shipping;
    return `${name}`;
  };

  const addressString = (): string => {
    if (!confirmationToken?.shipping) return "";
    const { address } = confirmationToken.shipping;
    return `${address?.line1}, ${address?.city}, ${address?.state}, 
      ${address?.postal_code}, ${address?.country}`;
  };

  const paymentString = (): string => {
    if (!confirmationToken?.payment_method_preview.card) return "";
    const { card } = confirmationToken.payment_method_preview;
    return `${card.brand.toUpperCase()}, **** **** **** ${card.last4},
      Exp: ${card.exp_month}/${card.exp_year}`;
  };
  return (
    <div>
      <Box mt={4} width={"100%"}>
        <Typography>Billing and delivery information</Typography>
        <dl>
          <Typography component={"dt"} fontWeight={"medium"}>
            Name
          </Typography>
          <Typography component={"dd"} mt={0.5} color="textSecondary">
            {nameString()}
          </Typography>
          <Typography component={"dt"} mt={2} fontWeight={"medium"}>
            Shipping address
          </Typography>
          <Typography component={"dd"} mt={0.5} color="textSecondary">
            {addressString()}
          </Typography>
          <Typography component={"dt"} mt={2} fontWeight={"medium"}>
            Payment details
          </Typography>
          <Typography component={"dd"} mt={0.5} color="textSecondary">
            {paymentString()}
          </Typography>
        </dl>
      </Box>
      <Box mt={6} mx={"auto"}>
        <Divider />
        <TableContainer>
          <Table>
            <TableBody>
              {basket?.items.map((item) => (
                <TableRow
                  key={item.productId}
                  sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                >
                  <TableCell sx={{ py: 2 }}>
                    <Box display={"flex"} gap={3} alignItems={"center"}>
                      <img
                        src={item.pictureUrl}
                        alt={item.name}
                        style={{ width: 80, height: 80 }}
                      />
                      <Typography>{item.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>x {item.quantity}</TableCell>
                  <TableCell>{currencyFormat(item.price)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default Review;
