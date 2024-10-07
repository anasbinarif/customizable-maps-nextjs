'use client';
import {
  Box,
  Container,
  List,
  ListItem,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';

export default function MiddleSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        // minHeight: "80vh",

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
        mb: '10rem',

        '@media only screen and (max-width: 600px)': {
          padding: '1rem',
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',

          '& svg': {
            position: 'absolute',
            top: -60,
            left: 0,
            zIndex: 1,
          },

          '& *': {
            position: 'relative',
            zIndex: 10,
          },
        }}
      >
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="100" fill={theme.palette.primary.main} />

          <circle
            cx="100"
            cy="100"
            r="90"
            fill={theme.palette.mode === 'dark' ? '#141414' : '#e6e9f0'}
          />
        </svg>
        <Typography variant="h3">Save Time and Boost Productivity</Typography>
        <List sx={{ alignSelf: 'center' }}>
          <ListItem>
            Streamline your marketing process with our user-friendly interface
          </ListItem>
          <ListItem>Create high-quality maps in minutes, not hours</ListItem>
        </List>
        <Box
          sx={{
            display: 'flex',
            // padding: '2rem',
            gap: '2rem',
            flexWrap: 'wrap',
            mt: '4rem',
            '& > .MuiBox-root': {
              display: 'flex',
              flexDirection: 'column',
              //   justifyContent: 'space-between',
              height: '20rem',
              alignItems: 'center',
              backgroundColor: 'primary.bgHero',
              boxShadow: 'var(--heroShadow)',
              padding: '2rem',
              borderRadius: '20px',
              width: {
                lg: 'calc(25% - 1.5rem)',
                sm: 'calc(50% - 1.5rem)',
                xs: 'calc(100% - 1.5rem)',
              },

              '& .MuiBox-root:first-child': {
                borderRadius: '50%',
                height: '4rem',
                width: '4rem',
                backgroundColor: 'primary.main',
              },

              '& .MuiTypography-h5': {
                m: '1rem 0',
                textWrap: 'nowrap',
                fontSize: { md: '1.2rem', xs: '1.2rem' },
                fontWeight: 'bold',
              },

              '& .MuiTypography-body1': {
                m: '1rem 0',
                // fontSize: { lg: '1rem', xs: '0.8rem' },
              },

              '& .MuiTypography-root': {
                textAlign: 'center',
              },
            },
          }}
        >
          <Box>
            <Box></Box>
            <Typography variant="h5">Interactive Mapping</Typography>
            <Typography sx={{}}>
              Allow clients to explore neighborhoods virtually and create
              printable maps for clients
            </Typography>
          </Box>
          <Box>
            <Box></Box>
            <Typography variant="h5">Customizable Themes</Typography>
            <Typography>
              Match maps to your branding for a cohesive look
            </Typography>
          </Box>
          <Box>
            <Box></Box>
            <Typography variant="h5">Data Integration</Typography>
            <Typography>
              Seamlessly incorporate local market material
            </Typography>
          </Box>
          <Box>
            <Box></Box>
            <Typography variant="h5">Multi-Platform Compatibility</Typography>
            <Typography>
              Share your maps across various digital platforms
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
