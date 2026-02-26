import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function IntroductionPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 280,
            height: 280,
            mx: 'auto',
            mb: 3,
            bgcolor: 'action.hover',
            borderRadius: 2,
          }}
          aria-hidden
        />
        <Typography variant="h4" component="h1" gutterBottom>
          About me
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          [Placeholder: Add a short introduction about yourself, your background, and what you do as a developer.]
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          Skills
        </Typography>
        <Typography variant="body1" color="text.secondary">
          [Placeholder: List technologies and skills, e.g. JavaScript, React, Node.js, etc.]
        </Typography>
      </Box>
    </Container>
  );
}
