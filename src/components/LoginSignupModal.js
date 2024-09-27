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

export default function LoginSignupModal({ open, handleClose, mode }) {
    const [isLogin, setIsLogin] = useState(true);
    const [showForgetPw, setShowForgetPw] = useState(false);
    const [loading, setLoading] = useState(false); // State to manage loading spinner
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
    const [forgetEmail, setForgetEmail] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        setIsLogin(mode === 'login');
        setShowForgetPw(false);
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
            setLoading(true);
            if (isLogin) {
                // Logging in the user
                const result = await signIn('credentials', {
                    redirect: false,
                    email: loginData.email,
                    password: loginData.password,
                });
                if (result.error) {
                    setSnackbarMessage(result.error);
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                    setLoading(false);
                } else {
                    // Successful login
                    setSnackbarMessage('Login successful!');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                    handleClose();
                    setLoading(false);
                }
            } else {
                try {
                    const res = await fetch('/api/registerUser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(signupData),
                    });

                    if (res.ok) {
                        setSnackbarMessage('Signup successful!');
                        setSnackbarSeverity('success');
                        setSnackbarOpen(true);
                        handleClose();
                        setIsLogin(true);
                        setLoading(false);
                    } else {
                        const data = await res.json();
                        setSnackbarMessage(data.message || 'Signup failed');
                        setSnackbarSeverity('error');
                        setSnackbarOpen(true);
                        setLoading(false);
                    }
                } catch (error) {
                    setSnackbarMessage('Signup failed. Please try again.');
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                    setLoading(false);
                }
            }
        }
    };

    const handleEmailVerification = async () => {
        setLoading(true);
        const email = forgetEmail;

        try {
            const res = await fetch('/api/sendResetPassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (res.ok) {
                setSnackbarMessage(data.message);
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            } else {
                setSnackbarMessage(data.message);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } catch (err) {
            console.log(err);
            setSnackbarMessage('We ran into an issue, please try again later..');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }

        setLoading(false);
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const toggleForgetPw = () => {
        setShowForgetPw(!showForgetPw);
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
                onClose={(e) => {
                    setShowForgetPw(false);
                    handleClose();
                }}
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: !darkMode
                            ? 'rgba(255, 255, 255, 0.5)'
                            : 'rgba(0, 0, 0, 0.5)', // Transparent background
                        backdropFilter: 'blur(10px)', // Blurred background
                        borderRadius: '20px',
                        padding: '2rem',
                        boxShadow: 'none',
                        // backgroundColor: "red",
                    },
                }}
            >
                <DialogContent>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant="h5"
                            sx={{ marginBottom: '2rem', fontWeight: 'bold' }}
                        >
                            {isLogin ? 'Login' : 'Sign Up'}
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '300px',
                                margin: '0 auto',
                                transition: 'all 0.5s ease-in-out',

                                '& > *:not(:last-child)': {
                                    marginBottom: '1.5rem',
                                },
                            }}
                        >
                            {!isLogin && (
                                <StyledTextField
                                    placeholder="Name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={signupData.name}
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, name: e.target.value })
                                    }
                                    // sx={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
                                />
                            )}
                            {showForgetPw ? (
                                <StyledTextField
                                    placeholder="Forget Email"
                                    variant="outlined"
                                    type="email"
                                    fullWidth
                                    required
                                    value={forgetEmail}
                                    onChange={(e) => setForgetEmail(e.target.value)}
                                />
                            ) : (
                                <>
                                    <StyledTextField
                                        placeholder="Email"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        value={isLogin ? loginData.email : signupData.email}
                                        onChange={(e) =>
                                            isLogin
                                                ? setLoginData({ ...loginData, email: e.target.value })
                                                : setSignupData({
                                                    ...signupData,
                                                    email: e.target.value,
                                                })
                                        }
                                    />
                                    <StyledTextField
                                        placeholder="Password"
                                        variant="outlined"
                                        type="password"
                                        fullWidth
                                        required
                                        value={isLogin ? loginData.password : signupData.password}
                                        onChange={(e) =>
                                            isLogin
                                                ? setLoginData({
                                                    ...loginData,
                                                    password: e.target.value,
                                                })
                                                : setSignupData({
                                                    ...signupData,
                                                    password: e.target.value,
                                                })
                                        }
                                    />
                                </>
                            )}
                            {!isLogin && (
                                <StyledTextField
                                    placeholder="Confirm Password"
                                    variant="outlined"
                                    type="password"
                                    fullWidth
                                    required
                                    value={signupData.confirmPassword}
                                    onChange={(e) =>
                                        setSignupData({
                                            ...signupData,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                />
                            )}
                            {showForgetPw ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleEmailVerification}
                                >
                  Confirm
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleLoginSignup}
                                >
                                    {isLogin ? 'Login' : 'Sign Up'}
                                </Button>
                            )}
                            {isLogin && (
                                <Button
                                    variant="text"
                                    color="secondary"
                                    onClick={toggleForgetPw}
                                    style={{
                                        textTransform: 'none',
                                        // backgroundColor: "red",
                                        marginBottom: '0',
                                    }}
                                >
                                    {showForgetPw ? 'Login?' : 'Forgot Password?'}
                                </Button>
                            )}
                            {!showForgetPw && (
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
                            )}
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
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Show snackbar in top right corner
            />
            {loading && <LoadingSpinner />}
        </>
    );
}
