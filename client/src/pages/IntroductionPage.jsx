import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const journeyCopy =
  "I started my path as a self-taught developer. This background taught me how to research, experiment, and grow independently. I frequently use AI as a tool for learning and productivity, but not as a substitute for understanding. At the end of the day, we are responsible for the quality and integrity of the code we write.";

const aboutCopy =
  "I’m a full-stack software engineer and SuiteScript certified developer with a strong focus on JavaScript. On the frontend, I primarily work with React and Redux, and on the backend I work with Node.js, Express, and PostgreSQL. I’m also comfortable working with HTML and modern CSS, and I’m always exploring new technologies to help me build better software.";

const goalsCopy = "At this stage in my career, I’m focused on deepening my understanding of the systems I work with and contributing in consistent, meaningful ways. I value any opportunities where I can learn from experienced developers, find solutions to my problems, and improve the quality of the products I help build. I aim to grow as an engineer and deliver reliable work."

const valuesCopy = "I believe great software comes from great teams. Organization, transparency, and collaboration make it possible for teams to function effectively, and are all values I hold highly. The best work happens when everyone understands the goal, communicates openly, and supports each other along the way."
export default function IntroductionPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: { xs: 'calc(100vh - 120px)', sm: 'calc(100vh - 128px)' },
        py: 4,
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About me
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {aboutCopy}
        </Typography>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 3 }}>
          My Journey
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {journeyCopy}
        </Typography>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 3 }}>
          My Goals
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {goalsCopy}
        </Typography>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 3 }}>
          My Values
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {valuesCopy}
        </Typography>
      </Box>
    </Box>
  );
}
