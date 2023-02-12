import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export function FormPageHeader(props) {
  const mobileOpen = useSelector((state) => state.mobileOpenReducer.value);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Member Enrollment Form
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
