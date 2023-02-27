import { useLocation } from "react-router-dom";
import FieldWorkerForm from "./FieldWorkerForm";
import FieldWorkerFormSnehidi from "./FieldWorkerFormSnehidi";
import { storeData, fetchData } from "../../firebase/commonUtil";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { FormPageHeader } from "..";

const FieldWorkerRoot = (props) => {
  const theme = createTheme();
  const showHeader = props.showHeader ?? true;
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const org = query.get("org") || props.org;
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    state: "error",
    message: "Something went wrong",
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  const saveData = async (data, objectName) => {
    try {
      await storeData({...data, name: org}, objectName);
      setOpenSnackbar({
        open: true,
        state: "success",
        message: "Form submitted successfully!",
      });
    } catch (error) {
      setOpenSnackbar({
        open: true,
        state: "error",
        message: "Error while submitted the form.",
      });
    }
  };

  const fetchData = async (memberID) =>{
    return await fetchData(memberID);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {showHeader && (
          <AppBar
            position="absolute"
            color="default"
            elevation={0}
            sx={{
              position: "relative",
              borderBottom: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            <Toolbar>
              <FormPageHeader />
            </Toolbar>
          </AppBar>
        )}
        {(org === "manushi" || org === "mythri") && (
          <FieldWorkerForm org={org} saveData={saveData} data={props.data}  />
        )}
        {org === "snehidi" && (
          <FieldWorkerFormSnehidi org={org} saveData={saveData} fetchData={fetchData} memberID={props.memberID} />
        )}

        <Snackbar
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={openSnackbar.open}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={openSnackbar.state}>
            {openSnackbar.message}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </>
  );
};
export default FieldWorkerRoot;
