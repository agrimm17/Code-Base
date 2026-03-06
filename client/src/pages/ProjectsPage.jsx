import { useState, useEffect, useRef, useCallback } from 'react';
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

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [nameFilter, setNameFilter] = useState('');
  const [techFilter, setTechFilter] = useState([]);
  const [allTech, setAllTech] = useState([]);
  const carouselScrollRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const url = `${API_BASE}/api/projects`;
    // #region agent log
    fetch('http://127.0.0.1:7899/ingest/649faeab-f930-4e13-8236-1e6f32487b36', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Debug-Session-Id': 'ecd812',
      },
      body: JSON.stringify({
        sessionId: 'ecd812',
        location: 'ProjectsPage.jsx:fetch',
        message: 'Projects fetch start',
        data: { url, API_BASE },
        timestamp: Date.now(),
        hypothesisId: 'A',
      }),
    }).catch(() => {});
    // #endregion
    fetch(url)
      .then((res) => {
        // #region agent log
        fetch(
          'http://127.0.0.1:7899/ingest/649faeab-f930-4e13-8236-1e6f32487b36',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Debug-Session-Id': 'ecd812',
            },
            body: JSON.stringify({
              sessionId: 'ecd812',
              location: 'ProjectsPage.jsx:then(res)',
              message: 'Projects response',
              data: { ok: res.ok, status: res.status },
              timestamp: Date.now(),
              hypothesisId: 'B',
            }),
          },
        ).catch(() => {});
        // #endregion
        return res.json();
      })
      .then((data) => {
        // #region agent log
        fetch(
          'http://127.0.0.1:7899/ingest/649faeab-f930-4e13-8236-1e6f32487b36',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Debug-Session-Id': 'ecd812',
            },
            body: JSON.stringify({
              sessionId: 'ecd812',
              location: 'ProjectsPage.jsx:then(data)',
              message: 'Projects data parsed',
              data: {
                isArray: Array.isArray(data),
                length: Array.isArray(data) ? data.length : undefined,
                firstKey:
                  !Array.isArray(data) && data && typeof data === 'object'
                    ? Object.keys(data)[0]
                    : undefined,
              },
              timestamp: Date.now(),
              hypothesisId: 'C',
            }),
          },
        ).catch(() => {});
        // #endregion
        if (!cancelled && Array.isArray(data)) {
          setProjects(data);
          const techSet = new Set();
          data.forEach((p) =>
            (p.technologies || []).forEach((t) => techSet.add(t)),
          );
          setAllTech([...techSet].sort());
        }
      })
      .catch((err) => {
        // #region agent log
        fetch(
          'http://127.0.0.1:7899/ingest/649faeab-f930-4e13-8236-1e6f32487b36',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Debug-Session-Id': 'ecd812',
            },
            body: JSON.stringify({
              sessionId: 'ecd812',
              location: 'ProjectsPage.jsx:catch',
              message: 'Projects fetch error',
              data: { err: String(err) },
              timestamp: Date.now(),
              hypothesisId: 'D',
            }),
          },
        ).catch(() => {});
        // #endregion
        if (!cancelled) setProjects([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = projects.filter((p) => {
    const nameMatch =
      !nameFilter.trim() ||
      (p.name || '').toLowerCase().includes(nameFilter.trim().toLowerCase());
    const techMatch =
      techFilter.length === 0 ||
      techFilter.every((t) => (p.technologies || []).includes(t));
    return nameMatch && techMatch;
  });

  const carouselItems = filtered.length > 0 ? [...filtered, ...filtered, ...filtered] : [];

  const handleCarouselScroll = useCallback(() => {
    const el = carouselScrollRef.current;
    if (!el || filtered.length === 0) return;
    const segmentWidth = el.scrollWidth / 3;
    const { scrollLeft, clientWidth } = el;
    if (scrollLeft <= 0) {
      el.scrollLeft = segmentWidth;
    } else if (scrollLeft >= segmentWidth * 2 - clientWidth - 1) {
      el.scrollLeft = scrollLeft - segmentWidth;
    }
  }, [filtered.length]);

  useEffect(() => {
    const el = carouselScrollRef.current;
    if (viewMode !== 'carousel' || !el || filtered.length === 0) return;
    el.scrollLeft = el.scrollWidth / 3;
  }, [viewMode, filtered]);

  // #region agent log
  if (!loading && filtered.length === 0) {
    fetch('http://127.0.0.1:7899/ingest/649faeab-f930-4e13-8236-1e6f32487b36', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Debug-Session-Id': 'ecd812',
      },
      body: JSON.stringify({
        sessionId: 'ecd812',
        location: 'ProjectsPage.jsx:render',
        message: 'Empty filtered state',
        data: {
          projectsLength: projects.length,
          filteredLength: filtered.length,
          nameFilter,
          nameFilterLen: nameFilter.length,
          techFilterLen: techFilter ? techFilter.length : undefined,
        },
        timestamp: Date.now(),
        hypothesisId: 'E',
      }),
    }).catch(() => {});
  }
  // #endregion

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Projects (UNDER CONSTRUCTION)
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          mb: 3,
        }}
      >
        <TextField
          size='small'
          label='Search by name'
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        <FormControl size='small' sx={{ minWidth: 200 }}>
          <InputLabel>Technologies</InputLabel>
          <Select
            multiple
            value={techFilter}
            onChange={(e) => setTechFilter(e.target.value)}
            label='Technologies'
            renderValue={(selected) => selected.join(', ')}
          >
            {allTech.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, v) => v != null && setViewMode(v)}
          size='small'
        >
          <ToggleButton value='grid' aria-label='Grid'>
            <ViewModule />
          </ToggleButton>
          <ToggleButton value='carousel' aria-label='Carousel'>
            <ViewCarousel />
          </ToggleButton>
          <ToggleButton value='list' aria-label='List'>
            <ViewList />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loading ? (
        <Typography color='text.secondary'>Loading projects…</Typography>
      ) : viewMode === 'grid' ? (
        <Grid container spacing={2}>
          {filtered.map((p) => (
            <Grid item xs={12} sm={6} key={p.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component='img'
                  height='160'
                  image={p.thumbnailUrl || ''}
                  alt=''
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant='h6' component='h2' gutterBottom>
                    <a
                      href={p.link || '#'}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {p.name}
                    </a>
                  </Typography>
                  <Typography variant='body2' color='text.secondary' paragraph>
                    {p.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(p.technologies || []).map((t) => (
                      <Chip key={t} label={t} size='small' />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : viewMode === 'carousel' ? (
        <Box
          ref={carouselScrollRef}
          onScroll={handleCarouselScroll}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 2,
            pb: 2,
            minHeight: 320,
          }}
        >
          {carouselItems.map((p, i) => (
            <Card
              key={`${p.id}-${i}`}
              sx={{
                minWidth: 300,
                maxWidth: 300,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardMedia
                component='img'
                height='160'
                image={p.thumbnailUrl || ''}
                alt=''
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant='h6' component='h2' gutterBottom>
                  <a
                    href={p.link || '#'}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {p.name}
                  </a>
                </Typography>
                <Typography variant='body2' color='text.secondary' paragraph>
                  {p.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(p.technologies || []).map((t) => (
                    <Chip key={t} label={t} size='small' />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <List>
          {filtered.map((p) => (
            <ListItem
              key={p.id}
              component='a'
              href={p.link || '#'}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemText primary={p.name} secondary={p.description} />
            </ListItem>
          ))}
        </List>
      )}

      {!loading && filtered.length === 0 && (
        <Typography color='text.secondary'>
          No projects match your filters.
        </Typography>
      )}
    </Container>
  );
}
