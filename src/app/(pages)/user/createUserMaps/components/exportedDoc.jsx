import { Box, Button, Typography } from '@mui/material';
import { GoogleMap, Marker } from '@react-google-maps/api';
import DOMPurify from 'dompurify';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import React, { useMemo, useEffect, useState, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useBoxOrder } from '@/context/ExportContext';
import { getMarkerIcon } from '@/lib/data';
import GoogleMapsLoader from '@/lib/GoogleMapsLoader';

const innerBoxStyles = {
  border: '1px dotted',
  borderColor: 'primary.main',
};

const ItemType = {
  BOX: 'BOX',
  CHILD: 'CHILD',
};

const defaultLogos = [
  '/img/nike.png',
  '/img/google.png',
  '/img/apple.png',
  '/img/ms.png',
  '/img/netflix.png',
];

const DraggableBox = ({ id, index, moveBox, children, sx }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType.BOX,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemType.BOX,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveBox(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const ref = (el) => {
    drag(el);
    drop(el);
  };

  return (
    <Box
      ref={ref}
      sx={{
        ...sx,
        border:
          isDragging || isOver
            ? isDragging
              ? '2px solid blue'
              : '2px solid green'
            : 'none',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </Box>
  );
};

const DraggableChild = ({ id, index, moveBox, children, sx }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType.CHILD,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemType.CHILD,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveBox(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const ref = (el) => {
    drag(el);
    drop(el);
  };

  return (
    <Box
      ref={ref}
      sx={{
        ...sx,
        border:
          isDragging || isOver
            ? isDragging
              ? '2px solid blue'
              : '2px solid green'
            : 'none',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </Box>
  );
};

export default function CustomPdf({ data, boxOrderContext = null }) {
  const { data: session } = useSession();
  const pdfRef = useRef(null);
  const [isGoogleMapsReady, setGoogleMapsReady] = useState(false);

  // console.log(data);
  const categories = useMemo(
    () => Object?.keys(data?.locationsByTag).map((cat) => cat) || [],
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

  // const dpi = 250;
  // const a4HeightMm = 297;
  // const pixelsPerMm = dpi / 27;
  // const maxHeightPx = a4HeightMm * pixelsPerMm;

  // const [boxOrderRows, setboxOrderRows] = useState([
  //   'mapinfo',
  //   'imgs',
  //   'textlogo',
  // ]);
  // const [boxOrderRow1, setBoxOrderRow1] = useState(['map', 'locations']);

  // const moveBox = (fromIndex, toIndex) => {
  //   const updatedOrder = [...boxOrderRow1];
  //   const [movedBox] = updatedOrder.splice(fromIndex, 1);

  //   updatedOrder.splice(toIndex, 0, movedBox);
  //   setBoxOrderRow1(updatedOrder);
  // };
  const context = useBoxOrder();
  const {
    boxOrderRow1 = [],
    moveBox1 = () => {},
    boxOrderRow3 = [],
    moveBox3 = () => {},
    boxOrderRows = [],
    moveRows = () => {},
  } = boxOrderContext || context || {};

  useEffect(() => {
    const checkGoogleMapsAvailability = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setGoogleMapsReady(true);
      } else {
        setTimeout(checkGoogleMapsAvailability, 100);
      }
    };

    checkGoogleMapsAvailability();
  }, []);

  // console.log(boxOrderContext);

  const exportMap = async () => {
    const canvas = await html2canvas(pdfRef.current, {
      useCORS: true,
      scale: 2,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'letter');
    const imgWidth = 216;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${data?.title}.pdf`);
  };

  return (
    <GoogleMapsLoader>
      {isGoogleMapsReady ? (
        <DndProvider backend={HTML5Backend}>
          <Box
            ref={pdfRef}
            sx={{
              height: '2400px',
              width: '1800px',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '50px',
              border: '2px dashed #ccc',
              m: '2rem',
            }}
          >
            {/* <Box> */}
            <Box
              sx={{
                padding: '1rem 2rem',
                borderBottom: '3px solid #000',
                display: 'flex',
                m: '1rem 0',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  // border: "5px dotted #000",
                  padding: '1.5rem 1rem',
                }}
              >
                {data?.title}
              </Typography>
            </Box>
            {boxOrderRows.map((boxid, ind) => (
              <DraggableBox
                key={ind}
                moveBox={moveRows}
                index={ind}
                sx={
                  boxid === 'mapinfo'
                    ? {
                      ...innerBoxStyles,
                      display: 'flex',
                      gap: '1rem',
                      m: '3rem 0 5rem',
                      height: '1000px',
                    }
                    : boxid === 'imgs'
                      ? {
                        ...innerBoxStyles,
                        display: 'flex',
                        gap: '1rem',
                        flexWrap: 'wrap',
                        marginBottom: 'auto',
                      }
                      : {
                        ...innerBoxStyles,
                        mt: '5rem',
                        display: 'flex',
                        gap: '3rem',
                      }
                }
              >
                {boxid === 'mapinfo' ? (
                  boxOrderRow1.map((boxId, index) => (
                    <DraggableChild
                      key={boxId}
                      index={index}
                      moveBox={moveBox1}
                      sx={{
                        flexBasis: boxId === 'map' ? '60%' : '40%', // Maintain the original flexBasis
                        overflow: boxId === 'map' ? 'hidden' : undefined, // Conditional overflow for the map
                        height: '100%',
                      }}
                    >
                      {boxId === 'map' ? (
                        <Box sx={{ overflow: 'hidden', height: '100%' }}>
                          <GoogleMap
                            id="search-box-example"
                            mapContainerStyle={{
                              width: '100%',
                              height: '100%',
                            }}
                            center={data?.currentLocation}
                            zoom={15}
                            options={{
                              disableDefaultUI: true,
                              draggable: false,
                            }}
                          >
                            <Marker position={data?.currentLocation} />
                            {allLocations.map((loc, index) => (
                              <Marker
                                key={index}
                                position={{
                                  lat: loc.latitude,
                                  lng: loc.longitude,
                                }}
                                icon={getMarkerIcon(
                                  data?.locationsByTag[loc?.tag]?.color,
                                  2
                                )}
                              />
                            ))}
                          </GoogleMap>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexWrap: 'wrap',
                            p: '1rem',
                          }}
                        >
                          {categories.map((cat) => {
                            const color = data?.locationsByTag[cat]?.color;
                            const locations =
                              data?.locationsByTag[cat]?.locations;

                            return (
                              <React.Fragment key={cat}>
                                <Typography
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    fontSize: '1.4rem',
                                    width: 'calc(33% - 0.75rem)',
                                    borderTop: '2px solid #cccbbb',
                                    p: '1rem 0 0 0',
                                    '& span': {
                                      display: 'block',
                                      height: '15px',
                                      width: '25px',
                                      backgroundColor: color,
                                      borderRadius: '6px',
                                      mr: '5px',
                                    },
                                    '&:not(:first-of-type)': {
                                      marginTop: '1rem',
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
                                        width: 'calc(33% - 1.5rem)',
                                        mr: '1.5rem',
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontSize: '1.4rem',
                                          lineHeight: '1.2',
                                          '& span': {
                                            fontSize: '1.2rem',
                                            ml: '0.6rem',
                                            color: '#9f9f9f',
                                          },
                                        }}
                                      >
                                        {loc?.name}
                                        <span>
                                          {loc?.distance.toFixed(2)} mi
                                        </span>
                                      </Typography>
                                    </Box>
                                  ))
                                ) : (
                                  <Typography sx={{ color: '#9f9f9f' }}>
                                    No locations selected
                                  </Typography>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </Box>
                      )}
                    </DraggableChild>
                  ))
                ) : boxid === 'imgs' ? (
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '2rem',
                      width: '100%',
                      flexWrap: 'wrap',
                    }}
                  >
                    {session?.user?.subscriptionType === 'BASIC' ? (
                      <>
                        {defaultLogos?.map((image, index) => (
                          <Box
                            key={index}
                            sx={{
                              position: 'relative',
                              height: '250px',
                              width: 'calc(20% - 2rem)',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Image
                              src={image}
                              alt={`Uploaded image ${index + 1}`}
                              height={250}
                              width={300}
                              style={{
                                borderRadius: '8px',
                                width: '100%',
                                objectFit: 'contain',
                              }}
                            />
                          </Box>
                        ))}
                      </>
                    ) : (
                      <>
                        {data?.oldImgs?.map((image, index) => (
                          <Box
                            key={index}
                            sx={{
                              position: 'relative',
                              height: '250px',
                              width: 'calc(20% - 2rem)',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Image
                              src={image.url}
                              alt={`Uploaded image ${index + 1}`}
                              height={250}
                              width={300}
                              style={{
                                borderRadius: '8px',
                                width: '100%',
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
                              height: '250px',
                              width: 'calc(20% - 2rem)',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Image
                              src={URL.createObjectURL(imgFile)}
                              alt={`Uploaded image ${index + 1}`}
                              height={250}
                              width={300}
                              style={{
                                borderRadius: '8px',
                                height: '100%',
                                width: '100%',
                                objectFit: 'contain',
                              }}
                            />
                          </Box>
                        ))}
                      </>
                    )}
                  </Box>
                ) : (
                  boxOrderRow3.map((boxId, index) => (
                    <DraggableChild
                      key={boxId}
                      index={index}
                      moveBox={moveBox3}
                      sx={{
                        flexBasis: boxId === 'text' ? '70%' : '30%',
                        overflow: boxId === 'logo' ? 'hidden' : undefined,
                        height: boxId === 'text' ? '100%' : '350px',
                        alignSelf: boxId === 'logo' ? 'flex-end' : '',
                      }}
                    >
                      {boxId === 'text' ? (
                        <Box dangerouslySetInnerHTML={{ __html: safeHTML }} />
                      ) : data?.logoFile?.name || data?.logoFile?.url ? (
                        <Box
                          sx={{
                            position: 'relative',
                            width: '450px',
                            height: '300px',
                          }}
                        >
                          <Image
                            src={
                              session?.user?.subscriptionType === 'BASIC'
                                ? '/img/mapmaven.jpeg'
                                : data?.logoFile?.name
                                  ? URL.createObjectURL(data?.logoFile)
                                  : data?.logoFile?.url
                            }
                            alt="Uploaded logo"
                            width={400}
                            height={400}
                            objectFit="contain"
                            style={{
                              borderRadius: '8px',
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                          />
                        </Box>
                      ) : null}
                    </DraggableChild>
                  ))
                )}
              </DraggableBox>
            ))}
          </Box>
          <Box sx={{ m: '2rem', display: 'flex' }}>
            <Box>
              <Button
                onClick={exportMap}
                sx={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  color: 'primary.main',
                  border: '1px solid',
                  borderColor: (theme) => theme.palette.primary.main,
                  boxShadow: 'none',

                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    boxShadow: 'none',
                  },
                }}
              >
                Export
              </Button>
            </Box>
          </Box>
        </DndProvider>
      ) : (
        <></>
      )}
    </GoogleMapsLoader>
  );
}
