'use client';

import {Box, Button, Grid, Typography} from '@mui/material';
import {Autocomplete, GoogleMap, InfoWindow, Marker,} from '@react-google-maps/api';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import React, {useCallback, useEffect, useMemo, useRef, useState,} from 'react';
import ReactDOM from 'react-dom/client';
import {
  FaBus,
  FaCamera,
  FaFilm,
  FaHotel,
  FaLandmark,
  FaMoneyBillAlt,
  FaPrescriptionBottle,
  FaSchool,
  FaUtensils,
} from 'react-icons/fa';

import CustomPdf from '../exportedDoc';
import ImageUploader from '../ImageUploader';
import LocationList from '../LocationList';
import LogoUploader from '../LogoUploader';
import TextArea from '../TextArea';

import MapFilters from '@/app/(pages)/user/createUserMaps/components/map-filters/MapFilters';
import AlertSnackbar from '@/components/AlertSnackbar';
import ConfirmModal from '@/components/ConfirmModal';
import {StyledTextField} from '@/components/CustomTextFields';
import LoadingSpinner from '@/components/LoadingSpinner';
import LoginSignupModal from '@/components/LoginSignupModal';
import useCustomSnackbar from '@/components/snackbar-hook/useCustomSnackbar';
import {getMarkerIcon, haversineDistance} from '@/lib/data';
import {generateTextColor} from '@/lib/generateTextColor';
import GoogleMapsLoader from '@/lib/GoogleMapsLoader';
import {uploadFileToS3} from '@/lib/uploadFileToS3';

const iconStyle = {
  marginRight: '8px',
};

const buttonHoverStyle = {
  backgroundColor: '#f0f0f0',
};

