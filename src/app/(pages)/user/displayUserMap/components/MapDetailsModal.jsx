import React, { useState, useRef, useCallback } from 'react';
import { Modal, Box, Typography, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import LocationListByFilter from './LocationListByFilter';
import GoogleMapsLoader from '../../../../../lib/GoogleMapsLoader';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
};

const mapContainerStyle = {
    width: '100%',
    height: '100%',
};

const contentStyle = {
    flex: 1,
    display: 'flex',
    overflowY: 'hidden',
};

// Define the filters with corresponding colors
const filters = [
    { name: 'Restaurants', type: 'restaurant', selectedColor: '#FF6347' },
    { name: 'Hotels', type: 'lodging', selectedColor: '#1E90FF' },
    { name: 'Things to do', type: 'tourist_attraction', selectedColor: '#32CD32' },
    { name: 'Museums', type: 'museum', selectedColor: '#FFD700' },
    { name: 'Transit', type: 'transit_station', selectedColor: '#FF4500' },
    { name: 'Pharmacies', type: 'pharmacy', selectedColor: '#8A2BE2' },
    { name: 'ATMs', type: 'atm', selectedColor: '#20B2AA' },
    { name: 'Schools', type: 'school', selectedColor: '#FF69B4' },
    { name: 'Entertainment', type: 'movie_theater', selectedColor: '#FF8C00' },
];

const MapDetailsModal = ({ open, onClose, map }) => {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const mapRef = useRef(null);

    const onLoad = useCallback((mapInstance) => {
        mapRef.current = mapInstance;
    }, []);

    const onUnmount = useCallback(() => {
        mapRef.current = null;
    }, []);

    const handleMarkerClick = (location) => {
        setSelectedMarker(location);
        panToLocation(location);
    };

    const handleInfoWindowClose = () => {
        setSelectedMarker(null);
    };

    const getMarkerIcon = (color) => {
        if (!color || !window.google) return null;
        return {
            path: 'M12 2C8.13 2 5 5.13 5 9c0 3.25 2.83 7.44 7.11 11.54.49.47 1.29.47 1.78 0C16.17 16.44 19 12.25 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z',
            fillColor: color,
            fillOpacity: 1,
            strokeColor: '#000',
            strokeWeight: 1,
            scale: 2,
            anchor: new window.google.maps.Point(12, 24),
        };
    };

    const getMarkerColor = (tag) => {
        const filter = filters.find(filter => filter.name === tag);
        return filter ? filter.selectedColor : '#FF6347';
    };

    const panToLocation = (location) => {
        if (mapRef.current) {
            mapRef.current.panTo({ lat: location.latitude, lng: location.longitude });
        }
    };

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
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {map.title}
                        </Typography>
                        <IconButton onClick={onClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Box sx={contentStyle}>
                        {/* Locations List on the left */}
                        <Box sx={{ width: '40%', height: '100%', overflowY: "scroll", pr: 2 }}>
                            <Typography variant="body2" color="textSecondary">
                                Pin Location: {map.pinName} ({map.pinLatitude}, {map.pinLongitude})
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                Number of Locations: {map.locations.length}
                            </Typography>
                            <LocationListByFilter locations={map.locations} filters={filters} onLocationClick={handleMarkerClick} />
                        </Box>
                        {/* Google Map on the right */}
                        <Box sx={{ width: '60%', height: '100%' }}>
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={{ lat: Number(map.pinLatitude), lng: Number(map.pinLongitude) }}
                                zoom={13}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                            >
                                {/* Pin Location */}
                                <Marker position={{ lat: Number(map.pinLatitude), lng: Number(map.pinLongitude) }} />

                                {/* Location Markers */}
                                {map.locations.map((loc) => (
                                    <Marker
                                        key={loc.id}
                                        position={{ lat: Number(loc.latitude), lng: Number(loc.longitude) }}
                                        icon={getMarkerIcon(getMarkerColor(loc.tag))}
                                        onClick={() => handleMarkerClick(loc)}
                                    />
                                ))}

                                {/* Info Window */}
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
                    </Box>
                </Box>
            </Modal>
        </GoogleMapsLoader>
    );
};

export default MapDetailsModal;
