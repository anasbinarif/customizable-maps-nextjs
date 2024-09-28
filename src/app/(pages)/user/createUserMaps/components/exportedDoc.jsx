import {Box, Typography} from '@mui/material';
import {GoogleMap, Marker,} from '@react-google-maps/api';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import React, {useMemo} from 'react';

import {getMarkerIcon} from '@/lib/data';
import GoogleMapsLoader from '@/lib/GoogleMapsLoader';

export default function CustomPdf({ data, customRef }) {
  const categories = useMemo(
    () => Object.keys(data?.locationsByTag).map((cat) => cat),
    [data]
  );

  const allLocations = useMemo(
    () =>
      Object.entries(data?.locationsByTag)
        .map(([, value]) => value.locations)
        .flat(),
    [data]
  );

  const safeHTML = DOMPurify.sanitize(data?.helperHtml, {
    ALLOWED_TAGS: ['h1', 'h2', 'p', 'ul', 'li'],
    ALLOWED_ATTR: [],
  });
  // console.log(data);
  // console.log(data?.locationsByTag);
  // console.log(categories);
  // console.log(allLocations);
  // console.log(safeHTML);

  const dpi = 250;
  const a4HeightMm = 297;
  const pixelsPerMm = dpi / 27;
  const maxHeightPx = a4HeightMm * pixelsPerMm;

  return (
    <GoogleMapsLoader>
      <Box
        sx={{
          height: maxHeightPx,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '50px',
        }}
        ref={customRef}
      >
        <Box>
          <Box
            sx={{
              padding: '1rem 2rem',
              borderBottom: '3px solid #000',
              display: 'flex',
              m: '1rem 0 3rem',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                // border: "5px dotted #000",
                padding: '0.5rem 1rem',
              }}
            >
              {data?.title}
            </Typography>
          </Box>
          <Box
            sx={{ display: 'flex', gap: '1rem', m: '4rem 0', height: '1200px' }}
          >
            <Box sx={{ flexBasis: '60%' }}>
              <GoogleMap
                id="search-box-example"
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={data?.currentLocation}
                zoom={15}
                options={{
                  disableDefaultUI: true, // To prevent any UI stretching
                }}
              >
                <Marker position={data?.currentLocation} />
                {allLocations.map((loc, index) => {
                  return (
                    <Marker
                      key={index}
                      position={{ lat: loc.latitude, lng: loc.longitude }}
                      icon={getMarkerIcon(
                        data?.locationsByTag[loc?.tag]?.color,
                        2
                      )}
                    />
                  );
                })}
              </GoogleMap>
            </Box>
            <Box
              sx={{
                //   mt: "1rem",
                //   backgroundColor: "blue",
                flexBasis: '40%',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
              }}
            >
              {categories.map((cat) => {
                const color = data?.locationsByTag[cat]?.color;
                const locations = data?.locationsByTag[cat]?.locations;

                return (
                  <Box
                    key={cat}
                    sx={{
                      width: '33%',
                      borderTop: '2px solid #b0b0b0',
                      p: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Typography
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontSize: '0.9rem',

                        '& span': {
                          display: 'block',
                          height: '10px',
                          width: '20px',
                          backgroundColor: color,
                          borderRadius: '6px',
                          mr: '15px',
                        },
                      }}
                    >
                      <span />
                      {cat}
                    </Typography>
                    {locations?.length > 0 ? (
                      locations.map((loc, index) => (
                        <Box
                          key={index}
                          sx={{
                            mt: '1rem',
                            display: 'flex',
                            alignItems: 'flex-end',
                            gap: '0.5rem',
                            flexWrap: 'wrap',

                            '& .MuiTypography-root': {
                              textWrap: 'wrap',
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              '& span': { fontSize: '0.8rem', ml: '0.6rem' },
                            }}
                          >
                            {loc?.name}
                            <span>{loc?.distance.toFixed(2)}m</span>
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography>No locations selected</Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              // height: "300px",
              // width: "300px",
            }}
          >
            {data?.oldImgs?.map((image, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  height: '300px',
                  width: '300px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={image.url}
                  alt={`Uploaded image ${index + 1}`}
                  // layout="responsive"
                  width={300}
                  height={300}
                  // objectFit="cover"
                  style={{
                    borderRadius: '8px',
                    height: '100%',
                    width: '100%',
                    // objectFit: "cover",
                    objectFit: 'contain',
                  }}
                />
              </Box>
            ))}
            {data?.newImgFiles?.map((imgFile, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  height: '300px',
                  width: '300px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={URL.createObjectURL(imgFile)}
                  alt={`Uploaded image ${index + 1}`}
                  layout="responsive"
                  width={150}
                  height={150}
                  objectFit="cover"
                  style={{
                    borderRadius: '8px',
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            ))}
          </Box>
          {data?.helperHtml && (
            <Box
              // sx={{ backgroundColor: "red" }}
              dangerouslySetInnerHTML={{ __html: safeHTML }}
            ></Box>
          )}
        </Box>
        <Box sx={{ mt: '5rem' }}>
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-start',
              m: '2rem',
            }}
          >
            {(data?.logoFile?.name || data?.logoFile?.url) && (
              <Box
                sx={{
                  position: 'relative',
                  width: '12rem',
                  height: '10rem',
                }}
              >
                <Image
                  src={
                    data?.logoFile?.name
                      ? URL.createObjectURL(data?.logoFile)
                      : data?.logoFile?.url
                  }
                  alt="Uploaded logo"
                  // layout="responsive"
                  width={150}
                  height={150}
                  objectFit="contain"
                  style={{
                    borderRadius: '8px',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            )}
          </Box>
          <Box
            sx={{
              padding: '1rem 2rem',
              borderTop: '3px solid #000',
              display: 'flex',
              m: '1rem 0 3rem',
            }}
          >
            Footer
          </Box>
        </Box>
      </Box>
    </GoogleMapsLoader>
  );
}
