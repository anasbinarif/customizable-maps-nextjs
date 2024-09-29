import { Box, Slider, Switch, FormControlLabel, Typography } from '@mui/material';

const MapFilters = ({ sliderValue, onSliderChange, switchChecked, onSwitchChange }) => {
  return (
    <Box mt="10px" sx={{ width: '30%' }}>
      <Typography gutterBottom>Location Radius</Typography>
      <Slider
        aria-label="Location Radius"
        value={sliderValue}
        onChange={onSliderChange}
        valueLabelDisplay="auto"
        step={50}
        marks
        min={500}
        max={1200}
      />
      <FormControlLabel
        control={
          <Switch
            checked={switchChecked}
            onChange={onSwitchChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label={switchChecked ? 'Edit Mode On' : 'Edit Mode Off'}
      />
    </Box>
  );
};

export default MapFilters;
