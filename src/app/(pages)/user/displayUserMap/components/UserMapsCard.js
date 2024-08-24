import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Box,
  CardMedia,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Link from "next/link";

const UserMapsCard = ({ map, onOpenDetails, onDelete }) => {
  console.log(map);
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: "10px",
        position: "relative",
        height: "300px",
      }}
    >
      <IconButton
        onClick={() => onOpenDetails(map)}
        sx={{
          position: "absolute",
          top: "8px",
          right: "8px",
          color: "white",
          zIndex: 8,
        }}
      >
        <FullscreenIcon />
      </IconButton>
      <IconButton
        onClick={() => onDelete(map.id)}
        sx={{
          position: "absolute",
          top: "8px",
          right: "48px",
          color: "white",
          zIndex: 8,
        }}
      >
        <DeleteIcon />
      </IconButton>
      {/* <Box
        // component="img"
        height="140"
        // image={map.pinImageUrl}
        // alt="Pin location"
        sx={{
          height: "40%",
          background: `url(${map.pinImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></Box> */}
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
              variant="h6"
              component="div"
              sx={{ marginBottom: "0.5rem" }}
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
              <Typography variant="body2" color="textSecondary">
                Pin Location
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {map.pinName}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Area
              </Typography>
              <Typography variant="body2" color="textSecondary">
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
              <Typography variant="body2" color="textSecondary">
                POI&apos;s
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {map.locations.length}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </CardContent>
    </Card>
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
            <AddCircleOutlineIcon sx={{ fontSize: 200, color: "#aaa" }} />
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
