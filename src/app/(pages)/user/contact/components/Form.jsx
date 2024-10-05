'use client';
import { Button, FormControl, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';

import { StyledTextField } from '@/components/CustomTextFields';

export default function Form({ onSubmit }) {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <FormControl
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing(4),
        width: '100%',
        // maxWidth: "500px",
        // margin: "0 auto",
        // padding: theme.spacing(3),
        boxSizing: 'border-box',
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
            // fontWeight: "bold",
            backgroundColor: 'primary.main',
            color: 'white',
            boxShadow: 'none',
          },
        }}
      >
        Submit
      </Button>
    </FormControl>
  );
}
