import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";

import { SideBar, Header } from "../components";
import { adminDrawerWidth } from "../constants/constants";

export const AdminPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Header drawerWidth={adminDrawerWidth}/>

      <SideBar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${adminDrawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
};
