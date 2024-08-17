"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import AlertSnackbar from "@/components/AlertSnackbar";
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import MapDetailsModal from './MapDetailsModal';
import UserMapsCard from './UserMapsCard';
import Link from 'next/link'; // Import Link for navigation

const DisplayUserMaps = () => {
    const { data: session, status } = useSession();
    const [maps, setMaps] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');
    const [selectedMap, setSelectedMap] = useState(null);

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    const handleOpenAlert = (severity, message) => {
        setAlertSeverity(severity);
        setAlertMessage(message);
        setAlertOpen(true);
    };

    const handleOpenDetails = (map) => {
        setSelectedMap(map);
    };

    const handleCloseDetails = () => {
        setSelectedMap(null);
    };

    useEffect(() => {
        const fetchUserMaps = async () => {
            if (status === "authenticated") {
                try {
                    const response = await fetch(`/api/getUserMaps?email=${session.user.email}`);
                    if (response.ok) {
                        const data = await response.json();
                        setMaps(data.maps);
                    } else {
                        console.error('Failed to fetch user maps.');
                    }
                } catch (error) {
                    console.error('Error fetching user maps:', error);
                }
            }
        };
        fetchUserMaps();
    }, [status]);

    return (
        <Container sx={{ mt: 4 }}>
            {maps.length > 0 ? (
                <Grid container spacing={3}>
                    {maps.map(map => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={map.id}>
                            <UserMapsCard map={map} onOpenDetails={handleOpenDetails} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        No maps found.
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        Go to the Create section to create your first map.
                    </Typography>
                    <Link href="/createUserMaps" passHref>
                        <Button variant="contained" color="primary">
                            Create Your First Map
                        </Button>
                    </Link>
                </Box>
            )}
            <AlertSnackbar
                open={alertOpen}
                onClose={handleCloseAlert}
                severity={alertSeverity}
                message={alertMessage}
            />
            {selectedMap && (
                <MapDetailsModal
                    open={!!selectedMap}
                    onClose={handleCloseDetails}
                    map={selectedMap}
                />
            )}
        </Container>
    );
};

export default DisplayUserMaps;
