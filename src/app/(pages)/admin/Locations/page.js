"use client";
import React, {useEffect, useState} from 'react';
import {Box, Grid, Typography} from '@mui/material';
import MapDetailsModal from '../../user/displayUserMap/components/MapDetailsModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import UserMapsCard from '../../user/displayUserMap/components/UserMapsCard';

const Locations = () => {
    const [groupedMaps, setGroupedMaps] = useState({});
    const [selectedMap, setSelectedMap] = useState(null);
    const [mapToDelete, setMapToDelete] = useState(null);

    useEffect(() => {
        const fetchMaps = async () => {
            try {
                const response = await fetch('/api/admin/getAllMaps');
                const data = await response.json();

                // Group maps by user email, including username in the display
                const grouped = data.maps.reduce((acc, map) => {
                    const userKey = `${map.user.name || 'N/A'} (${map.user.email})`;
                    if (!acc[userKey]) {
                        acc[userKey] = [];
                    }
                    acc[userKey].push(map);
                    return acc;
                }, {});

                setGroupedMaps(grouped);
            } catch (error) {
                console.error("Failed to fetch maps:", error);
            }
        };

        fetchMaps();
    }, []);

    const handleOpenDetails = (map) => {
        setSelectedMap(map);
    };

    const handleCloseDetails = () => {
        setSelectedMap(null);
    };

    const handleDeletePrompt = (mapId) => {
        setMapToDelete(mapId);
    };

    const handleDeleteConfirm = async () => {
        try {
            await fetch(`/api/admin/deleteUserMap/${mapToDelete}`, {
                method: 'DELETE',
            });
            const updatedGroupedMaps = { ...groupedMaps };
            Object.keys(updatedGroupedMaps).forEach(userKey => {
                updatedGroupedMaps[userKey] = updatedGroupedMaps[userKey].filter(map => map.id !== mapToDelete);
                if (updatedGroupedMaps[userKey].length === 0) {
                    delete updatedGroupedMaps[userKey];
                }
            });
            setGroupedMaps(updatedGroupedMaps);
            setMapToDelete(null);  // Close the modal after deletion
        } catch (error) {
            console.error(`Failed to delete map with ID: ${mapToDelete}`, error);
        }
    };

    const handleDeleteCancel = () => {
        setMapToDelete(null);
    };

    return (
        <>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Manage Locations
                </Typography>
                {Object.keys(groupedMaps).map(userKey => (
                    <Box key={userKey} sx={{ mb: 4 }}>
                        <Typography variant="h6">
                            {`User: ${userKey}`}
                        </Typography>
                        <Grid container spacing={2}>
                            {groupedMaps[userKey].map(map => (
                                <Grid item xs={12} sm={6} md={4} key={map.id}>
                                    <UserMapsCard
                                        map={map}
                                        onOpenDetails={handleOpenDetails}
                                        onDelete={() => handleDeletePrompt(map.id)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))}
            </Box>

            {selectedMap && (
                <MapDetailsModal
                    open={!!selectedMap}
                    onClose={handleCloseDetails}
                    map={selectedMap}
                />
            )}

            {mapToDelete && (
                <ConfirmDeleteModal
                    open={!!mapToDelete}
                    onClose={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                />
            )}
        </>
    );
};

export default Locations;
