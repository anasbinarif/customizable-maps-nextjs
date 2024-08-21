'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Container, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import MapIcon from '@mui/icons-material/Map';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { useSession, signOut } from "next-auth/react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import LoginSignupModal from './LoginSignupModal';
import ChangePasswordModal from './ChangePasswordModal';  // Import the modal component

export default function Navbar() {
    const { data: session, status } = useSession();
    const [openModal, setOpenModal] = useState(false);
    const [modalMode, setModalMode] = useState('login');
    const [anchorEl, setAnchorEl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);

    const handleOpenModal = (mode) => {
        setModalMode(mode);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        setLoading(true);
        await signOut();
        handleMenuClose();
        setLoading(false);
    };

    const handleChangePassword = () => {
        setChangePasswordOpen(true);
        handleMenuClose();
    };

    const handleSavePassword = async (currentPassword, newPassword) => {
        const res = await fetch('/api/changePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        if (!res.ok) {
            throw new Error('Failed to change password');
        }
    };

    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(242,242,242,1) 50%, rgba(255,255,255,1) 100%)',
                    borderRadius: '20px',
                    width: 'auto',
                    maxWidth: "90%",
                    margin: '0rem auto',
                    boxShadow: "none",
                    top: 0,
                    zIndex: 1100,
                }}
            >
                <Container
                    maxWidth={false}
                    disableGutters
                    sx={{
                        padding: '0 !important',
                        width: '100%',
                    }}
                >
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 1rem' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h6" component="div" sx={{ color: '#333', fontWeight: 'bold' }}>
                                Customizable Maps
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1, gap: '1.5rem', alignItems: 'center' }}>
                            <Link href="/" passHref>
                                <Button sx={{ display: 'flex', alignItems: 'center', color: '#000', textDecoration: 'none' }}>
                                    <HomeIcon sx={{ marginRight: '0.5rem', color: '#000' }} />
                                    <Typography>
                                        Home
                                    </Typography>
                                </Button>
                            </Link>
                            <Link href="/user/displayUserMap" passHref>
                                <Button sx={{ display: 'flex', alignItems: 'center', color: '#000', textDecoration: 'none' }}>
                                    <PinDropIcon sx={{ marginRight: '0.5rem', color: '#000' }} />
                                    Your Maps
                                </Button>
                            </Link>
                            <Link href="/user/createUserMaps">
                                <Button sx={{ display: 'flex', alignItems: 'center', color: '#000', textDecoration: 'none' }}>
                                    <MapIcon sx={{ marginRight: '0.5rem', color: '#000' }} />
                                    Create
                                </Button>
                            </Link>
                            <Link href="/blogs" passHref>
                                <Button sx={{ display: 'flex', alignItems: 'center', color: '#000', textDecoration: 'none' }}>
                                    <ArticleIcon sx={{ marginRight: '0.5rem', color: '#000' }} />
                                    Blogs
                                </Button>
                            </Link>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {status === "authenticated" ? (
                                <>
                                    <IconButton onClick={handleMenu} color="inherit">
                                        {session.user.image ? (
                                            <Avatar alt={session.user.name} src={session.user.image} />
                                        ) : (
                                            <AccountCircleIcon sx={{ color: '#000' }} />
                                        )}
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem disabled>
                                            <Typography variant="subtitle1">
                                                {session.user.email}
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <Button sx={{ color: '#333', textTransform: 'none' }} onClick={() => handleOpenModal('login')}>
                                        Log In
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#000',
                                            borderRadius: '10px',
                                            padding: '0.5rem 1.5rem',
                                            textTransform: 'none',
                                        }}
                                        onClick={() => handleOpenModal('signup')}
                                    >
                                        Sign Up
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <LoginSignupModal open={openModal} handleClose={handleCloseModal} mode={modalMode} />
            <ChangePasswordModal
                open={changePasswordOpen}
                onClose={() => setChangePasswordOpen(false)}
                onSave={handleSavePassword}
            />
            {loading && <LoadingSpinner />}
        </>
    );
}
