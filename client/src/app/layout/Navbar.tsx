import React from "react";
import {
  AppBar,
  Badge,
  Box,
  Drawer,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import MaterialUISwitch from "@/app/components/ThemeSwitch";
import { Link, NavLink } from "react-router";
import { ShoppingCart, Menu } from "@mui/icons-material";
import { useAppSelector } from "../hooks";
import { useFetchBasketQuery } from "@/features/basket/basketApiSlice";
import UserMenu from "./UserMenu";
import { useUserInfoQuery } from "@/features/account/accountApiSlice";

const drawerWidth = 240;

export default function Navbar(): React.ReactElement {
  const { currentData: user } = useUserInfoQuery();
  const { isLoading } = useAppSelector((state) => state.ui);
  const { mode, setMode } = useColorScheme();
  const { data: basket } = useFetchBasketQuery();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const itemCount =
    basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Mobile drawer content
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ApexStore
      </Typography>
      <Divider />
      <List>
        {midLinks.map(({ title, path }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton
              component={NavLink}
              to={path}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={title.toUpperCase()} />
            </ListItemButton>
          </ListItem>
        ))}
        {!user && (
          <>
            <Divider />
            {rightLinks.map(({ title, path }) => (
              <ListItem key={path} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={path}
                  sx={{ textAlign: "center" }}
                >
                  <ListItemText primary={title.toUpperCase()} />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {/* Mobile menu button - show on medium screens and below */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <Menu />
          </IconButton>

          {/* Logo */}
          <Typography
            component={NavLink}
            to={"/"}
            variant="h5"
            sx={{
              textDecoration: "none",
              color: "inherit",
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            ApexStore
          </Typography>

          {/* Theme switch - visible on all screens */}
          <MaterialUISwitch
            checked={mode === "dark"}
            onChange={handleThemeChange}
            sx={{ ml: { xs: 0, md: 2 } }}
          />

          {/* Desktop navigation links - hide on medium screens and below */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
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
          </Box>

          {/* Cart and auth links */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              component={Link}
              to={"/basket"}
              sx={{ color: "inherit" }}
            >
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {user ? (
              <UserMenu user={user} />
            ) : (
              <>
                {/* Desktop auth links - hide on medium screens and below */}
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
              </>
            )}
          </Box>
        </Toolbar>

        {isLoading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress color="secondary" />
          </Box>
        )}
      </AppBar>

      {/* Mobile drawer - show on medium screens and below */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
