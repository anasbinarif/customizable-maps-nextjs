import {
    Dialog,
    DialogContent,
    Box,
    Button,
    TextField,
    Typography,
    Slide,
} from '@mui/material';
import { signIn } from 'next-auth/react';
import React, { useState, useEffect, useContext } from 'react';

import CustomSnackbar from './CustomSnackbar';
import { StyledTextField } from './CustomTextFields';

import LoadingSpinner from '@/components/LoadingSpinner';
import { ThemeContext } from '@/context/ThemeContext';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmModal({ open, handleClose, handleConfirm }) {
    const { darkMode } = useContext(ThemeContext);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: !darkMode
                            ? 'rgba(255, 255, 255, 0.5)'
                            : 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px',
                        padding: '0.5rem',
                        boxShadow: 'none',
                    },
                }}
            >
                <DialogContent>
                    <Box
                        sx={{
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography sx={{ marginBottom: '2rem', fontWeight: 'bold' }}>
              Are you sure you want to change your current location?
                        </Typography>
                        <Box
                            sx={{
                                alignSelf: 'flex-end',
                                display: 'flex',
                                gap: '1.5rem',
                                transition: 'all 0.5s ease-in-out',
                            }}
                        >
                            <Button
                                variant="text"
                                color="secondary"
                                onClick={handleClose}
                                sx={{ textTransform: 'none' }}
                            >
                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleConfirm}
                            >
                Confirm
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}
