"use client";
import React, {useContext, useEffect, useLayoutEffect, useRef, useState,} from "react";
import MobileStepper from "@mui/material/MobileStepper";
import {Box, Container, styled, Typography,} from "@mui/material";
import {ThemeContext} from "@/context/ThemeContext";

const StyledMobileStepper = styled(MobileStepper)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  backgroundColor: "transparent",
  ".MuiMobileStepper-dot": {
    backgroundColor: theme.palette.grey[400],
  },
  ".MuiMobileStepper-dotActive": {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Testimonials() {
  const { darkMode } = useContext(ThemeContext);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeHeight, setActiveHeight] = useState("auto");

  const testimonials = [
    {
      name: "John Doe",
      feedback:
        "This is an amazing product! Highly recommend it to everyone. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet.",
      image: "https://swiperjs.com/demos/images/nature-1.jpg",
      date: "30/01/24",
    },
    {
      name: "Jane Smith",
      feedback:
        "I loved it. The quality is top-notch and the support is fantastic.",
      image: "https://swiperjs.com/demos/images/nature-2.jpg",
      date: "30/01/24",
    },
    {
      name: "Alex Johnson",
      feedback: "A great experience overall. Exceeded my expectations.",
      image: "https://swiperjs.com/demos/images/nature-3.jpg",
      date: "30/01/24",
    },
    {
      name: "Alex Johnson",
      feedback: "A great experience overall. Exceeded my expectations.",
      image: "https://swiperjs.com/demos/images/nature-3.jpg",
      date: "30/01/24",
    },
    {
      name: "Alex Johnson",
      feedback: "A great experience overall. Exceeded my expectations.",
      image: "https://swiperjs.com/demos/images/nature-3.jpg",
      date: "30/01/24",
    },
    {
      name: "Alex Johnson",
      feedback: "A great experience overall. Exceeded my expectations.",
      image: "https://swiperjs.com/demos/images/nature-3.jpg",
      date: "30/01/24",
    },
  ];

  const transitionStyles = (activeNum) => {
    const centerNum = 100 * activeNum;
    const rightNum = centerNum * -1 + 100;
    const leftNum = centerNum * -1 - 100;

    return {
      left: {opacity: 0, transform: `translateX(${leftNum}%)`},
      center: {
        opacity: 1,
        transform: `translateX(${centerNum !== 0 ? "-" : ""}${centerNum}%)`,
      },
      right: {opacity: 0, transform: `translateX(${rightNum}%)`},
    };
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentIndex((prevActiveStep) =>
        prevActiveStep === testimonials.length - 1 ? 0 : prevActiveStep + 1
      );
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentIndex, testimonials.length]);

  useLayoutEffect(() => {
    if (sliderRef.current) {
      const children = sliderRef.current.childNodes;
      let height = 0;

      children.forEach((el) => {
        const list = Array.from(el.classList);
        if (list.includes("active")) {
          for (let i = 0; i < el.children.length; i++) {
            // console.log(el.children[i].offsetHeight);
            height += el.children[i].offsetHeight;
          }
          // console.log(height);
          setActiveHeight(`${height + 100}px`);
        }
      });
    }
  }, [currentIndex]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        // minHeight: "80vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "2rem",

        "@media only screen and (max-width: 600px)": {
          padding: "1rem",
        },
      }}
    >
      <Container sx={{ display: "flex" }}>
        <Box
          sx={{
            padding: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: theme.palette.background.paper,
            flexBasis: "50%",
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1, display: "flex" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }} align="center">
              MAP YOUR WORLD...YOUR WAY!
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            padding: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: theme.palette.background.default,
          }}
        >
          <Box sx={{ width: "50%", flexGrow: 1 }}>
            <Box
              sx={{
                maxWidth: "70rem",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box
                ref={sliderRef}
                sx={{
                  display: "flex",
                  transition: "all 300ms ease-in-out",
                  marginBottom: "8rem",
                  alignSelf: "flex-start",
                  height: activeHeight,
                  width: `${testimonials.length * 100}%`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      transition: "all 300ms ease-in-out",
                      padding: "1rem",
                      backgroundImage: !darkMode
                        ? "url('https://cdn.prod.website-files.com/667d4cb2a5160e521941d969/667d4cb2a5160e521941d9b8_Ellipse%2012.webp'), url('https://cdn.prod.website-files.com/667d4cb2a5160e521941d969/667d4cb2a5160e521941d9b7_Noise%20%26%20Texture.webp')"
                        : "url('https://cdn.prod.website-files.com/667d4cb2a5160e521941d969/667d4cb2a5160e521941d9b8_Ellipse%2012.webp'), url('https://cdn.prod.website-files.com/667d4cb2a5160e521941d969/667d4cb2a5160e521941d9b7_Noise%20%26%20Texture.webp')",
                      backgroundPosition: "0 0, 0 0",
                      backgroundSize: "cover",
                      borderRadius: "16px",
                      border: darkMode
                        ? "1px solid rgba(255, 255, 255, 0.45)"
                        : "1px solid rgba(0, 0, 0, 0.45)",
                      overflow: "hidden",
                      width: `${100 / testimonials.length}%`,
                      ...(currentIndex === 0 &&
                      index === testimonials.length - 1
                        ? transitionStyles(index)["left"]
                        : currentIndex === testimonials.length - 1 &&
                          index === 0
                        ? transitionStyles(index)["right"]
                        : transitionStyles(index)[
                            currentIndex > index
                              ? "left"
                              : currentIndex === index
                              ? "center"
                              : "right"
                          ]),
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        alignSelf: "flex-start",
                      }}
                    >
                      <Typography>{testimonial.feedback}</Typography>
                      <Typography>{testimonial.name}</Typography>
                      <Typography>{testimonial.date}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <StyledMobileStepper
              steps={testimonials.length}
              position="static"
              activeStep={currentIndex}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
