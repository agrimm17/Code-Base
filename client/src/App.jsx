import { useState, useContext } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import { ColorModeContext } from './theme/ColorModeContext';
import IntroductionPage from './pages/IntroductionPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

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
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          {isSmall && (
            <IconButton color="inherit" edge="start" onClick={() => setDrawerOpen(true)} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Portfolio
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
          <IconButton color="inherit" onClick={toggleColorMode} aria-label="Toggle light/dark mode">
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
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
        <Routes>
          <Route path="/" element={<IntroductionPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Box>
    </Box>
  );
}
