import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { generateTextColor } from "@/lib/generateTextColor";

export default function LocationList({ locationsByTag, handleDelete }) {
  console.log(locationsByTag);
  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
        backgroundColor: "primary.bgHero",
        margin: "0 2",
        borderRadius: "16px",
        height: "100%",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ marginBottom: "1.5rem" }}>
        Points of Interest
      </Typography>
      {Object.keys(locationsByTag).map((tag, tagIndex) => (
        <Box key={tagIndex} sx={{ marginBottom: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            {tag}
          </Typography>
          {locationsByTag[tag].locations.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              No locations selected.
            </Typography>
          ) : (
            locationsByTag[tag].locations.map((location, locationIndex) => (
              <Chip
                key={locationIndex}
                onDelete={() => handleDelete(tag, locationIndex)}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
                sx={{
                  margin: "4px",
                  borderColor: locationsByTag[tag].color,
                  color: generateTextColor(locationsByTag[tag].color),
                  backgroundColor: locationsByTag[tag].color,
                }}
                label={
                  <Box
                    sx={{ display: "flex", gap: "5px", alignItems: "flex-end" }}
                  >
                    <Typography variant="body2">{location.name}</Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ lineHeight: 1.5 }}
                    >
                      {location.distance.toFixed(2)}m
                    </Typography>
                  </Box>
                }
              />
            ))
          )}
        </Box>
      ))}
    </Box>
  );
}
