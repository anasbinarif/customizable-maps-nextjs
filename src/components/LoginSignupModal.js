import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Box, Button, TextField, Typography, Slide } from '@mui/material';
import CustomSnackbar from './CustomSnackbar';
import { signIn } from "next-auth/react";
import LoadingSpinner from "@/components/LoadingSpinner";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginSignupModal({ open, handleClose, mode }) {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);  // State to manage loading spinner
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    useEffect(() => {
        setIsLogin(mode === 'login');
        setLoginData({ email: '', password: '' });
        setSignupData({ name: '', email: '', password: '', confirmPassword: '' });
        setSnackbarOpen(false);
    }, [mode]);

    const validate = () => {
        let isValid = true;
        let message = '';

        if (isLogin) {
            if (!loginData.email) {
                message = 'Email is required';
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
                message = 'Email is not valid';
                isValid = false;
            } else if (!loginData.password) {
                message = 'Password is required';
                isValid = false;
            }
        } else {
            if (!signupData.name) {
                message = 'Name is required';
                isValid = false;
            } else if (!signupData.email) {
                message = 'Email is required';
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
                message = 'Email is not valid';
                isValid = false;
            } else if (!signupData.password) {
                message = 'Password is required';
                isValid = false;
            } else if (signupData.password !== signupData.confirmPassword) {
                message = 'Passwords do not match';
                isValid = false;
            }
        }

        if (!isValid) {
            setSnackbarMessage(message);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }

        return isValid;
    };

    const handleLoginSignup = async () => {
        if (validate()) {
            setLoading(true)
            if (isLogin) {
                // Logging in the user
                const result = await signIn("credentials", {
                    redirect: false,
                    email: loginData.email,
                    password: loginData.password,
                });
                if (result.error) {
                    setSnackbarMessage(result.error);
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                    setLoading(false)
                } else {
                    // Successful login
                    setSnackbarMessage('Login successful!');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                    handleClose();
                    setLoading(false)
                }
            } else {
                try {
                    const res = await fetch("/api/registerUser", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(signupData),
                    });

                    if (res.ok) {
                        setSnackbarMessage('Signup successful!');
                        setSnackbarSeverity('success');
                        setSnackbarOpen(true);
                        handleClose();
                        setIsLogin(true);
                        setLoading(false)
                    } else {
                        const data = await res.json();
                        setSnackbarMessage(data.message || 'Signup failed');
                        setSnackbarSeverity('error');
                        setSnackbarOpen(true);
                        setLoading(false)
                    }
                } catch (error) {
                    setSnackbarMessage('Signup failed. Please try again.');
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                    setLoading(false)
                }
            }
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

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
                        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent background
                        backdropFilter: 'blur(10px)', // Blurred background
                        borderRadius: '20px',
                        padding: '2rem',
                        boxShadow: 'none', // Remove the box shadow for a clean look
                    }
                }}
            >
                <DialogContent>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ marginBottom: '2rem', fontWeight: 'bold' }}>
                            {isLogin ? 'Login' : 'Sign Up'}
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem',
                                width: '300px',
                                margin: '0 auto',
                                transition: 'all 0.5s ease-in-out',
                            }}
                        >
                            {!isLogin && (
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={signupData.name}
                                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                                />
                            )}
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                required
                                value={isLogin ? loginData.email : signupData.email}
                                onChange={(e) =>
                                    isLogin
                                        ? setLoginData({ ...loginData, email: e.target.value })
                                        : setSignupData({ ...signupData, email: e.target.value })
                                }
                                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                required
                                value={isLogin ? loginData.password : signupData.password}
                                onChange={(e) =>
                                    isLogin
                                        ? setLoginData({ ...loginData, password: e.target.value })
                                        : setSignupData({ ...signupData, password: e.target.value })
                                }
                                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                            />
                            {!isLogin && (
                                <TextField
                                    label="Confirm Password"
                                    variant="outlined"
                                    type="password"
                                    fullWidth
                                    required
                                    value={signupData.confirmPassword}
                                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                                />
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleLoginSignup}
                            >
                                {isLogin ? 'Login' : 'Sign Up'}
                            </Button>
                            <Button
                                variant="text"
                                color="secondary"
                                onClick={toggleForm}
                                sx={{ textTransform: 'none' }}
                            >
                                {isLogin
                                    ? "Don't have an account? Sign Up"
                                    : 'Already have an account? Login'}
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Reusable CustomSnackbar component */}
            <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                handleClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  // Show snackbar in top right corner
            />
            {loading && <LoadingSpinner />}
        </>
    );
}
