'use client';
import {faCheckCircle, faChevronDown, faChevronUp,} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Box, Container, List, Typography, useTheme} from '@mui/material';
import React, {useState} from 'react';

export const packages = [
  {
    name: 'Package 1',
    packages: ['Point 1', 'Point 2', 'Point 3'],
    totalDuration: '24 Months',
    duration: '± 45 min.',
    price: '€ 59.95',
    durationOptions: [
      { duration: '24 months', additionalCost: 0 },
      { duration: '12 months', additionalCost: 5.0 },
      { duration: 'Monthly', additionalCost: 10.0 },
    ],
  },
  {
    name: 'Package 2',
    packages: ['Point 1', 'Point 2', 'Point 3'],
    totalDuration: '24 Months',
    duration: '± 90~120 min.',
    price: '€ 94.95',
    durationOptions: [
      { duration: '24 months', additionalCost: 0 },
      { duration: '12 months', additionalCost: 5.0 },
      { duration: 'Monthly', additionalCost: 10.0 },
    ],
  },
  {
    name: 'Package 3',
    packages: ['Point 1', 'Point 2', 'Point 3'],
    totalDuration: '24 Months',
    duration: '± 60 min.',
    price: '€ 69.95',
    durationOptions: [
      { duration: '24 months', additionalCost: 0 },
      { duration: '12 months', additionalCost: 5.0 },
      { duration: 'Monthly', additionalCost: 10.0 },
    ],
  },
];

