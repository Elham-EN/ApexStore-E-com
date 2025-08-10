import { Box, Pagination, Typography } from "@mui/material";
import React from "react";
import type { Pagination as PaginationType } from "../models/Pagination";

interface Props {
  metadata: PaginationType;
  onPageChange: (page: number) => void;
}

function AppPagination({ metadata, onPageChange }: Props): React.ReactElement {
  const { currentPage, totalPages, totalCount, pageSize } = metadata;
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      marginTop={3}
    >
      <Typography>
        Displaying {startItem}-{endItem} of {totalCount} items
      </Typography>
      <Pagination
        color="secondary"
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
      />
    </Box>
  );
}

export default AppPagination;
