import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@material-ui/core";

import App from "./App.jsx";
import themeWrapper from "./Layouts/ThemeWrapper.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={themeWrapper}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
