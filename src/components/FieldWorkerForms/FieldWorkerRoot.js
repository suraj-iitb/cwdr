import { useState } from "react";
import { Snackbar, Alert, CssBaseline, Grid, ThemeProvider, createTheme } from "@mui/material";
import { useLocation } from "react-router-dom";

import FieldWorkerForm from "./FieldWorkerForm";
import FieldWorkerFormSnehidi from "./FieldWorkerFormSnehidi";
import { addDocument } from "../../firebase";
import { Header } from "..";
import { COLLECTIONS } from "../../constants/constants";

const FieldWorkerRoot = (props) => {
  console.log(props)
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

  const saveData = async (collectionName, data) => {
    try {
      await addDocument(collectionName, data);
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

  return (
    <div
      style={{
        background: `url("../images/background.jpeg") repeat scroll`,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {showHeader && <Header />}
        <Grid container spacing={3} sx={{ mt: "10px" }}>
          {(org === COLLECTIONS.MANUSHI || org === COLLECTIONS.MAITHRI) && (
            <FieldWorkerForm
              org={org}
              saveData={saveData}
              data={props.data}
              memberID={props.memberID}
            />
          )}
          {org === COLLECTIONS.SNEHIDHI && (
            <FieldWorkerFormSnehidi
              org={org}
              saveData={saveData}
              memberID={props.memberID}
            />
          )}
        </Grid>

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
    </div>
  );
};
export default FieldWorkerRoot;
