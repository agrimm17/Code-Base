import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    severity: 'info',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setLoading(true);
    setSnack((s) => ({ ...s, open: false }));
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setSnack({
          open: true,
          severity: 'success',
          message: 'Message sent successfully.',
        });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setSnack({
          open: true,
          severity: 'error',
          message: data.error || 'Something went wrong.',
        });
      }
    } catch (_) {
      setSnack({
        open: true,
        severity: 'error',
        message: 'Network error. Is the server running?',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnack = () => setSnack((s) => ({ ...s, open: false }));

  return (
    <Container maxWidth='sm' sx={{ py: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Contact me
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
        Thanks for stopping by! If you have any questions or would like to get in touch, leave your email below and I'll get back to you as soon as possible!
      </Typography>
      <Box component='form' onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          required
          label='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin='normal'
        />
        <TextField
          fullWidth
          required
          type='email'
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin='normal'
        />
        <TextField
          fullWidth
          required
          multiline
          rows={4}
          label='Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          margin='normal'
        />
        <Button
          type='submit'
          variant='contained'
          fullWidth
          disabled={loading}
          sx={{ mt: 3 }}
        >
          {loading ? 'Sending…' : 'Send message'}
        </Button>
      </Box>
      <Snackbar
        open={snack.open}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
