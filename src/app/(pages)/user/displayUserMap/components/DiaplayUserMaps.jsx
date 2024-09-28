'use client';
import {Box, Button, Container, Grid, Typography} from '@mui/material';
import Link from 'next/link';
import {useSession} from 'next-auth/react';
import React, {useEffect, useState} from 'react';

import MapDetailsModal from './MapDetailsModal';
import UserMapsCard, {CreateMapCard} from './UserMapsCard';

import AlertSnackbar from '@/components/AlertSnackbar';
import LoadingSpinner from '@/components/LoadingSpinner';
import useCustomSnackbar from '@/components/snackbar-hook/useCustomSnackbar';

const DisplayUserMaps = () => {
  const { data: session, status } = useSession();
  const [maps, setMaps] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedMap, setSelectedMap] = useState(null);
  const { openSnackbar } = useCustomSnackbar();

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
      if (status === 'authenticated') {
        try {
          const response = await fetch(
            `/api/getUserMaps?email=${session.user.email}`
          );

          if (response.ok) {
            const data = await response.json();

            setMaps(data.maps);
          } else {
            openSnackbar('Failed to fetch user maps.');
          }
        } catch (error) {
          openSnackbar(`An error occurred while fetching user maps. ${error}`);
        }
      } else setMaps([]);
    };

    fetchUserMaps();
  }, [status, session?.user]);

  const handleDeleteMap = async (mapId) => {
    try {
      const response = await fetch(`/api/deleteUserMap?id=${mapId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMaps(maps.filter((map) => map.id !== mapId));
        handleOpenAlert('success', 'Map deleted successfully.');
      } else {
        handleOpenAlert('error', 'Failed to delete the map.');
      }
    } catch (error) {
      handleOpenAlert('error', 'An error occurred while deleting the map.');
    }
  };

  return (
    <Container sx={{ mt: 4, minHeight: '100vh' }}>
      {maps?.length > 0 ? (
        <Grid container spacing={3}>
          {maps.map((map) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={map.id}>
              <UserMapsCard
                map={map}
                onOpenDetails={handleOpenDetails}
                onDelete={handleDeleteMap}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CreateMapCard />
          </Grid>
        </Grid>
      ) : !maps ? (
        <>
          <LoadingSpinner />
        </>
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
          <Link href="/user/createUserMaps" passHref>
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
