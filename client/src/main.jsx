import { StrictMode, useContext, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeContext, ColorModeProvider } from './theme/ColorModeContext';
import { getTheme } from './theme/theme';
import App from './App.jsx';
import './index.css';

function ThemedApp() {
  const { mode } = useContext(ColorModeContext);
  const theme = useMemo(() => getTheme(mode), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ColorModeProvider>
        <ThemedApp />
      </ColorModeProvider>
    </BrowserRouter>
  </StrictMode>
);