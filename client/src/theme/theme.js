import { createTheme } from '@mui/material/styles';

export const THEME_IDS = {
  DARK: 'dark',
  PASTEL_LAVENDER: 'pastelLavender',
  PASTEL_MINT: 'pastelMint',
  PASTEL_PEACH: 'pastelPeach',
};

export const THEME_OPTIONS = [
  { id: THEME_IDS.DARK, label: 'Dark' },
  { id: THEME_IDS.PASTEL_LAVENDER, label: 'Pastel Lavender' },
  { id: THEME_IDS.PASTEL_MINT, label: 'Pastel Mint' },
  { id: THEME_IDS.PASTEL_PEACH, label: 'Pastel Peach' },
];

const pastelLavenderPalette = {
  mode: 'light',
  primary: { main: '#7c6b9e', contrastText: '#fff' },
  secondary: { main: '#b8a9c9', contrastText: '#2d2640' },
  background: {
    default: '#e8e4f0',
    paper: '#f0edf5',
  },
  text: {
    primary: '#2d2640',
    secondary: '#5a5270',
  },
};

const pastelMintPalette = {
  mode: 'light',
  primary: { main: '#5a9a7e', contrastText: '#fff' },
  secondary: { main: '#9bc4b8', contrastText: '#1e3d32' },
  background: {
    default: '#e0f2eb',
    paper: '#eef8f3',
  },
  text: {
    primary: '#1e3d32',
    secondary: '#3d6b5a',
  },
};

const pastelPeachPalette = {
  mode: 'light',
  primary: { main: '#c97b5e', contrastText: '#fff' },
  secondary: { main: '#e8b4a0', contrastText: '#3d2c24' },
  background: {
    default: '#fdf0e8',
    paper: '#fdf5ef',
  },
  text: {
    primary: '#3d2c24',
    secondary: '#6b5348',
  },
};

export function getTheme(mode) {
  if (mode === THEME_IDS.PASTEL_LAVENDER) {
    return createTheme({ palette: pastelLavenderPalette });
  }
  if (mode === THEME_IDS.PASTEL_MINT) {
    return createTheme({ palette: pastelMintPalette });
  }
  if (mode === THEME_IDS.PASTEL_PEACH) {
    return createTheme({ palette: pastelPeachPalette });
  }
  return createTheme({
    palette: { mode: 'dark' },
  });
}
