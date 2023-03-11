import { useState } from "react";
import { Snackbar, Alert, Grid, CssBaseline } from "@mui/material";
import { useLocation } from "react-router-dom";

import { FieldWorkerFormManushiMaithri, FieldWorkerFormSnehidi } from "..";
import { addDocument } from "../../firebase";
import { Header } from "..";
import { COLLECTIONS } from "../../constants/constants";

export const FieldWorkerForm = (props) => {
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    state: "error",
    message: "Something went wrong!",
  });

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const org = query.get("org") || props.org;

  const showHeader = props.showHeader ?? true;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  const saveData = async (collectionName, data) => {
    try {
      await addDocument(collectionName, { ...data, org });
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
    <div class="container"
      style={{
        background: `url("../images/background.jpeg") repeat`,
      }}
    >
      <CssBaseline />
      {showHeader && <Header />}
      <div class="contentBody"
      style={{
        overflow: "scroll"
      }}>
        <Grid container spacing={3} sx={{ mt: 0 }}>
          {(org === COLLECTIONS.MANUSHI || org === COLLECTIONS.MAITHRI) && (
            <FieldWorkerFormManushiMaithri
              org={org}
              memberID={props.memberID}
              saveData={saveData}
            />
          )}
          {org === COLLECTIONS.SNEHIDHI && (
            <FieldWorkerFormSnehidi
              org={org}
              memberID={props.memberID}
              saveData={saveData}
            />
          )}
        </Grid>
      </div>

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
    </div>
  );
};
