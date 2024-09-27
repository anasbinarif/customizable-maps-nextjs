'use client';

import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { getSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function AdminSignIn() {
    const router = useRouter();

    useEffect(() => {
        const checkAdminSession = async () => {
            const session = await getSession();
            if (session && session.user.isAdmin) {
                router.push('/admin');
            }
        };

        checkAdminSession();
    }, [router]);

    const handleSignIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl: '/admin',
        }).then(({ ok }) => {
            if (ok) {
                router.push('/admin');
            } else {
                alert('Invalid credentials or not an admin');
            }
        });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Box
                component="form"
                onSubmit={handleSignIn}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Typography variant="h4">Admin Sign In</Typography>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Sign In
                </Button>
            </Box>
        </Container>
    );
}
