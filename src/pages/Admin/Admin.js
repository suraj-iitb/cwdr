import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Drawer from "@mui/material/Drawer";

import { SideBar, Header } from "../../components";
import { adminDrawerWidth } from "../../constants/constants";

export const Admin = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-500px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    })
  );

  return (
    <div className="container">
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} drawerWidth={adminDrawerWidth}/>
      <Drawer
        variant="persistent"
        sx={{
          width: adminDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: adminDrawerWidth,
            boxSizing: 'border-box',
            height:'100vh'
          },
        }}
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <SideBar
          open={open}
          drawerWidth={adminDrawerWidth}
          handleDrawerClose={handleDrawerClose}
        />
      </Drawer>
      <Main open={open} style={{marginLeft: open ? `${adminDrawerWidth}px` : `0px`}}>
        {/* <DrawerHeader /> */}
        <Outlet />
      </Main>
    
    </div>
  );
};
