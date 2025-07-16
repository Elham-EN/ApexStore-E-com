import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function Navbar(): React.ReactElement {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h5">ApexStore</Typography>
      </Toolbar>
    </AppBar>
  );
}
