import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import store from './store';
import App from './App';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a1a1a', // A dark black
    },
    secondary: {
      main: '#fdf6ec', // A vibrant yellow
    },
    background: {
      default: '#d6d3d1', // Keep a light background for content area readability
      paper: '#e7e5e4', // White for cards and paper elements
    },
    text: {
      primary: '#1a1a1a', // Dark text for readability
      secondary: '#4a4a4a', // Slightly lighter text for secondary info
    },
    // You might want to add custom colors or adjust others
    // warning: { main: '#ff9800' },
    // error: { main: '#f44336' },
    // success: { main: '#4caf50' },
    // info: { main: '#2196f3' },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#1c1917', // Navbar background
          color: '#ffffff', // Navbar text color
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#ffeb3b', // Yellow button background
          color: '#1a1a1a', // Black button text color
          '&:hover': {
            backgroundColor: '#fbc02d', // Darker yellow on hover
          },
        },
        outlinedPrimary: {
          color: '#1a1a1a', // Black text for outlined buttons
          borderColor: '#1a1a1a', // Black border for outlined buttons
          '&:hover': {
            borderColor: '#4a4a4a', // Darker border on hover
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#1a1a1a', // Black link color
          '&:hover': {
            color: '#4a4a4a', // Darker link on hover
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // Style text fields if needed
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation3: {
          // Style paper/card elevation if needed
        },
      },
    },
    // Add more component overrides for a consistent look
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);