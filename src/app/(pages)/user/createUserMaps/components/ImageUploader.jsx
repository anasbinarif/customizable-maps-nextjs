import React, { useContext, useState } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { Upload as UploadIcon, Close as ClearIcon } from "@mui/icons-material";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]); // Store the File objects
  const { darkMode } = useContext(ThemeContext);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSaveImages = async () => {
    const formData = new FormData();
    uploadedFiles.forEach((file) => formData.append("files", file));
    formData.append("mapId", selectedMapId); // Ensure you pass the correct map ID
    formData.append("pinName", pinName); // Ensure you pass the correct pin name

    try {
      const response = await fetch("/api/imageUpload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Images saved successfully");
        setUploadedFiles([]);
        setImages(result.savedImages.map((img) => img.url));
      } else {
        console.error("Error saving images:", result.message);
      }
    } catch (error) {
      console.error("Error saving images:", error);
    }
  };

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
      {images.length === 0 ? (
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

            {images.length < 7 && (
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
