import {Box, Typography} from '@mui/material';
import React from 'react';

import UserMapsCard from '../../user/displayUserMap/components/UserMapsCard';

const UserMapWithInfo = ({ map, onOpenDetails, onDelete }) => {
    return (
        <Box>
            <Typography variant="subtitle1" gutterBottom>
                {`User: ${map.user.name || map.user.email} - Map: ${map.title}`}
            </Typography>
            <UserMapsCard
                map={map}
                onOpenDetails={onOpenDetails}
                onDelete={onDelete}
            />
        </Box>
    );
};

export default UserMapWithInfo;
