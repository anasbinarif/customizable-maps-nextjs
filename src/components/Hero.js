import { Box, Typography, Button, Container, Grid } from "@mui/material";
import Image from "next/image";

export default function Hero() {
  const imageUrls = [
    "/img/home_map.jpg",
    "/img/home_map2.jpg",
    "/img/home_map3.jpg",
    "/img/home_map4.jpg",
    "/img/home_map5.jpg",
    "/img/home_map6.jpg",
    "/img/home_map7.jpg",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "80vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "2rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "primary.bgHero",
                padding: "2rem",
                borderRadius: "10px",
                maxWidth: "500px",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                sx={{ fontWeight: "bold" }}
              >
                Create and Customize Your Maps
              </Typography>
              <Typography
                variant="h6"
                component="p"
                sx={{ marginTop: "1rem", marginBottom: "2rem" }}
              >
                Sign up to create or edit custom maps. Use the Google Maps API
                to find points of interest, customize your map with titles and
                descriptions, and export your final design to PDF for printing.
              </Typography>
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "primary.main", borderRadius: "20px" }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "secondary.main",
                    color: "secondary.main",
                    borderRadius: "20px",
                  }}
                >
                  Read More
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right Images */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
                gap: "20px", // Increase the gap between images
                height: "100%",
              }}
            >
              {imageUrls.map((url, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: index === 0 ? "200%" : "100%", // Adjust aspect ratio for first image
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
                    gridColumn: index === 0 ? "1 / 2" : "auto",
                    gridRow: index === 0 ? "1 / 3" : "auto",
                  }}
                >
                  <Image
                    src={url}
                    alt={`image-${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
