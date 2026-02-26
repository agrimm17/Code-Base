import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ViewModule from '@mui/icons-material/ViewModule';
import ViewCarousel from '@mui/icons-material/ViewCarousel';
import ViewList from '@mui/icons-material/ViewList';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [nameFilter, setNameFilter] = useState('');
  const [techFilter, setTechFilter] = useState([]);
  const [allTech, setAllTech] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data)) {
          setProjects(data);
          const techSet = new Set();
          data.forEach((p) => (p.technologies || []).forEach((t) => techSet.add(t)));
          setAllTech([...techSet].sort());
        }
      })
      .catch(() => {
        if (!cancelled) setProjects([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const filtered = projects.filter((p) => {
    const nameMatch = !nameFilter.trim() || (p.name || '').toLowerCase().includes(nameFilter.trim().toLowerCase());
    const techMatch = techFilter.length === 0 || (techFilter.every((t) => (p.technologies || []).includes(t)));
    return nameMatch && techMatch;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Projects
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 3 }}>
        <TextField
          size="small"
          label="Search by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Technologies</InputLabel>
          <Select
            multiple
            value={techFilter}
            onChange={(e) => setTechFilter(e.target.value)}
            label="Technologies"
            renderValue={(selected) => selected.join(', ')}
          >
            {allTech.map((t) => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, v) => v != null && setViewMode(v)}
          size="small"
        >
          <ToggleButton value="grid" aria-label="Grid">
            <ViewModule />
          </ToggleButton>
          <ToggleButton value="carousel" aria-label="Carousel">
            <ViewCarousel />
          </ToggleButton>
          <ToggleButton value="list" aria-label="List">
            <ViewList />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loading ? (
        <Typography color="text.secondary">Loading projects…</Typography>
      ) : viewMode === 'grid' ? (
        <Grid container spacing={2}>
          {filtered.map((p) => (
            <Grid item xs={12} sm={6} key={p.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia component="img" height="160" image={p.thumbnailUrl || ''} alt="" />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    <a href={p.link || '#'} style={{ color: 'inherit', textDecoration: 'none' }}>{p.name}</a>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {p.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(p.technologies || []).map((t) => (
                      <Chip key={t} label={t} size="small" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : viewMode === 'carousel' ? (
        <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, pb: 2, minHeight: 320 }}>
          {filtered.map((p) => (
            <Card key={p.id} sx={{ minWidth: 300, maxWidth: 300, display: 'flex', flexDirection: 'column' }}>
              <CardMedia component="img" height="160" image={p.thumbnailUrl || ''} alt="" />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  <a href={p.link || '#'} style={{ color: 'inherit', textDecoration: 'none' }}>{p.name}</a>
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {p.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(p.technologies || []).map((t) => (
                    <Chip key={t} label={t} size="small" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <List>
          {filtered.map((p) => (
            <ListItem key={p.id} component="a" href={p.link || '#'} sx={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText primary={p.name} secondary={p.description} />
            </ListItem>
          ))}
        </List>
      )}

      {!loading && filtered.length === 0 && (
        <Typography color="text.secondary">No projects match your filters.</Typography>
      )}
    </Container>
  );
}
