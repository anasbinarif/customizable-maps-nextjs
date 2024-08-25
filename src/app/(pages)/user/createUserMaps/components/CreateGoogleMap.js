"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Autocomplete,
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import Image from "next/image";
import LocationList from "./LocationList";
import {
  FaUtensils,
  FaHotel,
  FaCamera,
  FaLandmark,
  FaBus,
  FaPrescriptionBottle,
  FaMoneyBillAlt,
  FaSchool,
  FaFilm,
} from "react-icons/fa";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSession } from "next-auth/react";
import AlertSnackbar from "@/components/AlertSnackbar";
import TextArea from "./TextArea";
import LoginSignupModal from "@/components/LoginSignupModal";
import ImageUploader from "./ImageUploader";
import { StyledTextField } from "@/components/CustomTextFields";
import { generateTextColor } from "@/lib/generateTextColor";
import GoogleMapsLoader from "@/lib/GoogleMapsLoader";

const iconStyle = {
  marginRight: "8px",
};

const buttonHoverStyle = {
  backgroundColor: "#f0f0f0",
};

const getMarkerIcon = (color) => {
  if (!color) return null;
  return {
    path: "M12 2C8.13 2 5 5.13 5 9c0 3.25 2.83 7.44 7.11 11.54.49.47 1.29.47 1.78 0C16.17 16.44 19 12.25 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z",
    fillColor: color,
    fillOpacity: 1,
    strokeColor: "#000",
    strokeWeight: 1,
    scale: 2,
    anchor: new window.google.maps.Point(12, 24),
  };
};

