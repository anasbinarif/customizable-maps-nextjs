import React from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Box } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const UserMapsCard = ({ map, onOpenDetails }) => {
    return (
        <Card sx={{ mb: 2, borderRadius: '10px', position: 'relative' }}>
            <IconButton
                onClick={() => onOpenDetails(map)}
                sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                }}
            >
                <FullscreenIcon />
            </IconButton>
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

export default UserMapsCard;
