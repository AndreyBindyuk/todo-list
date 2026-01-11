import { PropsWithChildren } from "react";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: { mode: "dark" },
  shape: { borderRadius: 12 },
});

export const AppThemeProvider = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);
