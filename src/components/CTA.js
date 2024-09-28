import { CardTravelSharp } from "@mui/icons-material";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import Image from "next/image";

export default function CTA() {
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
      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            marginBottom: "2rem",
            "& span": {
              display: "block",
            },
          }}
        >
          Create, Customize and Print{" "}
          <span>Your Map Now - with our flexible pricing plans</span>
        </Typography>
        {/* <Typography variant="body1">
          We come to you at your location to service your vehicle
          <br />
          The specilaist in steam cleaning
        </Typography> */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            marginTop: "2rem",
            fontSize: "1.5rem",
          }}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
}
