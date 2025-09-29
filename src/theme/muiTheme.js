import { createTheme } from '@mui/material/styles';

// Define the existing color scheme
const colors = {
  primary: {
    main: '#087ccf', // --bg-start from existing theme
    dark: '#1b1a78', // --bg-end from existing theme
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#1f1b5a', // Header button color
    contrastText: '#ffffff',
  },
  background: {
    default: 'linear-gradient(90deg, #087ccf 0%, #1b1a78 100%)',
    paper: 'rgba(255, 255, 255, 0.86)', // Header backdrop
  },
  text: {
    primary: '#ffffff',
    secondary: '#4b5563', // Header info text color
  },
};

// Create the Material UI theme
const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: colors.primary,
    secondary: colors.secondary,
    background: {
      default: '#087ccf', // Fallback color
      paper: 'rgba(255, 255, 255, 0.86)',
    },
    text: colors.text,
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      color: '#ffffff',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      color: '#ffffff',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      color: '#ffffff',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#ffffff',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#ffffff',
    },
  },
  components: {
    // Global styles
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          margin: 0,
          background: 'linear-gradient(90deg, #087ccf 0%, #1b1a78 100%)',
          backgroundAttachment: 'fixed',
          color: '#ffffff',
          boxSizing: 'border-box',
        },
        '#root': {
          height: '100%',
        },
        '*': {
          boxSizing: 'border-box',
        },
      },
    },
    // AppBar customization
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'saturate(1.1) blur(6px)',
          background: 'rgba(255, 255, 255, 0.86)',
          boxShadow: '0 10px 24px rgba(0, 0, 0, 0.08)',
          color: '#4b5563',
        },
      },
    },
    // Container customization
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1200px',
          padding: '0 1rem',
          margin: '0 auto',
        },
      },
    },
    // Button customization
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          textTransform: 'none',
          fontWeight: 700,
        },
        containedPrimary: {
          background: '#1f1b5a',
          color: '#fff',
          boxShadow: '0 8px 16px rgba(31, 27, 90, 0.35)',
          '&:hover': {
            background: '#2a2570',
            boxShadow: '0 12px 24px rgba(31, 27, 90, 0.45)',
          },
        },
      },
    },
    // Card customization
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
      },
    },
    // Paper customization
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  spacing: 8, // 8px base spacing unit
});

export default muiTheme;