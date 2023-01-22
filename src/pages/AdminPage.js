import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { useSelector } from "react-redux";

import { SideBar, Header, AddUser } from "../components";
import { drawerWidth } from "../constants/constants";

export const AdminPage = () => {
  const openAddUser = useSelector((state) => state.openAddUserReducer.value);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Header />

      <SideBar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {openAddUser ? <AddUser /> : null}
      </Box>
    </Box>
  );
};
