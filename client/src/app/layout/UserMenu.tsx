import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import type { User } from "../models/User";
import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import { History, Logout, Person } from "@mui/icons-material";
import { useLogoutMutation } from "@/features/account/accountApiSlice";

interface FadeMenuProps {
  user: User;
}

export default function UserMenu({ user }: FadeMenuProps) {
  const [logout] = useLogoutMutation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick}>{user.email}</Button>
      <Menu
        id="fade-menu"
        slotProps={{
          list: {
            "aria-labelledby": "fade-button",
          },
        }}
        slots={{ transition: Fade }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemIcon>
            <Person />
            <ListItemText>My profile</ListItemText>
          </ListItemIcon>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <History />
          </ListItemIcon>
          <ListItemText>My order</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
