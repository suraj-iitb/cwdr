import { useState } from "react";
import { Snackbar, Alert, Grid, CssBaseline } from "@mui/material";
import { useLocation } from "react-router-dom";

import FieldWorkerForm from "./FieldWorkerForm";
import FieldWorkerFormSnehidi from "./FieldWorkerFormSnehidi";
import { addDocument } from "../../firebase";
import { Header } from "..";
import { COLLECTIONS } from "../../constants/constants";

export const FieldWorkerRoot = (props) => {
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
      <CssBaseline />
      {showHeader && <Header />}
      <Grid container spacing={3} sx={{ mt: "10px" }}>
        {(org === COLLECTIONS.MANUSHI || org === COLLECTIONS.MAITHRI) && (
          <FieldWorkerForm
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
export default FieldWorkerRoot;
