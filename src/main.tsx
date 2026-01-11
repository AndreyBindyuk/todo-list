import React from "react";
import ReactDOM from "react-dom/client";

import { StoreProvider } from "@app/providers/StoreProvider";
import { AppThemeProvider } from "@app/providers/ThemeProvider";

import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppThemeProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </AppThemeProvider>
  </React.StrictMode>,
);
