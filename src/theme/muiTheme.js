import { createTheme } from "@mui/material/styles";

const colors = {
  primary: {
    main: "#087ccf",
    dark: "#1b1a78",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#1f1b5a",
    contrastText: "#ffffff",
  },
  text: {
    primary: "#ffffff",
    secondary: "#4b5563",
  },
};

export const makeTheme = (dir = "ltr") =>
  createTheme({
    direction: dir,
    palette: {
      mode: "dark",
      primary: colors.primary,
      secondary: colors.secondary,
      text: colors.text,
      background: {
        default: "#087ccf",
        paper: "rgba(255, 255, 255, 0.86)",
      },
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: "2.5rem",
        lineHeight: 1.2,
        color: "#ffffff",
      },
      h2: {
        fontFamily: '"Inknut Antiqua", Georgia, "Times New Roman", serif',
        fontWeight: 800,
        fontSize: "2rem",
        lineHeight: 1.3,
        letterSpacing: "0.3px",
        color: "#ffffff",
      },
      h3: {
        fontFamily: '"Inknut Antiqua", Georgia, "Times New Roman", serif',
        fontWeight: 700,
        fontSize: "1.5rem",
        lineHeight: 1.4,
        color: "#ffffff",
      },
      body1: { fontSize: "1rem", lineHeight: 1.6, color: "#ffffff" },
      body2: { fontSize: "0.875rem", lineHeight: 1.5, color: "#ffffff" },
      button: { textTransform: "none", fontWeight: 700 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { height: "100%" },
          body: {
            height: "100%",
            margin: 0,
            color: "#ffffff",
            background: "linear-gradient(90deg, #087ccf 0%, #1b1a78 100%)",
            backgroundAttachment: "fixed",
            boxSizing: "border-box",
          },
          "#root": { height: "100%" },
          "*": { boxSizing: "border-box" },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backdropFilter: "saturate(1.1) blur(6px)",
            background: "rgba(255, 255, 255, 0.86)",
            boxShadow: "0 10px 24px rgba(0, 0, 0, 0.08)",
            color: "#4b5563",
          },
        },
      },

      MuiContainer: {
        defaultProps: { maxWidth: "lg" },
        styleOverrides: {
          root: {
            maxWidth: "1200px",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            marginLeft: "auto",
            marginRight: "auto",
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            textTransform: "none",
            fontWeight: 700,
          },
          containedPrimary: {
            background: "#1f1b5a",
            color: "#fff",
            boxShadow: "0 8px 16px rgba(31, 27, 90, 0.35)",
            "&:hover": {
              background: "#2a2570",
              boxShadow: "0 12px 24px rgba(31, 27, 90, 0.45)",
            },
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            background: "rgba(255, 255, 255, 0.10)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.20)",
            color: "#fff",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            background: "rgba(255, 255, 255, 0.10)",
            backdropFilter: "blur(10px)",
          },
        },
      },
    },
    breakpoints: {
      values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
    },
    spacing: 8,
  });

const muiTheme = makeTheme("ltr");
export default muiTheme;
