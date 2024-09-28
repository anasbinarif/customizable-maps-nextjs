import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import {Box, List, ListItem, ListItemText, Typography} from '@mui/material';
import React from 'react';

const LocationListByFilter = ({ locations, filters, onLocationClick }) => {
  const locationsByTag = filters.reduce((acc, filter) => {
    acc[filter.name] = locations.filter(loc => loc.tag === filter.name);

    return acc;
  }, {});

  return (
    <Box sx={{ maxHeight: 'calc(100vh - 200px)' }}>
      {Object.entries(locationsByTag).map(([tag, locations]) => (
        locations.length > 0 && (
          <Box key={tag} sx={{ mb: 2 }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <LocationSearchingIcon style={{ color: `${filters.find(f => f.name === tag)?.selectedColor || 'textPrimary'}` }} />
              <Typography variant="h6" sx={{
                fontWeight: 'bold'
              }}>
                {tag}
              </Typography>
            </Box>
            <List>
              {locations.map(loc => (
                <ListItem key={loc.id} onClick={() => onLocationClick(loc)} button>
                  <ListItemText primary={loc.name} secondary={`Lat: ${loc.latitude}, Lng: ${loc.longitude}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        )
      ))}
    </Box>
  );
};

export default LocationListByFilter;
