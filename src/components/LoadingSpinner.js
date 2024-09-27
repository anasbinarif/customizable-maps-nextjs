import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Full viewport height
                width: '100%',   // Full width
                position: 'absolute', // Position it above all other content
                top: 0,
                left: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.7)', // Optional: Add a translucent background
                zIndex: 9999, // Ensure it's above other components
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default LoadingSpinner;
