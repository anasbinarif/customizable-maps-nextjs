import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  Typography,
} from '@mui/material';

export default function CTA() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        // minHeight: "80vh",

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',

        '@media only screen and (max-width: 600px)': {
          padding: '1rem',
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'primary.bgHero',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: 'var(--heroShadow)',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: {
              xl: '3rem',
              lg: '3rem',
              md: '3rem',
              sm: '2.5rem',
              xs: '1.8rem',
            },
            textAlign: 'center',
            marginBottom: '2rem',
            '& span': {
              display: 'block',
            },
          }}
        >
          Elevate Your Property Marketing Today
        </Typography>
        <Box>
          <Typography variant="body1">
            Join the growing community of top-performing agents who use Map
            Mavens to:
          </Typography>
          <List
            sx={{
              listStyle: 'disc',
              '& .MuiListItem-root': {
                display: 'flex',
                gap: '0.5rem',
                pl: 0,

                '& svg': { color: 'primary.main' },
              },
            }}
          >
            <ListItem>
              <CheckCircleIcon />
              <Typography>Close deals faster</Typography>
            </ListItem>
            <ListItem>
              <CheckCircleIcon />
              <Typography>Attract more qualified leads</Typography>
            </ListItem>
            <ListItem>
              <CheckCircleIcon />
              <Typography>
                Establish themselves as neighbourhood experts
              </Typography>
            </ListItem>
          </List>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: '10px',
            textTransform: 'none',
            marginTop: '2rem',
            fontSize: '1.5rem',
          }}
        >
          Start your Free Trial
        </Button>
      </Container>
    </Box>
  );
}
