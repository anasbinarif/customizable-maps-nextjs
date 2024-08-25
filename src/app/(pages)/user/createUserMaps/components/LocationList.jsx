import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { generateTextColor } from "@/lib/generateTextColor";

export default function LocationList({ locationsByTag, handleDelete }) {
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
        Selected Locations
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
                label={location.name}
                onDelete={() => handleDelete(tag, locationIndex)}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
                sx={{
                  margin: "4px",
                  borderColor: locationsByTag[tag].color,
                  color: generateTextColor(locationsByTag[tag].color),
                  backgroundColor: locationsByTag[tag].color,
                }}
              />
            ))
          )}
        </Box>
      ))}
    </Box>
  );
}
