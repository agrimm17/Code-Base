import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import profileImage from '../assets/IMG_5202.jpeg';

export default function WelcomeOverlay({ open, onClose, onShowAgain }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogContent sx={{ pt: 3, pb: 1 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <Box
            sx={{
              width: 120,
              height: 120,
              minWidth: 120,
              borderRadius: 2,
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={profileImage}
              alt="Profile"
              sx={{
                width: 120,
                height: 120,
                objectFit: 'cover',
                objectPosition: 'center bottom',
                transform: 'scale(1.30)',
              }}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Welcome
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ mt: 0 }}>
              Thanks for stopping by! Have a look around, check out the projects, and feel free to get in touch if you&apos;d like to connect.
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'column', gap: 1, px: 3, pb: 2 }}>
        <Button variant="contained" onClick={onClose} fullWidth>
          Get started
        </Button>
        {onShowAgain && (
          <Typography
            component="button"
            variant="caption"
            onClick={onShowAgain}
            sx={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'text.secondary',
              textDecoration: 'underline',
              '&:hover': { color: 'text.primary' },
            }}
          >
            Show again (testing)
          </Typography>
        )}
      </DialogActions>
    </Dialog>
  );
}
