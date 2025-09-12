import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
//If you need to debug, use StrictMode
const root = createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);
