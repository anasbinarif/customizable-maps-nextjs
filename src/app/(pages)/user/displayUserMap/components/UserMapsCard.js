import React from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Box, CardMedia } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Link from 'next/link';

const UserMapsCard = ({ map, onOpenDetails, onDelete }) => {
    return (
        <Card sx={{ mb: 2, borderRadius: '10px', position: 'relative', height: "300px" }}>
            <IconButton
                onClick={() => onOpenDetails(map)}
                sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    color: 'black',
                }}
            >
                <FullscreenIcon />
            </IconButton>
            <IconButton
                onClick={() => onDelete(map.id)}
                sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '48px',
                    color: 'black',
                }}
            >
                <DeleteIcon />
            </IconButton>
            <CardMedia
                component="img"
                height="140"
                image={map.pinImageUrl}
                alt="Pin location"
            />
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h6" component="div">
                            {map.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Pin Location: {map.pinName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Locations Saved: {map.locations.length}
                        </Typography>
                    </Box>
                </Grid>
            </CardContent>
        </Card>
    );
};

export const CreateMapCard = () => {
    return (
        <Card
            sx={{
                mb: 2,
                borderRadius: '10px',
                position: 'relative',
                height: "300px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: '#f0f0f0',
            }}
        >
            <CardMedia
                component="img"
                height="140"
                image="/img/home_map.jpg"
                alt="Pin location"
            />
            <CardContent>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Link
                        href="/createUserMaps"
                            sx={{
                                color: 'black',
                            }}
                        >
                            <AddCircleOutlineIcon sx={{ fontSize: 50 }} />
                        </Link>
                        <Typography variant="h6" component="div" textAlign="center">
                            Create More Personalized Maps
                        </Typography>
                    </Box>
            </CardContent>
        </Card>
    );
};

export default UserMapsCard;
