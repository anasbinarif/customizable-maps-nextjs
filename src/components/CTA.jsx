import {Box, Button, Container, Typography} from '@mui/material';

export default function CTA() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '2rem',

                '@media only screen and (max-width: 600px)': {
                    padding: '1rem',
                },
            }}
        >
            <Container
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        marginBottom: '2rem',
                    }}
                >
            Create, Customize and Print Your Map Now
                </Typography>
                <Typography variant="body1">
          We come to you at your location to service your vehicle
                    <br />
          The specilaist in steam cleaning
                </Typography>
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
            Get Started
                </Button>
            </Container>
        </Box>
    );
}
