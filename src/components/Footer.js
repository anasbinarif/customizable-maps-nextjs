import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export default function Footer() {
  return (
    <Box
      sx={{
        borderTop: '1px solid #e0e0e0',
        padding: '2rem',
        backgroundImage: 'var(--footer-bg)',
        width: '100%',
        // position: 'absolute',
        // right: 0,
        // bottom: 0,
        // left: 0,
      }}
    >
      <Container maxWidth="xxl">
        <Grid container spacing={3} alignItems="center">
          {/* Logo and Company Info */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#64d8cb',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '0.5rem',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/img/mapmaven.jpeg"
                  width={50}
                  height={50}
                  alt="Map Mavens logo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              {/* <Typography
                  variant="h6"
                  sx={{ color: 'primary.main', fontWeight: 'bold' }}
                >
                  L
                </Typography>
              <Typography
                variant="h6"
                sx={{ color: 'primary.main', fontWeight: 'bold' }}
              >
                LOGO
              </Typography> */}
            </Box>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginTop: '0.5rem' }}
            >
              © 2024 All Rights Reserved &nbsp;&nbsp;{' '}
              <Link href="#" sx={{ textDecoration: 'none', color: 'inherit' }}>
                Terms
              </Link>{' '}
              &nbsp;&nbsp;{' '}
              <Link href="#" sx={{ textDecoration: 'none', color: 'inherit' }}>
                Privacy
              </Link>
            </Typography>
          </Grid>

          {/* Social Media Icons */}
          <Grid item xs={12} sm={6} md={4} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: {
                  xl: 'center',
                  lg: 'center',
                  md: 'center',
                  sm: 'flex-end',
                  xs: 'center',
                },
                gap: '1rem',
              }}
            >
              <Link href="#" color="inherit">
                <TwitterIcon sx={{ color: 'primary.main' }} />
              </Link>
              <Link href="#" color="inherit">
                <FacebookIcon sx={{ color: 'primary.main' }} />
              </Link>
              <Link href="#" color="inherit">
                <InstagramIcon sx={{ color: 'primary.main' }} />
              </Link>
            </Box>
          </Grid>

          {/* Navigation Links */}
          <Grid
            item
            md={4}
            sm={12}
            xs={12}
            sx={{ textAlign: { xs: 'center', sm: 'right' } }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'center', md: 'flex-end' },
                gap: '1rem',

                '& *': {
                  textWrap: 'nowrap',
                  fontSize: {
                    xl: '1rem',
                    lg: '1rem',
                    md: '0.8rem',
                    sm: '0.8rem',
                    xs: '0.8rem',
                  },
                },
              }}
            >
              <Link
                href="/"
                color="inherit"
                sx={{ textDecoration: 'none', color: 'primary.main' }}
              >
                Home
              </Link>
              <Link
                href="/user/displayUserMap"
                color="inherit"
                sx={{ textDecoration: 'none', color: 'primary.main' }}
              >
                Your Maps
              </Link>
              <Link
                href="/user/createUserMaps"
                color="inherit"
                sx={{ textDecoration: 'none', color: 'primary.main' }}
              >
                Map Editor
              </Link>
              <Link
                href="/user/contact"
                color="inherit"
                sx={{ textDecoration: 'none', color: 'primary.main' }}
              >
                Contact
              </Link>
              <Link
                href="/user/subscriptions"
                color="inherit"
                sx={{ textDecoration: 'none', color: 'primary.main' }}
              >
                Get Started
              </Link>
              {/* <Link
                href="#"
                color="inherit"
                sx={{ textDecoration: "none", color: "primary.main" }}
              >
                Blog
              </Link> */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
