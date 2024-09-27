import React from 'react';
import {Box, CircularProgress} from '@mui/material';

const LoadingSpinner = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 9999,
            }}
        >
            <CircularProgress color="inherit" />
        </Box>
    );
};

export default LoadingSpinner;
