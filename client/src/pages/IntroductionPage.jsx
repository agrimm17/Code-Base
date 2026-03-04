import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const journeyCopy =
  "I began as a self-taught developer. I enjoy learning new technologies and finding efficiencies in my work, which has helped me grow to where I am now. \n\n I believe AI is a tool, not a replacement. It can be an excellent teacher, but at the end of the day, we are responsible for our code.";

const aboutCopy =
  "I'm a full stack software engineer with a central focus on JavaScript, React and Redux for the frontend, Node.js/Express and PostgreSQL on the backend. I'm also experienced in HTML and S/CSS, and I'm always looking for new techs to explore! ";

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
        <Typography variant="body1" color="text.secondary">
          {journeyCopy}
        </Typography>
      </Box>
    </Box>
  );
}
