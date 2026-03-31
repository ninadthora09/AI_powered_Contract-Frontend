import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563EB", // blue-600
    },
    secondary: {
      main: "#0F172A", // slate-900
    },
    background: {
      default: "#F8FAFC", // slate-50
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F172A",
      secondary: "#64748B",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});

export default theme;
