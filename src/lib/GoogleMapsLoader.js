import React from 'react';
import {useJsApiLoader} from '@react-google-maps/api';
import LoadingSpinner from "../components/LoadingSpinner";

const GoogleMapsLoader = ({ children }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY,
        libraries: ["places"]
    });

    if (!isLoaded) return <LoadingSpinner />;
    if (loadError) return <div>Error loading Maps</div>;

    return <>{children}</>;
};

export default GoogleMapsLoader;
