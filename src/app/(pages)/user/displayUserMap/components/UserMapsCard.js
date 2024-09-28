import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom/client";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRounded from "@mui/icons-material/AddRounded";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import CustomPdf from "../../createUserMaps/components/exportedDoc";
import ConfirmDeleteModal from "@/app/(pages)/admin/Locations/ConfirmDeleteModal";
import { haversineDistance } from "@/lib/data";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const filters = [
  { name: "Restaurants", type: "restaurant", selectedColor: "#FF6347" },
  { name: "Hotels", type: "lodging", selectedColor: "#1E90FF" },
  {
    name: "Things to do",
    type: "tourist_attraction",
    selectedColor: "#32CD32",
  },
  { name: "Museums", type: "museum", selectedColor: "#FFD700" },
  { name: "Transit", type: "transit_station", selectedColor: "#FF4500" },
  { name: "Pharmacies", type: "pharmacy", selectedColor: "#8A2BE2" },
  { name: "ATMs", type: "atm", selectedColor: "#20B2AA" },
  { name: "Schools", type: "school", selectedColor: "#FF69B4" },
  { name: "Entertainment", type: "movie_theater", selectedColor: "#FF8C00" },
];

const UserMapsCard = ({ map, onOpenDetails, onDelete }) => {
  const [deleteMap, setDeleteMap] = useState(false);

  const locationsByTag = useMemo(() => {
    return map.locations.reduce((acc, location) => {
      const tag = location.tag;
      if (!acc[tag]) {
        acc[tag] = {
          color: filters.find((fil) => fil.name === tag).selectedColor,
          locations: [],
        };
      }
      acc[tag].locations.push({
        ...location,
        distance: haversineDistance(
          {
            lat: Number(map.pinLatitude),
            lng: Number(map.pinLongitude),
          },
          { lat: location.latitude, lng: location.longitude }
        ),
      });
      return acc;
    }, {});
  }, [map]);

  const handleDeleteCancel = () => {
    setDeleteMap(false);
  };

  const exportMap = async () => {
    const pdfContent = document.createElement("div");
    pdfContent.style.width = "1920px";
    pdfContent.style.position = "absolute";
    document.body.appendChild(pdfContent);

    const root = ReactDOM.createRoot(pdfContent);

    root.render(
      <CustomPdf
        data={{
          title: map?.title,
          oldImgs: map?.images,
          newImgFiles: [],
          logoFile: map?.logo ? { url: map?.logo } : {},
          locationsByTag: locationsByTag,
          currentLocation: {
            lat: Number(map.pinLatitude),
            lng: Number(map.pinLongitude),
          },
          helperHtml: map?.helperText,
        }}
      />
    );

    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    const canvas = await html2canvas(pdfContent, {
      useCORS: true,
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`${map?.title}.pdf`);

    root.unmount();
    document.body.removeChild(pdfContent);
  };
  console.log(map);

  return (
    <>
      <Card
        sx={{
          mb: 2,
          borderRadius: "10px",
          position: "relative",
          boxShadow: "var(--heroShadow)",
          // height: "300px",
        }}
      >
        <IconButton
          onClick={exportMap}
          sx={{
            position: "absolute",
            top: "8px",
            right: "8px",
            color: "white",
            zIndex: 8,
          }}
        >
          <DownloadIcon />
        </IconButton>
        <IconButton
          onClick={() => setDeleteMap(true)}
          sx={{
            position: "absolute",
            top: "8px",
            left: "8px",
            color: "white",
            zIndex: 8,

            "&:hover": {
              color: "#ff4444",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
        <Link
          href={`/user/createUserMaps/${map?.id}`}
          style={{
            position: "absolute",
            top: "8px",
            right: "48px",
            color: "white",
            zIndex: 8,
          }}
        >
          <IconButton sx={{ color: "white" }}>
            <EditIcon />
          </IconButton>
        </Link>
        <Box sx={{ position: "relative", zIndex: 7 }}>
          <CardMedia
            component="img"
            height="140"
            image={map.pinImageUrl}
            alt="Pin location"
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.55))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
            }}
          ></Box>
        </Box>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="h4"
                component="div"
                sx={{ marginBottom: "0.5rem", color: "primary.main" }}
              >
                {map.title}
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    // marginBottom: "1rem",
                  }}
                >
                  {/* <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: "1.3rem", marginBottom: "0.05rem" }}
                >
                  Location
                </Typography> */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      // paddingLeft: "0.5rem",

                      "& .MuiTypography-root": { fontSize: "0.9rem" },
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: "1rem" }}
                    >
                      Latitude
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {map?.pinLatitude}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      // paddingLeft: "0.5rem",

                      "& .MuiTypography-root": { fontSize: "0.9rem" },
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: "1rem" }}
                    >
                      Longitude
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {map?.pinLongitude}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  // sx={{ fontSize: "1.3rem", marginBottom: "0.05rem" }}
                >
                  Area
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  // sx={{ fontSize: "1.3rem", marginBottom: "0.05rem" }}
                >
                  {map.locations.length}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  // sx={{ fontSize: "1.3rem", marginBottom: "0.05rem" }}
                >
                  POI&apos;s
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  // sx={{ fontSize: "1.3rem", marginBottom: "0.05rem" }}
                >
                  {map.locations.length}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </CardContent>
      </Card>
      <ConfirmDeleteModal
        open={deleteMap}
        onClose={handleDeleteCancel}
        onConfirm={() => onDelete(map.id)}
      />
    </>
  );
};

export const CreateMapCard = () => {
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: "10px",
        position: "relative",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        backgroundImage: "none",
        boxShadow: "none",
      }}
    >
      {/* <CardMedia
        component="img"
        height="140"
        image="/img/home_map.jpg"
        alt="Pin location"
      /> */}
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            href="/user/createUserMaps"
            sx={{
              color: "black",
            }}
          >
            <AddRounded sx={{ fontSize: 200, color: "#aaa" }} />
          </Link>
          {/* <Typography variant="h6" component="div" textAlign="center">
            Create More Personalized Maps
          </Typography> */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserMapsCard;
