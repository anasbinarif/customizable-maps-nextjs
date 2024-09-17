import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { Upload as UploadIcon, Close as ClearIcon } from "@mui/icons-material";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImageUploader = ({
  setUploadedFiles,
  uploadedFiles,
  oldImgs,
  setOldImgs,
}) => {
  const [images, setImages] = useState([]);
  const { darkMode } = useContext(ThemeContext);

  // console.log(uploadedFiles);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    // const newImages = files.map((file) => URL.createObjectURL(file));
    // setImages((prevImages) => [...prevImages, ...newImages]);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveImage = (index) => {
    // setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleRemoveOldImage = (index) => {
    setOldImgs((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log("uploadedFiles:", uploadedFiles);
    const newImages = uploadedFiles.map((file) => URL.createObjectURL(file));
    // console.log(newImages);
    setImages(newImages);
  }, [uploadedFiles]);

  // console.log(oldImgs);

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        border: `2px dashed ${darkMode ? "#333" : "#333"}`,
        borderRadius: "8px",
        // minHeight: "400px",
        backgroundColor: "transparent",
        mt: "20px",
      }}
    >
      {images.length === 0 && oldImgs.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 50, color: "grey" }} />
          <Typography variant="body1" color="grey">
            Drag & drop to upload
          </Typography>
          <Typography variant="h6" color="grey" component="span">
            or
          </Typography>
          <Button
            variant="contained"
            component="label"
            sx={{
              mt: 2,
              backgroundColor: "grey",
              color: "white",
              "&:hover": {
                backgroundColor: "#555",
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
            {oldImgs.map((image, index) => (
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
            ))}
            {images.map((image, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Box sx={{ position: "relative", width: "100%" }}>
                  <Image
                    src={image}
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
                    onClick={() => handleRemoveImage(index)}
                  >
                    <ClearIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))}

            {images.length + oldImgs.length < 7 && (
              <Grid item xs={6} sm={4} md={3}>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    border: "2px dashed grey",
                    color: "grey",
                    "&:hover": {
                      border: "2px dashed black",
                      color: "black",
                    },
                  }}
                >
                  <UploadIcon />
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Button>
              </Grid>
            )}
          </Grid>

          {/* <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Button
                            variant="contained"
                            sx={{
                                mt: 2,
                                backgroundColor: 'blue',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'darkblue',
                                },
                            }}
                            onClick={handleSaveImages}
                        >
                            Save Images
                        </Button>
                    </Box> */}
        </>
      )}
    </Box>
  );
};

export default ImageUploader;
