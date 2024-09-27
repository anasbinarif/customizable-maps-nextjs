import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import {Box, Container, Grid, Link, Typography} from '@mui/material';
import React from 'react';

export default function Footer() {
  return (
    <Box
      sx={{
        borderTop: '1px solid #e0e0e0',
        padding: '2rem',
        backgroundImage: 'var(--footer-bg)',
      }}
    >
      <Container maxWidth="xxl">
        <Grid container spacing={3} alignItems="center">
          {/* Logo and Company Info */}
          <Grid item xs={12} sm={4} sx={{ display: 'flex', gap: '1.5rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  backgroundColor: '#64d8cb',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '0.5rem',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: 'primary.main', fontWeight: 'bold' }}
                >
                  L
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{ color: 'primary.main', fontWeight: 'bold' }}
              >
                LOGO
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginTop: '0.5rem' }}
            >
              © 2023 Company &nbsp;&nbsp;{' '}
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
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}
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
            xs={12}
            sm={4}
            sx={{ textAlign: { xs: 'center', sm: 'right' } }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'flex-end' },
                gap: '1rem',
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
                Contact
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