const AutoTab = ({ pkg, index, color }) => {
  const [duration, setDuration] = useState(false);

  return (
    <Box
      sx={{
        minHeight: '40rem',
        // height: "200rem",
        width: '27rem',
        position: 'relative',
        perspective: '150rem',
        cursor: 'pointer',

        '&.selected': {
          '& .tab__side--back': {
            transform: 'rotateY(0)',
          },

          '& .tab__side--front': {
            transform: 'rotateY(-180deg)',
          },
        },

        '& .tab__side': {
          //   backgroundColor: theme.palette.primary.main,
          textAlign: 'left',
          height: '100%',
          width: '100%',
          transition: 'all 0.8s ease',
          position: 'absolute',
          top: 0,
          left: 0,
          backfaceVisibility: 'hidden',
          borderRadius: '10px',
          // borderRadius: "3px",
          overflow: 'hidden',
          boxShadow: '0 1.5rem 4rem rgba(0,0,0,0.15)',

          '&--front': {
            // backgroundColor:
            //   theme.palette.mode === "light"
            //     ? `${theme.palette.primary.main}90`
            //     : `${theme.palette.primary.main}99`,
            backdropFilter: 'blur(30px)',
          },

          '&--back': {
            transform: 'rotateY(180deg)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            '&-1': {
              backgroundImage:
                'linear-gradient(to right bottom, #7ed56f, #28b485)',
            },
            '&-2': {
              backgroundImage:
                'linear-gradient(to right bottom, #2998ff, #5643fa)',
            },
            '&-3': {
              backgroundImage:
                'linear-gradient(to right bottom, #ffb900, #ff7730)',
            },
          },
        },

        '& .tab__picture': {
          backgroundSize: 'cover',
          height: '12rem',
          backgroundBlendMode: 'screen',
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
          borderRadius: '3px 3px 0 0',

          '&--1': {
            backgroundImage:
              'linear-gradient(to right bottom, #7ed56f, #28b485),url(/img/home_map7.jpg)',
          },
          '&--2': {
            backgroundImage:
              'linear-gradient(to right bottom, #2998ff, #5643fa),url(/img/home_map6.jpg)',
          },
          '&--3': {
            backgroundImage:
              'linear-gradient(to right bottom, #ffb900, #ff7730),url(/img/home_map5.jpg)',
          },
        },

        '& .MuiTypography-root.heading': {
          fontSize: '1.5rem',
          fontWeight: 300,
          textTransform: 'uppercase',
          textAlign: 'right',
          color: '#fff',
          position: 'absolute',
          top: '8rem',
          right: '0rem',
          width: '75%',

          '& .heading--span': {
            padding: '1rem 1.5rem',
            '&-1': {
              backgroundImage:
                'linear-gradient(to right bottom, rgba(126, 213, 111, 0.85), rgba(40, 180, 133, 0.85))',
            },
            '&-2': {
              backgroundImage:
                'linear-gradient(to right bottom, rgba(41, 152, 255, 0.85), rgba(86, 67, 250, 0.85))',
            },
            '&-3': {
              backgroundImage:
                'linear-gradient(to right bottom, rgba(255,185,0,0.85), rgba(255,119,48,0.85))',
            },
          },
        },

        '& .tab__cta': {
          textAlign: 'center',
          color: '#fff',
          marginBottom: '4rem',

          '& .tab__price': {
            fontSize: '1rem',
            textTransform: 'uppercase',
          },

          '& .tab__value': {
            fontSize: '1rem',
            fontWeight: '100',
            //   color: "#ffffffdd",
          },
        },
      }}
    >
      <div
        className="tab__side tab__side--front"
        style={{ position: 'relative' }}
      >
        <div className={`tab__picture tab__picture--${index + 1}`}></div>
        <Typography className="heading">
          <span className={`heading--span heading--span-${index + 1}`}>
            {pkg.name}
          </span>
        </Typography>

        <Box sx={{ marginBottom: '8px' }}>
          <Typography
            sx={{
              color: 'primary.text1',
              fontSize: '1.2rem',
              textAlign: 'center',
              transform: 'translateY(10px)',
            }}
          >
            FROM
          </Typography>
          <Typography
            sx={{
              fontSize: '3rem',
              textAlign: 'center',
              fontWeight: '900',
            }}
          >
            {pkg.price}
          </Typography>
          <Typography
            sx={{
              color: 'primary.text1',
              fontSize: '1.5rem',
              textAlign: 'center',
            }}
          >
            {pkg.duration}
          </Typography>
        </Box>

        <List
          sx={{
            //   height: "100%",
            display: 'flex',
            flexDirection: 'column',
            '& li': {
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: '1.5rem',
              padding: '1rem',

              '&:not(:last-child)': {
                borderBottom: '1px solid #eee',
              },
            },
            padding: '8px 0',
            margin: '0 2rem',
            width: '100%',
            height: '100%',
            justifyContent: 'flex-start',
          }}
        >
          {pkg.packages.map((item) => (
            <Box
              key={item}
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: '',
                padding: '2px 0',
              }}
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                style={{
                  color: color,
                  marginRight: '1rem',
                  transform: 'translateY(2px)',
                }}
              />
              <Typography sx={{ textAlign: 'left' }}>{item}</Typography>
            </Box>
          ))}
        </List>

        {pkg.durationOptions && (
          <Box
            sx={{
              borderTop: '1px solid #00000020',
              margin: '0 2rem',
              padding: '2rem 0 1rem',
            }}
          >
            <Typography
              onClick={() => setDuration(!duration)}
              sx={{
                fontSize: '1.5rem',
                textAlign: 'center',
                fontWeight: '900',
              }}
            >
              Extra options
              {duration ? (
                <FontAwesomeIcon
                  icon={faChevronUp}
                  style={{ marginLeft: '6px' }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faChevronDown}
                  style={{ marginLeft: '6px' }}
                />
              )}
            </Typography>
            {duration && (
              <List
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',

                  '& li': {
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    padding: '1rem',

                    '&:not(:last-child)': {
                      borderBottom: '1px solid #eee',
                    },
                  },
                  padding: '8px 0',
                  margin: '0',
                  width: '100%',
                }}
              >
                {pkg.durationOptions?.map((item) => (
                  <Box
                    key={item.duration}
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: '',
                      padding: '4px 0',
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: 'left',
                        textWrap: 'nowrap',
                      }}
                    >
                      {item.duration}
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: 'right',
                        width: '100%',
                        fontWeight: 'bold',
                        color: 'primary.accent',
                      }}
                    >
                      {item.additionalCost === 0 ? '' : `+ `}€{' '}
                      {item.additionalCost.toFixed(1)}
                    </Typography>
                  </Box>
                ))}
              </List>
            )}
          </Box>
        )}
      </div>
    </Box>
  );
};

export default function CarouselSection() {
  const theme = useTheme();
  const color = theme.palette.primary.main;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
        '@media only screen and (max-width: 600px)': {
          padding: '1rem',
        },
      }}
    >
      <Container
        style={{
          padding: 0,
        }}
        sx={{
          display: 'flex',
          backgroundColor: 'primary.bgHero',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: 'var(--heroShadow)',
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5rem',
            padding: '5rem',
            width: '100%',
            minWidth: '700px',
          }}
        >
          {packages.map((pkg, index) => (
            <AutoTab key={index} pkg={pkg} index={index} color={color} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
