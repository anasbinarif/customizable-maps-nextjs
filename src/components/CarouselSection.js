'use client';
import { CardTravelSharp } from '@mui/icons-material';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { useTheme } from '@mui/material';
import Image from 'next/image';
import React, { useState, useEffect, useContext } from 'react';

import { ThemeContext } from '@/context/ThemeContext';

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
                left: '100px',
                width: '450px',
                textAlign: 'left',
                padding: 0,
                color: '#eee',
                // transform: "translate(0, -50%)",
                backgroundColor: 'transparent',
            },
        }
        : index > curIndex
            ? {
                left: `calc(21% + ${305 * (index - curIndex)}px)`,
                zIndex: index + 10,
            }
            : {
                left: `calc(21% + ${305 * (len - 2) - (curIndex - index - 2) * 305}px)`,
                zIndex: index + 10,
            };
}

export default function CarouselSection() {
    const { darkMode } = useContext(ThemeContext);
    const theme = useTheme();
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

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
    };

    const handlePrev = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length
        );
    };

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
            <Container>
                <Box
                    sx={{
                        position: 'relative',
                        // left: "50%",
                        // top: "65%",
                        // transform: "translate(-50%, -50%)",
                        width: '100%',
                        // height: "100%",
                        height: '600px',
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
                                    sx={{
                                        '--url': `url(${card.imgSrc})`,

                                        width: '280px',
                                        height: '160px',
                                        background:
                      'linear-gradient(to bottom right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), var(--url)',
                                        backgroundPosition: '50% 50%',
                                        display: 'block',
                                        transition: '0.5s',
                                        backgroundSize: 'cover',
                                        position: 'absolute',
                                        zIndex: 1,
                                        top: '85%',
                                        transform: 'translate(0, -60%)',
                                        borderRadius: '20px',
                                        boxShadow: '0 0px 15px 1px #505050',
                                        backgroundRepeat: 'no-repeat',

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
                                                fontSize: '2rem',
                                                fontWeight: 'bold',
                                                opacity: 0,
                                                animation: 'showContent 1s ease-in-out forwards',
                                                color: 'primary.main',
                                                marginBottom: '2rem',
                                            }}
                                        >
                                            {card.name}
                                        </Typography>
                                        {card.pkgs.map((pkg, index) => (
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
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        textAlign: 'left',
                                                        fontSize: '1rem',
                                                        fontWeight: '600',
                                                    }}
                                                >
                                                    {pkg}
                                                </Typography>
                                            </Box>
                                        ))}
                                        <Button
                                            sx={{
                                                marginTop: '2rem',
                                                fontWeight: '700',
                                                opacity: 0,
                                                animation: 'showContent 1s ease-in-out 0.6s 1 forwards',

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
                      Learn More
                                        </Button>
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
