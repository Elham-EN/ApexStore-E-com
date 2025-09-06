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
import React from "react";

export default function Review(): React.ReactElement {
  const { data: basket } = useFetchBasketQuery();
  return (
    <div>
      <Box mt={4} width={"100%"}>
        <Typography>Billing and delivery information</Typography>
        <dl>
          <Typography component={"dt"} fontWeight={"medium"}>
            Shipping address
          </Typography>
          <Typography component={"dd"} mt={0.5} color="textSecondary">
            address goes here
          </Typography>
          <Typography component={"dt"} mt={2} fontWeight={"medium"}>
            Payment details
          </Typography>
          <Typography component={"dd"} mt={0.5} color="textSecondary">
            payment goes here
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
