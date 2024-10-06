'use client';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function getTransitionStyles(index, curIndex, len) {
  return index === curIndex
    ? {
      left: 0,
      top: 0,
      transform: 'translate(0, 0)',
      borderRadius: 0,
      width: '100%',
      height: '100%',
      boxShadow: 'none',

      '& .cardContent': {
        display: 'block',
        zIndex: 5,
        position: 'absolute',
        top: '20%',
        left: {
          xl: '100px',
          lg: '100px',
          md: '100px',
          sm: '50px',
          xs: '15px',
        },
        right: {
          xl: '100px',
          lg: '100px',
          md: '100px',
          sm: '50px',
          xs: '15px',
        },
        // width: "450px",
        textAlign: 'left',
        padding: 0,
        color: '#eee',
        // transform: "translate(0, -50%)",
        backgroundColor: 'transparent',
      },
    }
    : index > curIndex
      ? {
        left: {
          xl: `calc(21% + ${305 * (index - curIndex)}px)`,
          lg: `calc(21% + ${305 * (index - curIndex)}px)`,
          md: `calc(14% + ${275 * (index - curIndex)}px)`,
          sm: `calc(-10% + ${275 * (index - curIndex)}px)`,
        },
        zIndex: index + 10,

        '@media only screen and (max-width: 1050px)': {
          left: `calc(12% + ${275 * (index - curIndex)}px)`,
        },
        '@media only screen and (max-width: 1000px)': {
          left: `calc(4% + ${275 * (index - curIndex)}px)`,
        },
        '@media only screen and (max-width: 950px)': {
          left: `calc(${275 * (index - curIndex)}px)`,
        },
        '@media only screen and (max-width: 900px)': {
          left: `calc(-47% + ${275 * (index - curIndex)}px)`,
        },
        '@media only screen and (max-width: 600px)': {
          left: `calc(-38% + ${220 * (index - curIndex)}px)`,
        },
        '@media only screen and (max-width: 550px)': {
          left: `calc(-40% + ${220 * (index - curIndex)}px)`,
        },
        '@media only screen and (max-width: 530px)': {
          left: `calc(-45% + ${220 * (index - curIndex)}px)`,
        },
        '@media only screen and (max-width: 500px)': {
          left: `calc(-35% + ${160 * (index - curIndex)}px)`,
        },
        '@media only screen and (max-width: 430px)': {
          left: `calc(-40% + ${160 * (index - curIndex)}px)`,
        },
        '@media only screen and (max-width: 400px)': {
          left: `calc(-40% + ${160 * (index - curIndex)}px)`,
        },
      }
      : {
        left: {
          xl: `calc(20% + ${305 * (len - 2) - (curIndex - index - 2) * 305}px)`,
          lg: `calc(20% + ${305 * (len - 2) - (curIndex - index - 2) * 305}px)`,
          md: `calc(14% + ${275 * (len - 2) - (curIndex - index - 2) * 275}px)`,
          sm: `calc(-10% + ${
            275 * (len - 2) - (curIndex - index - 2) * 275
          }px)`,
        },
        zIndex: index + 10,

        '@media only screen and (max-width: 1050px)': {
          left: `calc(12% + ${
            275 * (len - 2) - (curIndex - index - 2) * 275
          }px)`,
        },

        '@media only screen and (max-width: 1000px)': {
          left: `calc(4% + ${
            275 * (len - 2) - (curIndex - index - 2) * 275
          }px)`,
        },

        '@media only screen and (max-width: 950px)': {
          left: `calc(${275 * (len - 2) - (curIndex - index - 2) * 275}px)`,
        },
        '@media only screen and (max-width: 900px)': {
          left: `calc(-47% + ${
            275 * (len - 2) - (curIndex - index - 2) * 275
          }px)`,
        },
        '@media only screen and (max-width: 600px)': {
          left: `calc(-38% + ${
            220 * (len - 2) - (curIndex - index - 2) * 220
          }px)`,
        },
        '@media only screen and (max-width: 550px)': {
          left: `calc(-40% + ${
            220 * (len - 2) - (curIndex - index - 2) * 220
          }px)`,
        },
        '@media only screen and (max-width: 530px)': {
          left: `calc(-45% + ${
            220 * (len - 2) - (curIndex - index - 2) * 220
          }px)`,
        },
        '@media only screen and (max-width: 500px)': {
          left: `calc(-35% + ${
            160 * (len - 2) - (curIndex - index - 2) * 160
          }px)`,
        },
        '@media only screen and (max-width: 430px)': {
          left: `calc(-40% + ${
            160 * (len - 2) - (curIndex - index - 2) * 160
          }px)`,
        },
        '@media only screen and (max-width: 400px)': {
          left: `calc(-40% + ${
            160 * (len - 2) - (curIndex - index - 2) * 160
          }px)`,
        },
      };
}

