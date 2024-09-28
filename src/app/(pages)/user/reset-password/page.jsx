'use client';
import {Box, Button, Typography,} from '@mui/material';
import {useSearchParams} from 'next/navigation';
import {useState} from 'react';

import CustomSnackbar from '@/components/CustomSnackbar';
import {StyledTextField} from '@/components/CustomTextFields';

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await res.json();

      if (res.ok) {
        setSnackbarMessage(data.message);
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage(data.message);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (err) {
      setSnackbarMessage('We ran into an issue, please try again later..');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        // alignItems: "center",
        margin: '0 5rem',
      }}
    >
      <Box sx={{ width: '100%', marginTop: '10rem' }}>
        <Typography variant="h2">Reset Password</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            marginTop: '4rem',
            display: 'flex',
            alignItems: 'center',
            // backgroundColor: "red",
            gap: '1rem',
            width: '50%',
          }}
        >
          <StyledTextField
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{
              width: '50%',
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'primary.main',
              borderRadius: '10px',
            }}
            type="submit"
          >
            Reset Password
          </Button>
        </Box>
      </Box>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </Box>
  );
}
