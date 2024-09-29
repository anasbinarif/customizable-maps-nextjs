'use client';
import {
  faStar,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Container, Typography, Button } from '@mui/material';
// import MobileStepper from '@mui/material/MobileStepper';
import React, {
  // useContext,
  // useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

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
      name: 'Igor Dotsenko',
      details:
        'I ordered exterior washing a few times already. Both times washerman arrived in time and did the work very well and professionally.',
      image: 'https://swiperjs.com/demos/images/nature-1.jpg',
      date: '30/01/24',
      socialIcons: [{ icon: '/Trustpilot.png', alt: 'Green Star' }],
    },
    {
      stars: 5,
      name: 'Jane Smith',
      details:
        'They catered to the delicate paint job and i hope to come back in the future',
      image: 'https://swiperjs.com/demos/images/nature-2.jpg',
      date: '30/01/24',
      socialIcons: [{ icon: '/Google.png', alt: 'Google' }],
    },
    {
      stars: 5,
      name: 'Katherina',
      details:
        'Very professional service, prompt response and flexible. We’d definitely recommend. ',
      image: 'https://swiperjs.com/demos/images/nature-3.jpg',
      date: '30/01/24',
      socialIcons: [{ icon: '/Trustpilot.png', alt: 'Green Star' }],
    },
    {
      stars: 4,
      name: 'Steven',
      details:
        'They are passionate about detailing, but most importantly do an amazing job.',
      image: 'https://swiperjs.com/demos/images/nature-3.jpg',
      date: '30/01/24',
      socialIcons: [{ icon: '/Google.png', alt: 'Google' }],
    },
    {
      stars: 3,
      name: 'Alex Johnson',
      details: 'A great experience overall. Exceeded my expectations.',
      image: 'https://swiperjs.com/demos/images/nature-3.jpg',
      date: '30/01/24',
      socialIcons: [{ icon: '/Trustpilot.png', alt: 'Green Star' }],
    },
    {
      stars: 3,
      name: 'Alex Johnson',
      details: 'A great experience overall. Exceeded my expectations.',
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

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setActiveStep((prevActiveStep) =>
  //       prevActiveStep === testimonials.length - 1 ? 0 : prevActiveStep + 1
  //     );
  //   }, 3000);

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [activeStep, testimonials.length]);

  useLayoutEffect(() => {
    if (sliderRef.current) {
      const children = sliderRef.current.childNodes;

      let maxHeight = 0;

      let indexActive = null;

      children.forEach((el, index) => {
        const isActive = el.classList.contains('active');

        if (isActive) {
          indexActive = index;
        }

        const { height } = el.getBoundingClientRect();
        const tempHeight = height;

        if (isActive || index === indexActive + 1) {
          maxHeight = Math.max(maxHeight, tempHeight);
        }
      });

      setActiveHeight(`${maxHeight + 30}px`);
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
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          position: 'relative',
        }}
      >
        <Box
          sx={{ maxWidth: '70rem', overflow: 'hidden', position: 'relative' }}
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
                    // justifyContent: "center",
                    transition: 'all 300ms ease-in-out',
                    padding: '1rem',
                    height: '23rem',
                    overflow: 'hidden',
                    // backgroundColor:
                    //   theme.palette.mode === "light"
                    //     ? "rgba(255, 255, 255, 0.8)"
                    //     : "rgba(0, 0, 0, 0.6)", // Light mode: minimal opacity; Dark mode: further reduced opacity
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
                    background: 'none',
                    border: 'none',
                    alignSelf: 'flex-start',
                    justifyContent: 'stretch',
                    '@media (max-width: 900px)': {
                      height: 'auto',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 300ms ease-in-out',
                      padding: '2rem',
                      borderRadius: '21px',
                      // backdropFilter: "blur(14px)",
                      boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                      overflow: 'hidden',
                      height: '100%',

                      backgroundColor: 'rgba(255,255,255,0.001)',
                      border: `1px solid ${'rgba(255,255,255,0.32)'}`,

                      backdropFilter: 'blur(14.4px)',
                      '& h5': {
                        fontSize: '1rem', // Set desktop font size for title
                      },
                      '& p': {
                        fontSize: '1.3rem', // Set desktop font size for description
                      },
                      '@media (max-width: 900px)': {
                        '& h5': {
                          fontSize: '1.8rem', // Reduce font size on smaller screens
                        },
                        '& p': {
                          fontSize: '1.4rem', // Reduce font size on smaller screens
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        marginBottom: '1.5rem',
                        fontSize: '2rem',

                        '& svg': {
                          marginRight: '0.3rem',
                          color: `primary.main`,

                          '&.colorstar': {
                            color: 'gold',
                          },
                        },
                        '@media (max-width: 900px)': {
                          fontSize: '1.5rem',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                      {/* <Box
                        component="img"
                        src="/SVG.png"
                        alt="Decorative SVG"
                        sx={{
                          width: "37px",
                          height: "26px",
                        }}
                      /> */}
                    </Box>
                    <Box
                      sx={{
                        marginBottom: '2.6rem',
                        textAlign: 'left',
                        fontSize: '1.8rem',
                      }}
                    >
                      <p>{testimonial.details}</p>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        // flexDirection: "column",
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 'auto',
                        width: '100%',
                        '@media (max-width: 900px)': {
                          '& .MuiTypography-root': {
                            fontSize: '1.5rem', // Reduce font size for client name and date
                          },
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            border: `2px solid`,
                            borderColor: (theme) => theme.palette.primary.main,
                            borderRadius: '50%',
                            marginRight: '1rem',
                            height: '3rem',
                            width: '3rem',
                            '@media (max-width: 900px)': {
                              minHeight: '3.5rem',
                              width: '3.5rem',
                            },
                          }}
                        />
                        <Box sx={{ marginLeft: '1rem' }}>
                          <Typography
                            sx={{
                              fontSize: '1.2rem !important',
                              fontWeight: '400',
                              // color: theme.palette.primary.accent,
                              // lineHeight: "1.5",
                              '@media (max-width: 900px)': {
                                fontSize: '1.2rem !important', // Reduce font size for smaller screens
                              },
                            }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '1rem !important',
                              fontWeight: '400',
                              // color:
                              //   theme.palette.mode === "dark"
                              //     ? "#C6C6C6"
                              //     : "#6D6D6D",
                              '@media (max-width: 900px)': {
                                fontSize: '1rem !important',
                              },
                            }}
                          >
                            {testimonial.date}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                          {/* {testimonial.socialIcons.map((iconObj, idx) => (
                            <Box
                              component="img"
                              key={idx}
                              src={iconObj.icon}
                              alt={iconObj.alt}
                              sx={{
                                width: "50px",
                                height: "50px",
                              }}
                            />
                          ))} */}
                        </Box>
                      </Box>
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
