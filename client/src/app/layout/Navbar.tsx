import React from "react";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import MaterialUISwitch from "@/app/components/ThemeSwitch";
import { NavLink } from "react-router";
import { ShoppingCart } from "@mui/icons-material";
import { useAppSelector } from "../hooks";

export default function Navbar(): React.ReactElement {
  const { isLoading } = useAppSelector((state) => state.ui);

  const { mode, setMode } = useColorScheme();

  const midLinks = [
    { title: "catalog", path: "/catalog" },
    { title: "about", path: "/about" },
    { title: "policy", path: "/store-policy" },
  ];

  const rightLinks = [
    { title: "login", path: "/login" },
    { title: "register", path: "/register" },
  ];

  const navLinkStyles = {
    color: "inherit",
    typography: "h6",
    textDecoration: "none",
    "&:hover": { color: "grey.500" },
    "&.active": { color: "#baecf9" },
  };

  const handleThemeChange = () => {
    setMode(mode === "light" ? "dark" : "light");
  };
  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            component={NavLink}
            to={"/"}
            variant="h5"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            ApexStore
          </Typography>
          <MaterialUISwitch
            checked={mode === "dark"}
            onChange={handleThemeChange}
          />
        </Box>
        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navLinkStyles}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton sx={{ color: "inherit" }}>
            <Badge badgeContent="4" color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navLinkStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="secondary" />
        </Box>
      )}
    </AppBar>
  );
}
