'use client';
import { Button, FormControl, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';

import AlertSnackbar from '@/components/AlertSnackbar';
import { StyledTextField } from '@/components/CustomTextFields';

export default function Form() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSnackbarOpen(false);

    if (!formData.name || !formData.email || !formData.message) {
      setSnackbarMessage('Please fill out all the fields');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);

      return;
    }

    try {
      const response = await fetch('/api/sendContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setSnackbarMessage(data.message);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setSnackbarMessage('Failed to send message. Please try again later.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <FormControl
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: theme.spacing(4),
          width: '100%',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: {
              xl: '3rem',
              lg: '3rem',
              md: '3rem',
              sm: '3rem',
              xs: '2rem',
            },
          }}
        >
          Contact Us
        </Typography>
        <StyledTextField
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <StyledTextField
          placeholder="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <StyledTextField
          placeholder="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          required
        />
        <Button
          type="submit"
          fullWidth
          sx={{
            width: '100%',
            backgroundColor: 'transparent',
            color: 'primary.main',
            border: `1px solid`,
            borderColor: (theme) => theme.palette.primary.main,
            boxShadow: 'none',
            borderRadius: '20px',
            '&:hover': {
              backgroundColor: 'primary.main',
              color: 'white',
              boxShadow: 'none',
            },
          }}
        >
          Submit
        </Button>
      </FormControl>
      <AlertSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </>
  );
}
