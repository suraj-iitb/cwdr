import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import useInput from "../../hooks/useInput";
import { Snackbar, Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { addUser, updateUser, updateDocument } from "../../firebase";
import { COLLECTIONS } from "../../constants/constants";
import { useDispatch } from "react-redux";
import { setOpenEditFieldWorkerDialog } from "../../redux/slices/openEditFieldWorkerDialogSlice";
import { isNotEmpty } from "../../utils";

export function AddFieldWorker(props) {
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState({
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

  const addUserInDB = async (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }
    if (!loading) {
      setLoading(true);
    }

    try {
      if (props.action === "add") {
        await addUser({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        });
      } else {
        await updateUser({
          uid: props.uid,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        });
        await updateDocument(COLLECTIONS.USER, props.uid, {
          firstName: firstName,
          lastName: lastName,
          email: email,
        });
        dispatch(setOpenEditFieldWorkerDialog(false));
      }

      setOpenSnackbar({
        open: true,
        state: "success",
        message: "Field worker added successfully!",
      });
    } catch (error) {
      console.log(error);
      setOpenSnackbar({
        open: true,
        state: "error",
        message: "Error while submitted the form.",
      });
    }

    resetFirstNameInput("");
    resetLastNameInput("");
    resetEmailInput("");
    resetPasswordInput("");
    setLoading(false);
  };
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput(isNotEmpty, props?.row?.firstName);

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput(isNotEmpty, props?.row?.lastName);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isNotEmpty, props?.row?.email);

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput(isNotEmpty, "");

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <React.Fragment>
          {props.action === "add" && (
            <Typography variant="h6" gutterBottom>
              Add Field Worker
            </Typography>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                error={firstNameInputHasError}
                helperText={
                  firstNameInputHasError && "This field cannot be empty"
                }
                onChange={firstNameChangedHandler}
                onBlur={firstNameBlurHandler}
                value={firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                error={lastNameInputHasError}
                helperText={
                  lastNameInputHasError && "This field cannot be empty"
                }
                onChange={lastNameChangedHandler}
                onBlur={lastNameBlurHandler}
                value={lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="email"
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="email"
                variant="standard"
                error={emailInputHasError}
                helperText={emailInputHasError && "This field cannot be empty"}
                onChange={emailChangedHandler}
                onBlur={emailBlurHandler}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="password"
                id="password"
                name="password"
                label="Password"
                fullWidth
                autoComplete="password"
                variant="standard"
                error={passwordInputHasError}
                helperText={
                  passwordInputHasError && "This field cannot be empty"
                }
                onChange={passwordChangedHandler}
                onBlur={passwordBlurHandler}
                value={password}
              />
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              size="large"
              onClick={addUserInDB}
              disabled={!formIsValid}
            >
              {props.action === "add" ? "Add User" : "Update User"}
            </Button>
            {loading && (
              <CircularProgress
                size={25}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "60%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
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
        </React.Fragment>
      </Paper>
    </Container>
  );
}
