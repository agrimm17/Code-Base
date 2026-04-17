import { useState, useContext, lazy, Suspense } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import PaletteIcon from '@mui/icons-material/Palette';
import MenuIcon from '@mui/icons-material/Menu';
import CheckIcon from '@mui/icons-material/Check';
import { ColorModeContext } from './theme/ColorModeContext';
import { THEME_OPTIONS } from './theme/theme';
import WelcomeOverlay from './components/WelcomeOverlay';

const IntroductionPage = lazy(() => import('./pages/IntroductionPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const WELCOME_OVERLAY_STORAGE_KEY = 'welcomeOverlaySeen';

const navItems = [
  { label: 'Introduction', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

function NavLinks({ onClick }) {
  const location = useLocation();
  return (
    <List>
      {navItems.map(({ label, path }) => (
        <ListItem key={path} disablePadding>
          <ListItemButton component={Link} to={path} onClick={onClick} selected={location.pathname === path}>
            <ListItemText primary={label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default function App() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [themeMenuAnchor, setThemeMenuAnchor] = useState(null);
  const [welcomeOpen, setWelcomeOpen] = useState(() => {
    try {
      return !localStorage.getItem(WELCOME_OVERLAY_STORAGE_KEY);
    } catch {
      return true;
    }
  });
  const { mode, setTheme } = useContext(ColorModeContext);

  const handleWelcomeClose = () => {
    try {
      localStorage.setItem(WELCOME_OVERLAY_STORAGE_KEY, 'true');
    } catch {
      // ignore
    }
    setWelcomeOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <WelcomeOverlay
        open={welcomeOpen}
        onClose={handleWelcomeClose}
      />
      <AppBar position="static">
        <Toolbar>
          {isSmall && (
            <IconButton color="inherit" edge="start" onClick={() => setDrawerOpen(true)} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Alex's Code-Base
          </Typography>
          {!isSmall && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navItems.map(({ label, path }) => (
                <Typography
                  key={path}
                  component={Link}
                  to={path}
                  sx={{ color: 'inherit', textDecoration: 'none', px: 1.5, py: 0.5, borderRadius: 1 }}
                  variant="body2"
                >
                  {label}
                </Typography>
              ))}
            </Box>
          )}
          <IconButton
            color="inherit"
            onClick={(e) => setThemeMenuAnchor(e.currentTarget)}
            aria-label="Choose theme"
            aria-controls={themeMenuAnchor ? 'theme-menu' : undefined}
            aria-haspopup="true"
          >
            <PaletteIcon />
          </IconButton>
          <Menu
            id="theme-menu"
            anchorEl={themeMenuAnchor}
            open={Boolean(themeMenuAnchor)}
            onClose={() => setThemeMenuAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {THEME_OPTIONS.map(({ id, label }) => (
              <MenuItem
                key={id}
                onClick={() => {
                  setTheme(id);
                  setThemeMenuAnchor(null);
                }}
              >
                {mode === id && <CheckIcon sx={{ mr: 1, fontSize: 20 }} />}
                {mode !== id && <Box component="span" sx={{ width: 28, mr: 1 }} />}
                {label}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        anchor="left"
      >
        <Box sx={{ width: 240, pt: 2 }} role="presentation">
          <NavLinks onClick={() => setDrawerOpen(false)} />
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>}>
          <Routes>
            <Route path="/" element={<IntroductionPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </Box>
    </Box>
  );
}
