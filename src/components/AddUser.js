import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { collection, addDoc } from "firebase/firestore";

import { db, addUser, deleteUser, encrypt, decrypt } from "../firebase";

export function AddUser() {
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const addUserInDB = async (e) => {
    let v;
    e.preventDefault();
    
    await addUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }).then((result) => {
      console.log(result)
    })

    await deleteUser({uid: '4ZYkwu2S8dPTfaw9ys24zaxSBA83'})

    await encrypt({ text: firstName })
      .then((result) => {
        // Read result of the Cloud Function.
        /** @type {any} */
        const data = result.data;
        v = data.cipherText;
        console.log(data);
        // const sanitizedMessage = data.text;
      });

      console.log(v);
      await decrypt({ text: v })
      .then((result) => {
        // Read result of the Cloud Function.
        /** @type {any} */
        const data = result.data;
        console.log(data);
        // const sanitizedMessage = data.text;
      });
    //   await addNumbers1({ firstNumber: 1, secondNumber: 2 })
    //   .then((result) => {
    //     // Read result of the Cloud Function.
    //     /** @type {any} */
    //     const data = result.data;
    //     console.log(data);
    //     // const sanitizedMessage = data.text;
    //   });

      // await addMessageCall({ firstNumber: 10, secondNumber: 20 })
      // .then((result) => {
      //   // Read result of the Cloud Function.
      //   /** @type {any} */
      //   const data = result.data;
      //   const sanitizedMessage = data.text;
      //   console.log(sanitizedMessage);
      // })
      // .catch((error) => {
      //   // Getting the Error details.
      //   const code = error.code;
      //   const message = error.message;
      //   const details = error.details;
      //   console.log(code, message, details)
      // });

    try {
      await addDoc(collection(db, "mythri-me"), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        noOfApplicants: 0,
        status: "active",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Add Field Worker
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                autoComplete="given-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                autoComplete="family-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="email"
                id="email"
                name="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                autoComplete="email"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="password"
                id="password"
                name="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                autoComplete="password"
                variant="standard"
              />
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              size="large"
              onClick={addUserInDB}
            >
              Add User
            </Button>
          </Grid>
        </React.Fragment>
      </Paper>
    </Container>
  );
}