export default function CreateGoogleMap() {
  const { data: session, status } = useSession();
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
    name: "",
  });
  const [markers, setMarkers] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const autocompleteRef = useRef(null);
  const [zoom, setZoom] = useState(8);
  const [infoWindowHovered, setInfoWindowHovered] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("login");
  const [title, setTitle] = useState("");
  const [titleError, settitleError] = useState(false);
  const [loading, setLoading] = useState(false)

  const mapRef = useRef(null);

  const onLoad = useCallback((mapInstance) => {
    mapRef.current = mapInstance;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
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

  // Initialize locationsByTag with all available filters
  const [locationsByTag, setLocationsByTag] = useState({
    Restaurants: { color: "#FF9A8B", locations: [] },
    Hotels: { color: "#6AB2FF", locations: [] },
    "Things to do": { color: "#9CFF9C", locations: [] },
    Museums: { color: "#FDF5A0", locations: [] },
    Transit: { color: "#B5EAF2", locations: [] },
    Pharmacies: { color: "#B99DFF", locations: [] },
    ATMs: { color: "#66D0C9", locations: [] },
    Schools: { color: "#FF9EC4", locations: [] },
    Entertainment: { color: "#FFB46F", locations: [] },
  });

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
      handleOpenAlert("info", "Login before saving a map!");
      return;
    }
    if (!title) {
      settitleError(true);
      handleOpenAlert("warning", "Map title is required!");
      return;
    }
    setLoading(true)

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
      title: title,
      pinLocation: {
        latitude: currentLocation.lat,
        longitude: currentLocation.lng,
        name: currentLocation.name,
        imageUrl: pinLocationImage,
      },
      locations: locationsToSave,
      userEmail,
    };
    try {
      const response = await fetch("/api/saveUserMap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        handleOpenAlert("success", "Map saved successfully!");
        setLoading(false);
        setSelectedFilters([]);
        setMarkers([])
        setActiveMarker(null)
        setLocationsByTag({
          Restaurants: { color: "#FF9A8B", locations: [] },
          Hotels: { color: "#6AB2FF", locations: [] },
          "Things to do": { color: "#9CFF9C", locations: [] },
          Museums: { color: "#FDF5A0", locations: [] },
          Transit: { color: "#B5EAF2", locations: [] },
          Pharmacies: { color: "#B99DFF", locations: [] },
          ATMs: { color: "#66D0C9", locations: [] },
          Schools: { color: "#FF9EC4", locations: [] },
          Entertainment: { color: "#FFB46F", locations: [] },
        })
      } else {
        alert("Failed to save the map.");
        handleOpenAlert("error", "Failed to save the map.");
        setLoading(false);
      }
    } catch (error) {
      handleOpenAlert("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) => {
          const pos = { lat, lng, name: `Lat: ${lat}, Lng: ${lng}` };
          setCurrentLocation(pos);
          setZoom(14);
        }
      );
    }
  }, []);

  const handleLocationClick = (location) => {
    setLocationsByTag((prevTags) => {
      const updatedTag = {
        ...prevTags[location.tag],
        locations: [...prevTags[location.tag]?.locations, location],
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
      setMarkers([{ lat, lng, name: place.name }]);
      setTitle(place.formatted_address || "");
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const onMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentLocation({ lat, lng, name: "Selected Location" });
    setMarkers([{ lat, lng, name: "Selected Location" }]);
  };

  const searchNearbyPlaces = (filters) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    let accumulatedMarkers = [];

    const promises = filters.map((filter) => {
      return new Promise((resolve) => {
        service.nearbySearch(
          {
            location: currentLocation,
            radius: 5000,
            type: filter.type,
          },
          (results, status) => {
            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
              results
            ) {
              const newMarkers = results.map((place) => ({
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
              }));
              accumulatedMarkers = accumulatedMarkers.concat(newMarkers);
            }
            resolve();
          }
        );
      });
    });

    Promise.all(promises).then(() => {
      setMarkers(accumulatedMarkers);
    });
  };

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
    setSelectedFilters(updatedFilters);
    searchNearbyPlaces(updatedFilters);
  };

  // Example filter buttons with icons and unique selection colors
  const filters = [
    {
      name: "Restaurants",
      type: "restaurant",
      icon: <FaUtensils style={iconStyle} />,
      selectedColor: "#FF9A8B",
    },
    {
      name: "Hotels",
      type: "lodging",
      icon: <FaHotel style={iconStyle} />,
      selectedColor: "#6AB2FF",
    },
    {
      name: "Things to do",
      type: "tourist_attraction",
      icon: <FaCamera style={iconStyle} />,
      selectedColor: "#9CFF9C",
    },
    {
      name: "Museums",
      type: "museum",
      icon: <FaLandmark style={iconStyle} />,
      selectedColor: "#FDF5A0",
    },
    {
      name: "Transit",
      type: "transit_station",
      icon: <FaBus style={iconStyle} />,
      selectedColor: "#B5EAF2",
    },
    {
      name: "Pharmacies",
      type: "pharmacy",
      icon: <FaPrescriptionBottle style={iconStyle} />,
      selectedColor: "#B99DFF",
    },
    {
      name: "ATMs",
      type: "atm",
      icon: <FaMoneyBillAlt style={iconStyle} />,
      selectedColor: "#66D0C9",
    },
    {
      name: "Schools",
      type: "school",
      icon: <FaSchool style={iconStyle} />,
      selectedColor: "#FF9EC4",
    },
    {
      name: "Entertainment",
      type: "movie_theater",
      icon: <FaFilm style={iconStyle} />,
      selectedColor: "#FFB46F",
    },
  ];

  const handleMarkerMouseOver = (marker) => {
    setActiveMarker(marker);
  };

  const handleMarkerMouseOut = () => {
    if (!infoWindowHovered) {
      setActiveMarker(null);
    }
  };

  return (
    <GoogleMapsLoader>
      <Grid container spacing={3}>
        {/* Map section */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 4.5rem",
              flexWrap: "wrap",
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
              helperText="Please enter title"
              sx={{
                width: "20%",
              }}
            />
            <Box mt="10px">
              <Button
                variant="contained"
                color="primary"
                onClick={saveMap}
                sx={{
                  width: "100%",
                }}
              >
                Save Map
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
              flexWrap: "wrap",
            }}
          >
            {filters.map((filter) => {
              const isSelected = selectedFilters.some(
                (selectedFilter) => selectedFilter.type === filter.type
              );
              return (
                <Button
                  key={filter.type}
                  variant={isSelected ? "contained" : "outlined"}
                  color="primary"
                  startIcon={filter.icon}
                  sx={{
                    margin: "5px",
                    borderRadius: "50px",
                    backgroundColor: isSelected
                      ? filter.selectedColor
                      : "primary.bgHero",
                    color: isSelected
                      ? generateTextColor(filter.selectedColor)
                      : "primary.main",

                    "&:hover": {
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
            mapContainerStyle={{ width: "100%", height: "70vh" }}
            center={currentLocation}
            zoom={zoom}
            onClick={onMapClick}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker position={currentLocation} />
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={getMarkerIcon(marker.color)}
                onMouseOver={() => handleMarkerMouseOver(marker)}
                onClick={() =>
                  handleLocationClick({
                    name: marker.name,
                    tag: marker.type,
                    latitude: marker.lat,
                    longitude: marker.lng,
                  })
                }
              >
                {activeMarker &&
                  activeMarker.lat === marker.lat &&
                  activeMarker.lng === marker.lng && (
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
                          maxWidth: "250px",
                          padding: 0,
                          overflow: "hidden",
                          margin: 0,
                          maxHeight: "200px",
                        }}
                      >
                        {marker.photo && (
                          <Image
                            src={marker.photo}
                            alt={marker.name}
                            width={250}
                            height={70}
                            style={{
                              display: "block",
                              width: "100%",
                              borderRadius: "8px 8px 0 0",
                            }}
                          />
                        )}
                        <Box sx={{ padding: "8px" }}>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ fontSize: "16px", fontWeight: "bold" }}
                          >
                            {marker.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ fontSize: "14px", marginTop: "4px" }}
                          >
                            {marker.vicinity}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ fontSize: "14px", marginTop: "4px" }}
                          >
                            Rating: {marker.rating} ({marker.userRatingsTotal}{" "}
                            reviews)
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "14px",
                              color: marker.isOpen ? "green" : "red",
                              marginTop: "4px",
                            }}
                          >
                            {marker.isOpen ? "Open Now" : "Closed"}
                          </Typography>
                          {marker.openingHours && (
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              sx={{ fontSize: "14px", marginTop: "4px" }}
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
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
              types={["geocode"]}
            >
              <StyledTextField
                placeholder="Search for a place"
                sx={{
                  boxSizing: "border-box",
                  width: "240px",
                  height: "32px",
                  padding: "0 12px",
                  position: "absolute",
                  top: "0.5rem",
                  left: "50%",
                  transform: "translate(-50%, 0)",
                }}
                variant="outlined"
              />
            </Autocomplete>
          </GoogleMap>
          <ImageUploader />
          <TextArea />
        </Grid>
        {/* Location List section */}
        <Grid item xs={3}>
          <LocationList
            locationsByTag={locationsByTag}
            handleDelete={handleDelete}
          />
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
      {loading && <LoadingSpinner />}
    </GoogleMapsLoader>
  );
}
