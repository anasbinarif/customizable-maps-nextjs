'use client';
import { Box, Container, useTheme } from '@mui/material';
import { Map, Marker } from 'pigeon-maps';
import React from 'react';

import Form from './components/Form';

export default function CarouselSection() {
  const theme = useTheme();
  const position = [52.212992, 5.27937];

  const handleFormSubmit = () => {
    // console.log('Form submitted with data:', data);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
        '@media only screen and (max-width: 600px)': {
          padding: '1rem',
        },
      }}
    >
      <Container
        style={{
          padding: 0,
        }}
        sx={{
          display: 'flex',
          backgroundColor: 'primary.bgHero',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: 'var(--heroShadow)',
        }}
      >
        <Box
          sx={{
            padding: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            flex: 1,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              clipPath: 'polygon(0 0, 100% 0%, 93% 100%, 0% 100%)',
            }}
          >
            <Map
              center={position}
              zoom={15}
              height={600}
              width={600}
              style={{ height: '100%' }}
            >
              <Marker anchor={position} payload={1} />
            </Map>
          </Box>
        </Box>
        <Box
          sx={{
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'hidden',
            flex: 1,
          }}
        >
          <Box
            sx={{
              height: '100%',
              padding: '2rem 1rem',
              width: '100%',
            }}
          >
            <Form onSubmit={handleFormSubmit} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
