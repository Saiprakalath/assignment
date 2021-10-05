import React from "react";
import AppRoutes from "./layouts/AppLayoutRoutes";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { mainTheme } from "./theme/main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <MuiThemeProvider theme={mainTheme}>
        <CssBaseline />
        <AppRoutes />
      </MuiThemeProvider>
    </>
  );
}

export default App;
