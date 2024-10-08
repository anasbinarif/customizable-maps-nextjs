'use client';
import {Box} from '@mui/material';
import Cookies from 'js-cookie';
import {useEffect, useState} from 'react';

import CreateGoogleMap from '../components/create-google-map/CreateGoogleMap';

async function fetchData(id, sessionToken) {
  try {
    const response = await fetch(`/api/getMap/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `next-auth.session-token=${sessionToken};path=/;expires=Session`,
      },
      credentials: 'include',
    });
    const responseData = await response.json();

    if (!responseData.map) throw new Error('Map not found');

    return responseData.map;
  } catch (err) {
    return null;
  }
}

export default function ListMaps({ params }) {
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const sessionToken = Cookies.get('next-auth.session-token');
    const { id } = params;

    async function fetchMap() {
      const map = await fetchData(id, sessionToken);

      setMapData(map);
    }

    fetchMap().then(() => setLoading(false));
  }, [params]);

  return (
    <Box
      sx={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '1rem 2rem',
        minHeight: '90vh',
      }}
    >
      {!loading && <CreateGoogleMap mapData={mapData} />}
    </Box>
  );
}
