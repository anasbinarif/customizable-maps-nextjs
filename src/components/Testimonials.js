'use client';
import {
  faChevronLeft,
  faChevronRight,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Container, Typography } from '@mui/material';
// import MobileStepper from '@mui/material/MobileStepper';
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';

// import { ThemeContext } from "@/context/ThemeContext";

// const StyledMobileStepper = styled(MobileStepper)(({ theme }) => ({
//   display: 'flex',
//   justifyContent: 'flex-end',
//   backgroundColor: 'transparent',
//   '.MuiMobileStepper-dot': {
//     backgroundColor: theme.palette.grey[400],
//   },
//   '.MuiMobileStepper-dotActive': {
//     backgroundColor: theme.palette.primary.main,
//   },
// }));

export default function Testimonials() {
  // const { darkMode } = useContext(ThemeContext);
  const sliderRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [activeHeight, setActiveHeight] = useState('auto');

  const testimonials = [
    {
      stars: 5,
      name: 'Bob Lafton',
      details:
        'This app made creating custom maps for my outdoor hiking trips incredibly easy. I was able to mark all my favorite spots and even share them with friends. It’s become a must-have for all my travel planning!',
      image: 'https://swiperjs.com/demos/images/nature-2.jpg',
      date: '30/01/24',
      socialIcons: [{ icon: '/Trustpilot.png', alt: 'Green Star' }],
    },
    {
      stars: 4,
      name: 'Sarah Peterson',
      details:
        'I absolutely love how easy it is to customize maps for my blog! As a travel writer, having the ability to create professional-looking maps in no time has made my content so much better. Highly recommend for any bloggers out there.',
      image: 'https://swiperjs.com/demos/images/nature-2.jpg',
      date: '30/01/24',
      socialIcons: [{ icon: '/Google.png', alt: 'Google' }],
    },
    {
      stars: 5,
      name: 'Michael Smith',
      details:
        'I needed a quick way to map out locations for an upcoming project and this app delivered. It’s fast, intuitive and doesn’t require a steep learning curve. Definitely a time saver!',
      image: 'https://swiperjs.com/demos/images/nature-3.jpg',
      date: '30/01/24',
      socialIcons: [{ icon: '/Trustpilot.png', alt: 'Green Star' }],
    },
    {
      stars: 4,
      name: 'David Lee',
      details:
        'Creating custom maps for my road trips has never been easier. The interface is smooth and I love the flexibility to add points of interest and tweak the layout. Definitely worth it if you enjoy planning your own adventures.',
      image: 'https://swiperjs.com/demos/images/nature-3.jpg',
      date: '30/01/24',
      socialIcons: [{ icon: '/Google.png', alt: 'Google' }],
    },
    {
      stars: 3,
      name: 'Alex Thompson',
      details:
        'AThis app saved me so much time when planning my Europe trip. Being able to search for places and organize my itinerary on a map was super helpful. I’ll be using it again for my next trip for sure.',
      image: 'https://swiperjs.com/demos/images/nature-3.jpg',
      date: '30/01/24',
      socialIcons: [{ icon: '/Trustpilot.png', alt: 'Green Star' }],
    },
    {
      stars: 3,
      name: 'Laura Collins',
      details:
        "I was skeptical at first, but this map tool really delivers. It's simple enough for beginners, but also offers advanced options for those who need more customization. Perfect for organizing my city tours.",
      image: 'https://swiperjs.com/demos/images/nature-3.jpg',
      date: '30/01/24',
      socialIcons: [{ icon: '/Google.png', alt: 'Google' }],
    },
  ];

  const transitionStyles = (curIndex, activeNum = 0) => {
    const centerNum = 100 * curIndex;
    const rightNum =
      curIndex === (activeNum + 1) % testimonials.length
        ? centerNum * -1 + 100
        : centerNum * 0 + 100;
    const leftNum =
      curIndex < activeNum &&
      activeNum !== 1 &&
      activeNum !== 2 &&
      (curIndex === 0 || curIndex === 1)
        ? centerNum * 2 + 100
        : centerNum * -1 - 100;

    const opacity =
      curIndex === activeNum ||
      curIndex === (activeNum + 1) % testimonials.length
        ? 1
        : 0;

    const styles = {
      left: { opacity: opacity, transform: `translateX(${leftNum}%)` },
      center: {
        opacity: opacity,
        transform: `translateX(${centerNum !== 0 ? '-' : ''}${centerNum}%)`,
      },
      right: { opacity: opacity, transform: `translateX(${rightNum}%)` },
    };

    return styles;
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setActiveStep((prevActiveStep) =>
        prevActiveStep === testimonials.length - 1 ? 0 : prevActiveStep + 1
      );
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [activeStep, testimonials.length]);

  useLayoutEffect(() => {
    if (sliderRef.current) {
      const children = sliderRef.current.childNodes;

      let maxHeight = 0;

      children.forEach((el) => {
        const list = Array.from(el.classList);

        if (list.includes('active')) {
          for (let i = 0; i < el.children.length; i++) {
            const child = el.children[i];

            maxHeight = maxHeight + child.clientHeight;
          }
        }
      });

      setActiveHeight(`${maxHeight}px`);
    }
  }, [activeStep]);

  // console.log(activeStep);
  // console.log(activeHeight);

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === testimonials.length - 1 ? 0 : prevActiveStep + 1
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0 ? testimonials.length - 1 : prevActiveStep - 1
    );
  };

  return (
    <Box
      sx={{
        fontSize: '1rem',
        padding: '5rem 0',
        display: 'flex',
        justifyContent: 'center',
        '& .MuiTypography-root': {
          fontSize: '1.6rem',
        },
      }}
    >
      <Container
        maxWidth={'xl'}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          position: 'relative',
          maxWidth: { xl: '70rem', lg: '55rem' },
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            maxWidth: { xl: '70rem', lg: '55rem' },
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box
            ref={sliderRef}
            sx={{
              display: 'flex',
              transition: 'all 300ms ease-in-out',
              marginBottom: '8rem',
              height: activeHeight,
              width: `${testimonials.length * 100}%`,
            }}
          >
            {testimonials.map((testimonial, index) => {
              return (
                <Box
                  key={index}
                  className={`${activeStep === index ? 'active' : ''}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    // justifyContent: 'stretch',
                    transition: 'all 300ms ease-in-out',
                    padding: '1rem',
                    maxHeight: '35rem',
                    overflow: 'hidden',
                    width: `${100 / testimonials.length / 2}%`,
                    ...(activeStep === 0 && index === testimonials.length - 1
                      ? transitionStyles(index, activeStep)['left']
                      : activeStep === testimonials.length - 1 && index === 0
                        ? transitionStyles(index, activeStep)['right']
                        : transitionStyles(index, activeStep)[
                          activeStep > index
                            ? 'left'
                            : activeStep === index
                              ? 'center'
                              : 'right'
                        ]),
                    alignSelf: 'flex-start',
                    '@media (max-width: 900px)': {
                      height: 'auto',
                      width: `${100 / testimonials.length}%`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      padding: '2rem',
                      borderRadius: '20px',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? 'rgba(255, 255, 255, 0.8)'
                          : 'rgba(0, 0, 0, 0.6)',

                      '& .MuiTypography-body1': {
                        fontSize: {
                          xl: '1.6rem',
                          lg: '1.6rem',
                          md: '1.6rem',
                          sm: '1.4rem',
                          xs: '1.2rem',
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        // alignItems: 'center',
                        paddingBottom: '2rem',
                        '& svg': {
                          fontSize: '2rem',
                          marginRight: '0.3rem',
                          color: `primary.main`,

                          '&.colorstar': {
                            color: 'gold',
                          },
                        },
                      }}
                    >
                      {Array.from({ length: 5 }, (_, i) => (
                        <FontAwesomeIcon
                          icon={faStar}
                          key={i}
                          className={`${
                            i < testimonial?.stars ? 'colorstar' : ''
                          }`}
                        />
                      ))}
                    </Box>
                    <Typography>{testimonial.details}</Typography>
                    <Box sx={{ paddingTop: '2rem' }}>
                      <Typography>{testimonial.name}</Typography>
                      <Typography>{testimonial.date}</Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            transform: 'translateY(-50%)',
            width: '100%',
            zIndex: '3',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            onClick={handleBack}
            sx={{
              left: '-8rem',
              width: '2rem',
              height: '6rem',
              boxShadow: 'none',
              '& svg': {
                // filter: `brightness(0%) ${
                //   theme.palette.mode === "dark" ? "invert(1)" : "invert(0)"
                // }`,
                height: '100%',
                width: '100%',
              },
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <Button
            onClick={handleNext}
            sx={{
              right: '-8rem',
              width: '2rem',
              height: '6rem',
              boxShadow: 'none',
              '& svg': {
                // filter: `brightness(0%) ${
                //   theme.palette.mode === "dark" ? "invert(1)" : "invert(0)"
                // }`,
                height: '100%',
                width: '100%',
              },
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