export default function CreateGoogleMap({ mapData = null }) {
  const { data: session } = useSession();
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
    name: '',
  });
  const [markers, setMarkers] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const autocompleteRef = useRef(null);
  const [zoom, setZoom] = useState(8);
  const [infoWindowHovered, setInfoWindowHovered] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState('login');
  const [title, setTitle] = useState('');
  const [titleError, settitleError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [latLangTmp, setLatLangTmp] = useState({ lat: '', lng: '' });
  const mapRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [oldImgs, setOldImgs] = useState([]);
  const [logoFile, setLogoFile] = useState({});
  const [helperHtml, setHelperHtml] = useState('');
  const { openSnackbar } = useCustomSnackbar();
  const [radius, setRadius] = useState(800);
  const [isEditMode, setEditMode] = useState(true);
  const [locationsByTag, setLocationsByTag] = useState({
    Restaurants: { color: '#FF9A8B', locations: [] },
    Hotels: { color: '#6AB2FF', locations: [] },
    'Things to do': { color: '#9CFF9C', locations: [] },
    Museums: { color: '#FDF5A0', locations: [] },
    Transit: { color: '#B5EAF2', locations: [] },
    Pharmacies: { color: '#B99DFF', locations: [] },
    ATMs: { color: '#66D0C9', locations: [] },
    Schools: { color: '#FF9EC4', locations: [] },
    Entertainment: { color: '#FFB46F', locations: [] },
  });

  useEffect(() => {
  }, [locationsByTag]);

  const handleRadiusChange = (event, newRadius) => {
    setRadius(newRadius);
  };

  const handleEditModeChange = (event) => {
    setEditMode(event.target.checked);
  };

  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  const handleConfirmClose = () => {
    setLatLangTmp({ lat: '', lng: '' });
    setOpenConfirm(false);
  };

  const onLoad = useCallback((mapInstance) => {
    mapRef.current = mapInstance;
  }, []);

  const handleOpenModal = (mode) => {
    setModalMode(mode);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const getStaticMapImageUrl = (
    lat,
    lng,
    zoom = 14,
    width = 400,
    height = 300
  ) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap&markers=color:red%7Clabel:P%7C${lat},${lng}&key=${apiKey}`;
  };

  const saveMap = async () => {
    if (!session) {
      handleOpenModal(modalMode);
      handleOpenAlert('info', 'Login before saving a map!');

      return;
    }
    if (!title) {
      settitleError(true);
      handleOpenAlert('warning', 'Map title is required!');

      return;
    }
    setLoading(true);

    const fileUploadPromises = uploadedFiles.map((file) =>
      uploadFileToS3(file)
    );
    const newFileUrls = await Promise.all(fileUploadPromises);
    const fileUrls = [...oldImgs.map((img) => img.url), ...newFileUrls];

    let logo = logoFile?.url || '';

    if (logoFile.name) {
      logo = await uploadFileToS3(logoFile);
    }

    const locationsToSave = Object.keys(locationsByTag).flatMap((tag) =>
      locationsByTag[tag].locations.map((loc) => ({
        name: loc.name,
        tag,
        latitude: loc.latitude,
        longitude: loc.longitude,
      }))
    );
    const userEmail = session?.user.email;
    const pinLocationImage = getStaticMapImageUrl(
      currentLocation.lat,
      currentLocation.lng
    );

    const dataToSave = {
      id: mapData ? mapData.id : null,
      title: title,
      pinLocation: {
        latitude: currentLocation.lat,
        longitude: currentLocation.lng,
        name: currentLocation.name,
        imageUrl: pinLocationImage,
      },
      locations: locationsToSave,
      userEmail,
      uploadedFileUrls: fileUrls,
      logo,
      helperText: helperHtml,
    };

    try {
      let response;

      if (!mapData) {
        response = await fetch('/api/saveUserMap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSave),
        });
      } else {
        response = await fetch('/api/updateUserMap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSave),
        });
      }

      if (response.ok) {
        handleOpenAlert('success', 'Map saved successfully!');
        setLoading(false);
        setTitle('');
        setSelectedFilters([]);
        setMarkers([]);
        setActiveMarker(null);
        setLocationsByTag({
          Restaurants: { color: '#FF9A8B', locations: [] },
          Hotels: { color: '#6AB2FF', locations: [] },
          'Things to do': { color: '#9CFF9C', locations: [] },
          Museums: { color: '#FDF5A0', locations: [] },
          Transit: { color: '#B5EAF2', locations: [] },
          Pharmacies: { color: '#B99DFF', locations: [] },
          ATMs: { color: '#66D0C9', locations: [] },
          Schools: { color: '#FF9EC4', locations: [] },
          Entertainment: { color: '#FFB46F', locations: [] },
        });
        setUploadedFiles([]);
        setOldImgs([]);
        setLogoFile({});
        setHelperHtml('');
      } else {
        alert('Failed to save the map.');
        handleOpenAlert('error', 'Failed to save the map.');
        setLoading(false);
      }
    } catch (error) {
      handleOpenAlert('error', error);
      setLoading(false);
    }
  };

  const exportMap = async () => {
    const pdfContent = document.createElement('div');

    pdfContent.style.width = '1920px';
    pdfContent.style.position = 'absolute';
    document.body.appendChild(pdfContent);

    const root = ReactDOM.createRoot(pdfContent);

    root.render(
      <CustomPdf
        customRef={null}
        data={{
          title: title,
          oldImgs: oldImgs,
          newImgFiles: uploadedFiles,
          logoFile: logoFile,
          locationsByTag: locationsByTag,
          currentLocation: currentLocation,
          helperHtml: helperHtml,
        }}
      />
    );

    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    const canvas = await html2canvas(pdfContent, {
      useCORS: true,
      scale: 2,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${title}.pdf`);

    root.unmount();
    document.body.removeChild(pdfContent);
  };

  const filters = useMemo(() => {
    return [
      {
        name: 'Restaurants',
        type: 'restaurant',
        icon: <FaUtensils style={iconStyle} />,
        selectedColor: '#FF9A8B',
      },
      {
        name: 'Hotels',
        type: 'lodging',
        icon: <FaHotel style={iconStyle} />,
        selectedColor: '#6AB2FF',
      },
      {
        name: 'Things to do',
        type: 'tourist_attraction',
        icon: <FaCamera style={iconStyle} />,
        selectedColor: '#9CFF9C',
      },
      {
        name: 'Museums',
        type: 'museum',
        icon: <FaLandmark style={iconStyle} />,
        selectedColor: '#FDF5A0',
      },
      {
        name: 'Transit',
        type: 'transit_station',
        icon: <FaBus style={iconStyle} />,
        selectedColor: '#B5EAF2',
      },
      {
        name: 'Pharmacies',
        type: 'pharmacy',
        icon: <FaPrescriptionBottle style={iconStyle} />,
        selectedColor: '#B99DFF',
      },
      {
        name: 'ATMs',
        type: 'atm',
        icon: <FaMoneyBillAlt style={iconStyle} />,
        selectedColor: '#66D0C9',
      },
      {
        name: 'Schools',
        type: 'school',
        icon: <FaSchool style={iconStyle} />,
        selectedColor: '#FF9EC4',
      },
      {
        name: 'Entertainment',
        type: 'movie_theater',
        icon: <FaFilm style={iconStyle} />,
        selectedColor: '#FFB46F',
      },
    ];
  }, []);

  const handleLocationClick = (location) => {
    // console.log(location);
    const totalLocs = Object.values(locationsByTag).reduce(
      (total, category) => {
        return total + category.locations.length;
      },
      0
    );

    if (totalLocs >= 40) {
      handleOpenAlert('error', 'Max locations saved.');

      return;
    }
    setLocationsByTag((prevTags) => {
      const updatedTag = {
        ...prevTags[location.tag],
        locations: [...(prevTags[location.tag]?.locations || []), location],
      };

      return { ...prevTags, [location.tag]: updatedTag };
    });
  };

  const handleDelete = (tag, locationIndex) => {
    setLocationsByTag((prevTags) => {
      const updatedLocations = prevTags[tag].locations.filter(
        (_, i) => i !== locationIndex
      );

      return {
        ...prevTags,
        [tag]: { ...prevTags[tag], locations: updatedLocations },
      };
    });
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setCurrentLocation({ lat, lng, name: place.name });
      setZoom(14);
      setLocationsByTag({
        Restaurants: { color: '#FF9A8B', locations: [] },
        Hotels: { color: '#6AB2FF', locations: [] },
        'Things to do': { color: '#9CFF9C', locations: [] },
        Museums: { color: '#FDF5A0', locations: [] },
        Transit: { color: '#B5EAF2', locations: [] },
        Pharmacies: { color: '#B99DFF', locations: [] },
        ATMs: { color: '#66D0C9', locations: [] },
        Schools: { color: '#FF9EC4', locations: [] },
        Entertainment: { color: '#FFB46F', locations: [] },
      });
      setMarkers([{ lat, lng, name: place.name }]);
      setTitle(place.formatted_address || '');
    } else {
      openSnackbar('Autocomplete is not loaded yet!');
    }
  };

  const onMapClick = (e) => {
    setLatLangTmp({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setOpenConfirm(true);
  };

  const handleConfirmMap = () => {
    const lat = latLangTmp?.lat;
    const lng = latLangTmp?.lng;

    setCurrentLocation({ lat, lng, name: 'Selected Location' });
    setZoom(14);
    setLatLangTmp({ lat: '', lng: '' });
    setMarkers([{ lat, lng, name: 'Selected Location' }]);
    setLocationsByTag({
      Restaurants: { color: '#FF9A8B', locations: [] },
      Hotels: { color: '#6AB2FF', locations: [] },
      'Things to do': { color: '#9CFF9C', locations: [] },
      Museums: { color: '#FDF5A0', locations: [] },
      Transit: { color: '#B5EAF2', locations: [] },
      Pharmacies: { color: '#B99DFF', locations: [] },
      ATMs: { color: '#66D0C9', locations: [] },
      Schools: { color: '#FF9EC4', locations: [] },
      Entertainment: { color: '#FFB46F', locations: [] },
    });
    setOpenConfirm(false);
    setSelectedFilters([]);
  };

  const searchNearbyPlaces = useCallback((filters, loc) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );

    let accumulatedMarkers = [];

    const promises = filters.map((filter) => {
      return new Promise((resolve) => {
        service.nearbySearch(
          {
            location: loc,
            radius: radius,
            type: filter.type,
          },
          (results, status) => {
            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
                results
            ) {
              const newMarkers = results.map((place) => {
                return {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                  name: place.name,
                  rating: place.rating,
                  userRatingsTotal: place.user_ratings_total,
                  vicinity: place.vicinity,
                  photo: place.photos ? place.photos[0].getUrl() : null,
                  isOpen: place.opening_hours
                    ? place.opening_hours.isOpen()
                    : null,
                  openingHours: place.opening_hours
                    ? place.opening_hours.weekday_text
                    : null,
                  type: filter.name,
                  color: filter.selectedColor,
                };
              });

              accumulatedMarkers = accumulatedMarkers.concat(newMarkers);
            }
            resolve();
          }
        );
      });
    });

    Promise.all(promises).then(() => {
      const uxMarkers = accumulatedMarkers.map((marker) => {
        const catLocations = locationsByTag[marker.type]?.locations;
        const found = catLocations.find((loc) => loc.name === marker.name);

        return {
          ...marker,
          color: found ? marker.color : `${marker.color}80`,
          scale: found ? 2.5 : 2,
        };
      });

      setMarkers(uxMarkers);
    });
  },
  [locationsByTag, radius]
  );

  const toggleFilter = (filter) => {
    const isSelected = selectedFilters.some(
      (selectedFilter) => selectedFilter.type === filter.type
    );

    let updatedFilters;

    if (isSelected) {
      updatedFilters = selectedFilters.filter(
        (selectedFilter) => selectedFilter.type !== filter.type
      );
    } else {
      updatedFilters = [...selectedFilters, filter];
    }
    // console.log(updatedFilters);
    setSelectedFilters(updatedFilters);
    searchNearbyPlaces(updatedFilters, currentLocation);
  };

  const handleMarkerMouseOver = (marker) => {
    setActiveMarker(marker);
  };

  const handleMarkerMouseOut = () => {
    if (!infoWindowHovered) {
      setActiveMarker(null);
    }
  };

  const onLoadSearch = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  useEffect(() => {
    if (navigator?.geolocation && !mapData) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) => {
          const pos = { lat, lng, name: `Lat: ${lat}, Lng: ${lng}` };

          setCurrentLocation(pos);
          setZoom(14);
        }
      );
    }

    const checkGoogleMapsAvailability = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsGoogleMapsLoaded(true);
      } else {
        setTimeout(checkGoogleMapsAvailability, 100);
      }
    };

    if (mapData) {
      let filters0 = new Set();

      mapData?.locations.forEach((loc) => filters0.add(loc?.tag));
      filters0 = [...filters0];
      const filterData = filters0.map((filter) => {
        return filters.find((fil) => fil.name === filter);
      });

      setCurrentLocation({
        lat: mapData?.pinLatitude,
        lng: mapData?.pinLongitude,
      });
      setZoom(14);
      setTitle(mapData?.title);
      setSelectedFilters(filterData);
      const locData = mapData?.locations.map((loc) => {
        return {
          name: loc.name,
          tag: loc.tag,
          longitude: loc.longitude,
          latitude: loc.latitude,
          distance: haversineDistance(
            {
              lat: mapData?.pinLatitude,
              lng: mapData?.pinLongitude,
            },
            { lat: loc.latitude, lng: loc.longitude }
          ),
        };
      });

      locData.forEach((loc) => {
        setLocationsByTag((prevTags) => {
          const tag = loc.tag;
          const existingTag = prevTags[tag] || { locations: [] };

          const uniqueLocations = [
            ...existingTag.locations.filter(
              (location) => location.name !== loc.name
            ),
            loc,
          ];

          const updatedTag = {
            ...existingTag,
            locations: uniqueLocations,
          };

          return { ...prevTags, [tag]: updatedTag };
        });
      });
      setOldImgs(mapData?.images || []);
      setLogoFile({ url: mapData?.logo });
      setHelperHtml(mapData?.helperText);

      checkGoogleMapsAvailability();
    }
  }, [mapData, filters]);

  useEffect(() => {
    if (window.google.maps.places) {
      searchNearbyPlaces(selectedFilters, currentLocation);
    }
  }, [
    currentLocation,
    selectedFilters,
    searchNearbyPlaces,
    isGoogleMapsLoaded,
  ]);

  return (
    <GoogleMapsLoader>
      <Grid container spacing={3} sx={{ marginTop: '1rem' }}>
        <Grid item xs={12} sm={12} md={8} lg={9}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box
              sx={{
                margin: '10px 0.5rem',
              }}
            >
              <StyledTextField
                id="standard-basic"
                placeholder="Title"
                variant="outlined"
                error={titleError}
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  '@media only screen and (max-width: 1200px)': {
                    width: '100%',
                  },
                }}
              />
            </Box>
            <MapFilters
              sliderValue={radius}
              onSliderChange={handleRadiusChange}
              switchChecked={isEditMode}
              onSwitchChange={handleEditModeChange}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              margin: '10px 0',
              flexWrap: 'wrap',
            }}
          >
            {filters.map((filter) => {
              const isSelected = selectedFilters.some(
                (selectedFilter) => selectedFilter.type === filter.type
              );

              return (
                <Button
                  key={filter.type}
                  variant={isSelected ? 'contained' : 'outlined'}
                  color="primary"
                  startIcon={filter.icon}
                  sx={{
                    margin: '5px',
                    borderRadius: '50px',
                    backgroundColor: isSelected
                      ? filter.selectedColor
                      : 'primary.bgHero',
                    color: isSelected
                      ? generateTextColor(filter.selectedColor)
                      : 'primary.main',
                    width: 'calc(33% - 0.5rem)',

                    '@media only screen and (max-width: 900px)': {
                      width: 'calc(50% - 0.7rem)',
                    },
                    '@media only screen and (max-width: 600px)': {
                      width: 'calc(100% - 0.7rem)',
                    },

                    '&:hover': {
                      backgroundColor: isSelected
                        ? filter.selectedColor
                        : buttonHoverStyle.backgroundColor,
                    },
                  }}
                  onClick={() => toggleFilter(filter)}
                >
                  {filter.name}
                </Button>
              );
            })}
          </Box>
          <GoogleMap
            id="search-box-example"
            mapContainerStyle={{ width: '100%', height: '70vh' }}
            center={currentLocation}
            zoom={zoom}
            onDblClick={onMapClick}
            onLoad={onLoad}
            // onUnmount={onUnmount}
            options={{
              gestureHandling: 'greedy',
              disableDoubleClickZoom: true,
            }}
          >
            <Marker position={currentLocation} />
            {markers
              .filter(marker => {
                if (isEditMode) {
                  return true;
                }

                return Object.values(locationsByTag).some(tag =>
                  tag.locations.some(
                    (loc) => loc.latitude === marker.lat && loc.longitude === marker.lng
                  )
                );
              })
              .map((marker, index) => (
                <Marker
                  key={index}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  icon={getMarkerIcon(marker.color, marker.scale)}
                  onMouseOver={() => handleMarkerMouseOver(marker)}
                  onClick={() =>
                    handleLocationClick({
                      name: marker.name,
                      tag: marker.type,
                      latitude: marker.lat,
                      longitude: marker.lng,
                      distance: haversineDistance(currentLocation, {
                        lat: marker.lat,
                        lng: marker.lng,
                      }),
                    })
                  }
                >
                  {activeMarker && activeMarker.lat === marker.lat && activeMarker.lng === marker.lng && (
                    <InfoWindow
                      position={{ lat: marker.lat, lng: marker.lng }}
                      onMouseOver={() => setInfoWindowHovered(true)}
                      onMouseOut={() => {
                        setInfoWindowHovered(false);
                        handleMarkerMouseOut();
                      }}
                      options={{
                        pixelOffset: new window.google.maps.Size(0, -30),
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: '250px',
                          padding: 0,
                          overflow: 'hidden',
                          margin: 0,
                          maxHeight: '200px',
                        }}
                      >
                        {marker.photo && (
                          <Image
                            src={marker.photo}
                            alt={marker.name}
                            width={250}
                            height={70}
                            style={{
                              display: 'block',
                              width: '100%',
                              borderRadius: '8px 8px 0 0',
                            }}
                          />
                        )}
                        <Box sx={{ padding: '8px' }}>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ fontSize: '16px', fontWeight: 'bold' }}
                          >
                            {marker.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ fontSize: '14px', marginTop: '4px' }}
                          >
                            {marker.vicinity}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ fontSize: '14px', marginTop: '4px' }}
                          >
                            Rating: {marker.rating} ({marker.userRatingsTotal}{' '}
                            reviews)
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: '14px',
                              color: marker.isOpen ? 'green' : 'red',
                              marginTop: '4px',
                            }}
                          >
                            {marker.isOpen ? 'Open Now' : 'Closed'}
                          </Typography>
                          {marker.openingHours && (
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              sx={{ fontSize: '14px', marginTop: '4px' }}
                            >
                              {marker.openingHours.map((hours, idx) => (
                                <span key={idx}>
                                  {hours}
                                  <br />
                                </span>
                              ))}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </InfoWindow>
                  )}
                </Marker>
              ))}

            <Autocomplete
              onLoad={onLoadSearch}
              onPlaceChanged={onPlaceChanged}
              types={['geocode']}
            >
              <StyledTextField
                placeholder="Search for a place"
                sx={{
                  boxSizing: 'border-box',
                  width: '240px',
                  height: '32px',
                  padding: '0 12px',
                  position: 'absolute',
                  top: '0.5rem',
                  left: '50%',
                  transform: 'translate(-50%, 0)',
                }}
                variant="outlined"
              />
            </Autocomplete>
          </GoogleMap>
          <ImageUploader
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            oldImgs={oldImgs}
            setOldImgs={setOldImgs}
          />
        </Grid>
        {/* Location List section */}
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <LocationList
            locationsByTag={locationsByTag}
            handleDelete={handleDelete}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            '@media only screen and (max-width: 900px)': {
              flexDirection: 'row-reverse',
            },
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={8} lg={9}>
              <TextArea helperHtml={helperHtml} setHelperHtml={setHelperHtml} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Box mt="10px" sx={{ mr: '1rem' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={exportMap}
                    sx={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      color: 'primary.main',
                      border: '1px solid',
                      borderColor: (theme) => theme.palette.primary.main,
                      boxShadow: 'none',

                      '&:hover': {
                        // fontWeight: "bold",
                        backgroundColor: 'primary.main',
                        color: 'white',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    Export
                  </Button>
                </Box>
                <Box mt="10px">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={saveMap}
                    sx={{
                      width: '100%',
                    }}
                  >
                    {mapData ? 'Update Map' : 'Save Map'}
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <LogoUploader logoFile={logoFile} setLogoFile={setLogoFile} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AlertSnackbar
        open={alertOpen}
        onClose={handleCloseAlert}
        severity={alertSeverity}
        message={alertMessage}
      />
      <LoginSignupModal
        open={openModal}
        handleClose={handleCloseModal}
        mode={modalMode}
      />
      <ConfirmModal
        open={openConfirm}
        handleClose={handleConfirmClose}
        handleConfirm={handleConfirmMap}
      />
      {loading && <LoadingSpinner />}
    </GoogleMapsLoader>
  );
}
