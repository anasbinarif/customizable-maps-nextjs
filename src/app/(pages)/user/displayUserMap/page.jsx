import {Box} from '@mui/material';

import DiaplayUserMaps from './components/DiaplayUserMaps';

export default function displayUserMap() {
  return (
    <>
      <Box
        sx={{
          backgroundImage: 'primary.pageBg',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '1rem 2rem',
        }}
      >
        <DiaplayUserMaps />
      </Box>
    </>
  );
}
