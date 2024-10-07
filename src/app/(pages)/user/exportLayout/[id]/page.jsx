'use client';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import CustomPdf from '../../createUserMaps/components/exportedDoc';

import { haversineDistance } from '@/lib/data';

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

export default function ExportPage({ params }) {
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const sessionToken = Cookies.get('next-auth.session-token');
    const { id } = params;

    async function fetchMap() {
      const map = await fetchData(id, sessionToken);

      // console.log(map);
      const locationsByTag = map.locations.reduce((acc, location) => {
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

      // console.log(locationsByTag);

      const data = {
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
      };

      setMapData(data);
    }

    fetchMap().then(() => setLoading(false));
  }, [params]);

  // console.log(mapData);

  return (
    <Box>
      {!loading && mapData && <CustomPdf data={mapData} customRef={null} />}
    </Box>
  );
}
