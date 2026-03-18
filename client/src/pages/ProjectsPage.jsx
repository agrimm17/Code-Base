import { useState, useRef, useCallback, useEffect } from 'react';
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

import { projects as projectsData } from '../data/projects';

function getAllTech(projects) {
  const techSet = new Set();
  projects.forEach((p) =>
    (p.technologies || []).forEach((t) => techSet.add(t)),
  );
  return [...techSet].sort();
}

export default function ProjectsPage() {
  const [projects] = useState(projectsData);
  const [viewMode, setViewMode] = useState('grid');
  const [nameFilter, setNameFilter] = useState('');
  const [techFilter, setTechFilter] = useState([]);
  const [allTech] = useState(() => getAllTech(projectsData));
  const carouselScrollRef = useRef(null);

  const filtered = projects.filter((p) => {
    const nameMatch =
      !nameFilter.trim() ||
      (p.name || '').toLowerCase().includes(nameFilter.trim().toLowerCase());
    const techMatch =
      techFilter.length === 0 ||
      techFilter.every((t) => (p.technologies || []).includes(t));
    return nameMatch && techMatch;
  });

  const isCarouselScrollable = filtered.length > 3;
  const carouselItems = isCarouselScrollable ? [...filtered, ...filtered, ...filtered] : filtered;

  const handleCarouselScroll = useCallback(() => {
    const el = carouselScrollRef.current;
    if (!el || !isCarouselScrollable) return;
    const segmentWidth = el.scrollWidth / 3;
    const { scrollLeft, clientWidth } = el;
    if (scrollLeft <= 0) {
      el.scrollLeft = segmentWidth;
    } else if (scrollLeft >= segmentWidth * 2 - clientWidth - 1) {
      el.scrollLeft = scrollLeft - segmentWidth;
    }
  }, [isCarouselScrollable]);

  useEffect(() => {
    const el = carouselScrollRef.current;
    if (viewMode !== 'carousel' || !el || !isCarouselScrollable) return;
    el.scrollLeft = el.scrollWidth / 3;
  }, [viewMode, filtered, isCarouselScrollable]);

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Projects
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

      {viewMode === 'grid' ? (
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
          onScroll={isCarouselScrollable ? handleCarouselScroll : undefined}
          sx={{
            display: 'flex',
            overflowX: isCarouselScrollable ? 'auto' : 'hidden',
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

      {filtered.length === 0 && (
        <Typography color='text.secondary'>
          No projects match your filters.
        </Typography>
      )}
    </Container>
  );
}
