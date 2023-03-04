import * as React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import Button from '@mui/material/Button';

import { setMobileOpen } from "../redux/slices/mobileOpenSlice";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../constants/constants";
import mainLogo from "../images/logo.png";
import { Link } from "react-router-dom";

import { Spa } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

export function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const mobileOpen = useSelector((state) => state.mobileOpenReducer.value);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { currentUser, _signOut } = useAuth();

  const handleDrawerToggle = () => {
    dispatch(setMobileOpen(!mobileOpen));
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleName = () => {
    setAnchorEl(null);
  };
  
  const handleSignOut = () => {
    _signOut();
    setAnchorEl(null);
  };

  const handleAdmin = () => {
    navigate("/admin/addFieldWorker");
    setAnchorEl(null);
  };

  const handleHome = () => {
    navigate("/");
    setAnchorEl(null);
  };

  const handleBrandClick = () => {
    navigate("/");
  };

  return (
    <Box sx={{ height: props.drawerWidth ? "100vh" : "8vh" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${props.drawerWidth}px)` },
          ml: { sm: `${props.drawerWidth}px` },
        }}
      >
        <Toolbar style={{ backgroundColor: "#9131b9" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <img
            src={mainLogo}
            width="40"
            height="40"
            alt="Logo"
            style={{ marginRight: "1rem", cursor: "pointer" }}
            onClick={handleBrandClick}
            className="efe"
            title="Navigate to home"
          />

          <Typography
            variant="h6"
            noWrap
            component="div"
            title="Navigate to home"
            style={{ cursor: "pointer" }}
            onClick={handleBrandClick}
          >
            Centre for Women's Development and Research
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {currentUser && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                sx={{ mt: "30px" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleName}>
                  <Typography>
                    Signed in as{" "}
                    <strong>
                      {currentUser.firstName} {currentUser.lastName}
                    </strong>
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleHome}>Home</MenuItem>
                {currentUser?.roles?.includes(ROLES.ADMIN) && (
                  <MenuItem onClick={handleAdmin}>Admin</MenuItem>
                )}
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
