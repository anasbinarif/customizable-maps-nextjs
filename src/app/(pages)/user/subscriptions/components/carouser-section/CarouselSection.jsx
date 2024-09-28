'use client';
import {Box, Container, useTheme} from '@mui/material';
import React, {useContext} from 'react';

import SubscriptionTab from '@/app/(pages)/user/subscriptions/components/subscription-tab/SubscriptionTab';
import {ThemeContext} from '@/context/ThemeContext';

const CarouselSection = ({packages}) => {
  const { darkMode } = useContext(ThemeContext);
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
            alignItems: 'center',
            gap: '5rem',
            padding: '5rem',
            width: '100%',
            minWidth: '700px',
          }}
        >
          {packages && packages.map((pkg, index) => (
            <SubscriptionTab key={index} pkg={pkg} index={index} color={color} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CarouselSection;