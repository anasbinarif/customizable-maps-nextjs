import CloseIcon from '@mui/icons-material/Close';
import {Box, Grid, IconButton, Modal} from '@mui/material';
import React, {useMemo} from 'react';

import CustomPdf from '../../createUserMaps/components/exportedDoc';

import {haversineDistance} from '@/lib/data';
import GoogleMapsLoader from '@/lib/GoogleMapsLoader';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1400px',
  maxHeight: '1123px',
  overflowY: 'auto',
  backgroundColor: '#fff',
  p: 3,
  borderRadius: '8px',
};

const filters = [
  { name: 'Restaurants', type: 'restaurant', selectedColor: '#FF6347' },
  { name: 'Hotels', type: 'lodging', selectedColor: '#1E90FF' },
  {
    name: 'Things to do',
    type: 'tourist_attraction',
    selectedColor: '#32CD32',
  },
  { name: 'Museums', type: 'museum', selectedColor: '#FFD700' },
  { name: 'Transit', type: 'transit_station', selectedColor: '#FF4500' },
  { name: 'Pharmacies', type: 'pharmacy', selectedColor: '#8A2BE2' },
  { name: 'ATMs', type: 'atm', selectedColor: '#20B2AA' },
  { name: 'Schools', type: 'school', selectedColor: '#FF69B4' },
  { name: 'Entertainment', type: 'movie_theater', selectedColor: '#FF8C00' },
];

const MapDetailsModal = ({ open, onClose, map }) => {

  const locationsByTag = useMemo(() => {
    return map.locations.reduce((acc, location) => {
      const tag = location.tag;

      if (!acc[tag]) {
        acc[tag] = {
          color: filters.find((fil) => fil.name === tag).selectedColor,
          locations: [],
        };
      }
      acc[tag].locations.push({
        ...location,
        distance: haversineDistance(
          {
            lat: Number(map.pinLatitude),
            lng: Number(map.pinLongitude),
          },
          { lat: location.latitude, lng: location.longitude }
        ),
      });

      return acc;
    }, {});
  }, [map]);

  return (
    <GoogleMapsLoader>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container justifyContent="space-between" alignItems="center">
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            {map.title}
          </Typography> */}
            <IconButton onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Grid>
          <CustomPdf
            data={{
              title: map?.title,
              oldImgs: map?.images,
              newImgFiles: [],
              logoFile: map?.logo ? { url: map?.logo } : {},
              locationsByTag: locationsByTag,
              currentLocation: {
                lat: Number(map.pinLatitude),
                lng: Number(map.pinLongitude),
              },
              helperHtml: map?.helperText,
            }}
          />
          {/* <Box sx={contentStyle}>
                        <Box sx={{ width: '40%', height: '100%', overflowY: "scroll", pr: 2 }}>
                            <Typography variant="body2" color="textSecondary">
                                Pin Location: {map.pinName} ({map.pinLatitude}, {map.pinLongitude})
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                Number of Locations: {map.locations.length}
                            </Typography>
                            <LocationListByFilter locations={map.locations} filters={filters} onLocationClick={handleMarkerClick} />
                        </Box>
                        <Box sx={{ width: '60%', height: '100%' }}>
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={{ lat: Number(map.pinLatitude), lng: Number(map.pinLongitude) }}
                                zoom={13}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                            >
                                <Marker position={{ lat: Number(map.pinLatitude), lng: Number(map.pinLongitude) }} />

                                {map.locations.map((loc) => (
                                    <Marker
                                        key={loc.id}
                                        position={{ lat: Number(loc.latitude), lng: Number(loc.longitude) }}
                                        icon={getMarkerIcon(getMarkerColor(loc.tag))}
                                        onClick={() => handleMarkerClick(loc)}
                                    />
                                ))}

                                {selectedMarker && (
                                    <InfoWindow
                                        position={{ lat: Number(selectedMarker.latitude), lng: Number(selectedMarker.longitude) }}
                                        onCloseClick={handleInfoWindowClose}
                                        options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
                                    >
                                        <Box>
                                            <Typography variant="h6">{selectedMarker.name}</Typography>
                                            <Typography variant="body2">{selectedMarker.tag}</Typography>
                                            <Typography variant="body2">{`Lat: ${selectedMarker.latitude}, Lng: ${selectedMarker.longitude}`}</Typography>
                                        </Box>
                                    </InfoWindow>
                                )}
                            </GoogleMap>
                        </Box>
                    </Box> */}
        </Box>
      </Modal>
    </GoogleMapsLoader>
  );
};

export default MapDetailsModal;
