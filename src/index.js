import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context";
import { store } from "./redux";
import {  ThemeProvider, createTheme } from "@mui/material";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

root.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
  // </React.StrictMode>
);
