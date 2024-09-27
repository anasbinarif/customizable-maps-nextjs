"use client";
import {signOut, useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Users from './Users/page';
import Locations from './Locations/page';
import Profile from './profile/page';
import AlertSnackbar from "@/components/AlertSnackbar";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('users');
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    const handleOpenAlert = (severity, message) => {
        setAlertSeverity(severity);
        setAlertMessage(message);
        setAlertOpen(true);
    };

    useEffect(() => {
        if (status === 'loading') return;
        if (!session) {
            router.push('/admin/signin');
        } else if (!session.user.isAdmin) {
            router.push('/admin/signin');
            handleOpenAlert("error", "not an admin!")
        } else {
            setLoading(false);
        }
    }, [session, status, router]);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const handleSignOut = () => {
        signOut();
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" onClick={toggleDrawer} edge="start">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Admin Dashboard
                    </Typography>
                    <Button color="inherit" onClick={handleSignOut} startIcon={<ExitToAppIcon />}>
                        Sign Out
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                open={drawerOpen}
                sx={{
                    width: drawerOpen ? 240 : 60,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerOpen ? 240 : 60,
                        boxSizing: 'border-box',
                        transition: 'width 0.3s',
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem button onClick={() => handleTabChange('users')}>
                            <ListItemIcon><PeopleIcon /></ListItemIcon>
                            {drawerOpen && <ListItemText primary="Users" />}
                        </ListItem>
                        <ListItem button onClick={() => handleTabChange('profile')}>
                            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                            {drawerOpen && <ListItemText primary="Profile" />}
                        </ListItem>
                        <ListItem button onClick={() => handleTabChange('locations')}>
                            <ListItemIcon><LocationOnIcon /></ListItemIcon>
                            {drawerOpen && <ListItemText primary="Locations" />}
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={handleSignOut}>
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            {drawerOpen && <ListItemText primary="Sign Out" />}
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {selectedTab === 'users' && <Users />}
                {selectedTab === 'locations' && <Locations />}
                {selectedTab === 'profile' && <Profile />}
            </Box>
        </Box>
            <AlertSnackbar
                open={alertOpen}
                onClose={handleCloseAlert}
                severity={alertSeverity}
                message={alertMessage}
            />
        </>
    );
}
