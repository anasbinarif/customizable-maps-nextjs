import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import React from 'react';

const LayoutToggle = ({ layout, setLayout }) => {
  const handleToggle = (event) => {
    setLayout(event.target.checked ? 'responsive' : 'desktop');
  };

  return (
    <Box display="flex" alignItems="center">
      <FormControlLabel
        control={
          <Switch
            checked={layout === 'responsive'}
            onChange={handleToggle}
            color="primary.main"
          />
        }
        label={
          <Typography>
            {layout.charAt(0).toUpperCase() + layout.slice(1)}
          </Typography>
        }
      />
      {/* <Typography variant="h6">
        Current Layout: {layout.charAt(0).toUpperCase() + layout.slice(1)}
      </Typography> */}
    </Box>
  );
};

export default LayoutToggle;
