import { Box } from '@mui/material';

import CreateGoogleMap from './components/CreateGoogleMap';

export default function ListMaps() {
    return (
        <Box
            sx={{
                // backgroundColor: "primary.main.pageBg1",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '1rem 2rem',
                minHeight: '90vh',
            }}
        >
            <CreateGoogleMap />
        </Box>
    );
}
