import { createTheme } from "@mui/material/styles";

const themeWrapper = createTheme({
  palette: {
    primary: {
      main: "#458FFF", // Your desired primary button color
    },
    secondary: {
      main: "#FF4081", // Your desired secondary button color (optional)
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Common button styles
          fontFamily: "Roboto, sans-serif",
          textTransform: "none", // Prevents button text from being all uppercase
        },
        containedPrimary: {
          // Styles for primary contained buttons
          backgroundColor: "#1f2839",
          "&:hover": {
            backgroundColor: "#1f2890",
          },
        },
        containedSecondary: {
          // Styles for secondary contained buttons (if needed)
          backgroundColor: "#FF4081",
          "&:hover": {
            backgroundColor: "#E0336A",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5ef",
        },
      },
    },
  },
});

export default themeWrapper;