export default function CarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardData = [
    {
      imgSrc: '/img/home_map.jpg',
      name: 'Neighborhood Guides',
      pkgs: [
        'Share your local neighborhood expertise',
        'create local guides to highlight your parks, restaurants and other places',
      ],
    },
    {
      imgSrc: '/img/home_map2.jpg',
      name: 'Gather real estate data',
      pkgs: [
        "Discover what's around you and map all the places of interest nearby!",
        'Explore local hotspots and hidden gems effortlessly with dynamic, interactive maps.',
        'Uncover your neighborhood’s best spots and visualize them on a user-friendly map.',
      ],
    },
    {
      imgSrc: '/img/home_map3.jpg',
      name: 'Tourism',
      pkgs: [
        'Explore top tourist attractions and hidden gems with interactive maps right at your fingertips!',
        'Discover and visualize your travel itinerary with ease, finding the best sights and experiences around you.',
      ],
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex, cardData.length]);

  const handleIndexChange = (index) => {
    if (index !== currentIndex) setCurrentIndex(index);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        // minHeight: "80vh",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',

        '@media only screen and (max-width: 600px)': {
          padding: '1rem',
        },
      }}
    >
      <Container
        sx={{
          maxWidth: {
            xs: '100%',
            sm: '600px',
            md: '1000px',
            lg: '1200px',
            xl: '1200px',
          },
          '@media only screen and (max-width: 450px)': {
            padding: 0,
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            // left: "50%",
            // top: "65%",
            // transform: "translate(-50%, -50%)",
            width: '100%',
            // height: "100%",
            height: {
              xl: '600px',
              lg: '600px',
              md: '600px',
              sm: '700px',
              xs: '800px',
            },
            overflow: 'hidden',
            // boxShadow: "0 0 2px 2px #dbdbdb",
            borderRadius: '20px',
            // backgroundColor: "red",
          }}
        >
          <Box
            sx={{
              width: 'max-content',
              mt: '5rem',
            }}
          >
            {cardData.map((card, index) => {
              return (
                <Box
                  key={index}
                  className={index === currentIndex ? 'active' : ''}
                  sx={{
                    '--url': `url(${card.imgSrc})`,

                    width: {
                      xl: '280px',
                      lg: '280px',
                      md: '250px',
                      sm: '250px',
                      xs: '200px',
                    },
                    height: {
                      xl: '160px',
                      lg: '160px',
                      md: '140px',
                      sm: '150px',
                      xs: '150px',
                    },
                    background:
                      'linear-gradient(to bottom right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), var(--url)',
                    backgroundPosition: '50% 50%',
                    display: 'block',
                    transition: '0.5s',
                    backgroundSize: 'cover',
                    position: 'absolute',
                    zIndex: 1,
                    top: {
                      xl: '85%',
                      lg: '85%',
                      md: '87%',
                      sm: '88%',
                      xs: '88%',
                    },
                    transform: 'translate(0, -60%)',
                    borderRadius: '20px',
                    boxShadow: '0 0px 15px 1px #505050',
                    backgroundRepeat: 'no-repeat',

                    '&:not(.active)': {
                      '@media only screen and (max-width: 500px)': {
                        width: '150px',
                      },
                    },

                    // This is the card content div
                    '& .cardContent': {
                      display: 'none',
                    },

                    cursor: currentIndex !== index ? 'pointer' : '',
                    filter: currentIndex !== index ? 'brightness(2)' : '',
                    ...getTransitionStyles(
                      index,
                      currentIndex,
                      cardData.length
                    ),
                  }}
                  onClick={() => handleIndexChange(index)}
                >
                  <div className="cardContent">
                    <Typography
                      sx={{
                        fontSize: {
                          xl: '2.4rem',
                          lg: '2.4rem',
                          md: '2rem',
                          sm: '1.8rem',
                          xs: '1.6rem',
                        },
                        fontWeight: 'bold',
                        opacity: 0,
                        animation: 'showContent 1s ease-in-out forwards',
                        color: 'primary.main2',
                        marginBottom: '2rem',
                      }}
                    >
                      {card.name}
                    </Typography>
                    {card.pkgs.map((pkg) => (
                      <Box
                        key={pkg}
                        sx={{
                          width: '100%',
                          fontWeight: 'bold',
                          // fontSize: "2.5rem",
                          opacity: 0,
                          animation:
                            'showContent 1s ease-in-out 0.3s 1 forwards',
                          margin: '0.5rem 0',
                          display: 'flex',
                          alignItems: 'center',

                          '& svg': {
                            color: 'primary.main2',
                            mr: '0.5rem',
                          },
                        }}
                      >
                        <CheckCircleIcon />
                        <Typography
                          sx={{
                            textAlign: 'left',
                            fontSize: {
                              xl: '1.4rem',
                              lg: '1.4rem',
                              md: '1.2rem',
                              sm: '1.2rem',
                              xs: '1rem',
                            },
                            fontWeight: '600',
                          }}
                        >
                          {pkg}
                        </Typography>
                      </Box>
                    ))}
                    <Link href="/user/createUserMaps">
                      <Button
                        sx={{
                          marginTop: '2rem',
                          fontWeight: '700',
                          opacity: 0,
                          animation:
                            'showContent 1s ease-in-out 0.6s 1 forwards',

                          padding: '0.4rem 1rem',
                          borderRadius: '200px',
                          backgroundColor: 'transparent',
                          border: `1px solid white`,
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'white',
                            color: 'primary.main',
                            // border: "none",
                          },
                          // color: theme.palette.primary.accent,
                          fontSize: '1rem',
                        }}
                      >
                        Create map
                      </Button>
                    </Link>
                  </div>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
