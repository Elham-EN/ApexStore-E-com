import { AppBar, Toolbar, Typography } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import React from "react";
import MaterialUISwitch from "@/components/ThemeSwitch";

export default function Navbar(): React.ReactElement {
  const { mode, setMode } = useColorScheme();

  const handleThemeChange = () => {
    setMode(mode === "light" ? "dark" : "light");
  };
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5">ApexStore</Typography>
        <div>
          <MaterialUISwitch
            checked={mode === "dark"}
            onChange={handleThemeChange}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}
