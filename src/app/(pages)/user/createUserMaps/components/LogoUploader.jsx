import { Close as ClearIcon } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import React, { useContext } from 'react';

import { ThemeContext } from '@/context/ThemeContext';

const LogoUploader = ({ setLogoFile, logoFile }) => {
  const { data: session } = useSession();
  const { darkMode } = useContext(ThemeContext);

  const isFree = session?.user?.subscriptionType === 'BASIC';

  // console.log(uploadedFiles);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const logo = files[0];

    setLogoFile(logo);
  };

  const handleRemoveImage = () => {
    setLogoFile({});
  };

  return (
    <Box
      sx={{
        width: '100%',
        p: 2,
        border: `2px dashed ${darkMode ? '#333' : '#333'}`,
        borderRadius: '8px',
        // minHeight: "400px",
        backgroundColor: 'transparent',
        // mt: "20px",
        height: '100%',
        position: 'relative',
      }}
    >
      {isFree && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: '#5c5c5cea',
            zIndex: 800,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',

            '& .MuiTypography-root': { color: '#fff', textAlign: 'center' },
          }}
        >
          <Typography>
            Please subscribe to one of our plans to upload Company logo
          </Typography>
        </Box>
      )}
      {!logoFile.name && !logoFile.url ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 50, color: 'grey' }} />
          <Typography variant="body1" color="grey">
            Drag & drop to upload your Company logo
          </Typography>
          <Typography variant="h6" color="grey" component="span">
            or
          </Typography>
          <Button
            variant="contained"
            component="label"
            disabled={isFree}
            sx={{
              mt: 2,
              backgroundColor: 'grey',
              color: 'white',
              '&:hover': {
                backgroundColor: '#555',
              },
            }}
          >
            Browse Files
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>
        </Box>
      ) : (
        <>
          <Grid container spacing={2}>
            {/* {oldImgs.map((image, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Box sx={{ position: "relative", width: "100%" }}>
                  <Image
                    src={image.url}
                    alt={`Uploaded image ${index + 1}`}
                    layout="responsive"
                    width={150}
                    height={150}
                    objectFit="cover"
                    style={{ borderRadius: "8px" }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      color: "black",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                      },
                    }}
                    onClick={() => handleRemoveOldImage(index)}
                  >
                    <ClearIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))} */}
            <Grid item xs={12} sm={12} md={12}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '13rem',
                }}
              >
                <Image
                  src={
                    logoFile.name
                      ? URL.createObjectURL(logoFile)
                      : logoFile?.url
                  }
                  alt="Uploaded logo"
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
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    color: 'black',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                    },
                  }}
                  onClick={() => handleRemoveImage()}
                >
                  <ClearIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default LogoUploader;
