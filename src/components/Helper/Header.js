import { useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home"
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setMobileOpen } from "../../redux/slices/mobileOpenSlice";
import { useAuth } from "../../hooks";
import { ROLES } from "../../constants/constants";
import mainLogo from "../../images/logo.png";

import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { useMatch } from "react-router-dom";
export function Header(props) {
  const { open, handleDrawerOpen, drawerWidth } = props;
  const adminMatch = useMatch("/admin*");
  const [anchorEl, setAnchorEl] = useState(null);

  // const mobileOpen = useSelector((state) => state.mobileOpenReducer.value);

  // const dispatch = useDispatch();

  const navigate = useNavigate();

  const { currentUser, _signOut } = useAuth();

  // const handleDrawerToggle = () => {
  //   dispatch(setMobileOpen(!mobileOpen));
  // };

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
    // setAnchorEl(null);
  };

  const handleBrandClick = () => {
    navigate("/");
  };
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  return (
    <div class="contentHeader">
      {/* <Box sx={{ height: props.drawerWidth ? "100vh" : "8vh" }}> */}
        <AppBar position="fixed" open={open}>
          <Toolbar style={{ backgroundColor: "#EAEAEE" , color: 'black'}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerOpen}
              sx={{ mr: 2, ...((!adminMatch || open) && { display: "none" }) }}
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
                  onClick={handleHome}
                  color="inherit"
                >
                  <HomeIcon />
                </IconButton>
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
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  getContentAnchorEl={null}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      left: '10%',
                      transform: 'translateX(87vw) translateY(36%)',
                    }
                  }}
                  MenuListProps={{
                    style: {
                      padding: 0,
                    },
                  }}
                >
                  <MenuItem><b>{currentUser.email}</b></MenuItem>
                  {currentUser?.roles?.includes(ROLES.ADMIN) && (
                    <MenuItem onClick={handleAdmin}>Admin</MenuItem>
                  )}
                  <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      {/* </Box> */}
    </div>
  );
}
