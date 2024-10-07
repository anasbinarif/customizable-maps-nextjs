import {
  Box,
  Slider,
  Switch,
  FormControlLabel,
  Typography,
} from '@mui/material';

const MapFilters = ({
  sliderValue,
  onSliderChange,
  switchChecked,
  onSwitchChange,
}) => {
  return (
    <Box
      mt="10px"
      sx={{
        width: '30%',
        '@media only screen and (max-width: 1200px)': { width: '50%' },
        '@media only screen and (max-width: 600px)': { width: '100%' },
      }}
    >
      <Typography gutterBottom>Location Radius</Typography>
      <Slider
        aria-label="Location Radius"
        value={sliderValue}
        onChange={onSliderChange}
        valueLabelDisplay="auto"
        step={100}
        marks
        min={300}
        max={5000}
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
