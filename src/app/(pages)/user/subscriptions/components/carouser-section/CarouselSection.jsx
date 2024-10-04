'use client';
import { Box, Container, useTheme } from '@mui/material';
import React from 'react';

import SubscriptionTab from '@/app/(pages)/user/subscriptions/components/subscription-tab/SubscriptionTab';

const CarouselSection = ({ packages }) => {
  const theme = useTheme();
  const color = theme.palette.primary.main;

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
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: '5rem',
            padding: '5rem',
            width: '100%',
            // minWidth: '1000px',
            // overflowX: 'auto',
            // whiteSpace: 'nowrap',

            '@media only screen and (max-width: 1250px)': {
              gap: '3rem',
              padding: '2.5rem',
            },
            '@media only screen and (max-width: 1100px)': {
              gap: '1rem',
              padding: '1.5rem',
              flexWrap: 'wrap',
            },
          }}
        >
          {packages &&
            packages.map((pkg, index) => (
              <SubscriptionTab
                key={index}
                pkg={pkg}
                index={index}
                color={color}
              />
            ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CarouselSection;
