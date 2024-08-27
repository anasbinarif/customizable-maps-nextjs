"use client";
import React, { useState, useEffect, useContext } from "react";
import { CardTravelSharp } from "@mui/icons-material";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext";
import { useTheme } from "@mui/material";

function getTransitionStyles(index, curIndex, len) {
  return index === curIndex
    ? {
        left: 0,
        top: 0,
        transform: "translate(0, 0)",
        borderRadius: 0,
        width: "100%",
        height: "100%",
        boxShadow: "none",

        "& .cardContent": {
          display: "block",
          zIndex: 5,
          position: "absolute",
          top: "20%",
          left: "100px",
          width: "450px",
          textAlign: "left",
          padding: 0,
          color: "#eee",
          // transform: "translate(0, -50%)",
          backgroundColor: "transparent",
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
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardData = [
    {
      imgSrc: "/img/home_map.jpg",
      name: "Cars",
      pkgs: [
        "Car Exterior Cleaning",
        "Interior Steam Cleaning",
        "Paint Polishing & Sealing",
        "High quality glass coating",
        "Paint Sealant and WaxGuard",
      ],
    },
    {
      imgSrc: "/img/home_map2.jpg",
      name: "All Types of Vehicle",
      pkgs: [
        "We also cater to caravans, campers, boats and trucks.",
        "The interior cleaning of a camper, caravan, boat and truck is no problem for us.",
        "Steam cleaning is a very efficient environmentally friendly way to clean your vehicles.",
      ],
    },
    {
      imgSrc: "/img/home_map3.jpg",
      name: "Bikes",
      pkgs: [
        "These are exposed to harsh weather conditions and endure a lot.",
        "Our steam cleaner, reaching a temperature of 180 °C, can clean even the the most difficult places.",
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

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

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
        display: "flex",
        alignItems: "center",
        minHeight: "80vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "2rem",

        "@media only screen and (max-width: 600px)": {
          padding: "1rem",
        },
      }}
    >
      <Container>
        <Box
          sx={{
            position: "relative",
            // left: "50%",
            // top: "65%",
            // transform: "translate(-50%, -50%)",
            width: "100%",
            // height: "100%",
            height: "600px",
            overflow: "hidden",
            // boxShadow: "0 0 2px 2px #dbdbdb",
            borderRadius: "20px",
            // backgroundColor: "red",
          }}
        >
          <Box
            sx={{
              width: "max-content",
              mt: "5rem",
            }}
          >
            {cardData.map((card, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    "--url": `url(${card.imgSrc})`,

                    width: "280px",
                    height: "160px",
                    background:
                      "linear-gradient(to bottom right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), var(--url)",
                    backgroundPosition: "50% 50%",
                    display: "block",
                    transition: "0.5s",
                    backgroundSize: "cover",
                    position: "absolute",
                    zIndex: 1,
                    top: "85%",
                    transform: "translate(0, -60%)",
                    borderRadius: "20px",
                    boxShadow: "0 0px 15px 1px #505050",
                    backgroundRepeat: "no-repeat",

                    // This is the card content div
                    "& .cardContent": {
                      display: "none",
                    },

                    cursor: currentIndex !== index ? "pointer" : "",
                    filter: currentIndex !== index ? "brightness(2)" : "",
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
                        fontSize: "2rem",
                        fontWeight: "bold",
                        opacity: 0,
                        animation: "showContent 1s ease-in-out forwards",
                        color: "#00c3ff",
                        marginBottom: "2rem",
                      }}
                    >
                      {card.name}
                    </Typography>
                    {card.pkgs.map((pkg, index) => (
                      <Box
                        key={pkg}
                        sx={{
                          width: "100%",
                          fontWeight: "bold",
                          // fontSize: "2.5rem",
                          opacity: 0,
                          animation:
                            "showContent 1s ease-in-out 0.3s 1 forwards",
                          margin: "0.5rem 0",
                        }}
                      >
                        <Typography
                          sx={{
                            textAlign: "left",
                            fontSize: "1rem",
                            fontWeight: "600",
                          }}
                        >
                          {pkg}
                        </Typography>
                      </Box>
                    ))}
                    <Button
                      sx={{
                        marginTop: "2rem",
                        fontWeight: "700",
                        opacity: 0,
                        animation: "showContent 1s ease-in-out 0.6s 1 forwards",

                        padding: "0.4rem 1rem",
                        borderRadius: "200px",
                        backgroundColor: "transparent",
                        border: `1px solid white`,
                        color: "white",
                        "&:hover": {
                          backgroundColor: "white",
                          color: "black",
                          // border: "none",
                        },
                        // color: theme.palette.primary.accent,
                        fontSize: "1rem",
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
