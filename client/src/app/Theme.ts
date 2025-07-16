import { createTheme } from "@mui/material";

export const theme = createTheme({
  cssVariables: {
    // This is CRITICAL for manual switching
    colorSchemeSelector: "class",
  },
  defaultColorScheme: "light",
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#3f50b5",
          light: "#eaeaea",
          dark: "#121212",
        },
        background: {
          default: "#eaeaea",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#ffffff",
          light: "#eaeaea",
          dark: "#121212",
        },
        background: {
          default: "#121212",
        },
      },
    },
  },
});
