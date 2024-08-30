"use client";
import React, { useState, useEffect, useContext } from "react";
import { CardTravelSharp } from "@mui/icons-material";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import Image from "next/image";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import("react-leaflet");
import "../../../../lib/leaflet-config";
import { ThemeContext } from "@/context/ThemeContext";
import { useTheme } from "@mui/material";
import Form from "./components/Form";

export default function CarouselSection() {
  const { darkMode } = useContext(ThemeContext);
  const theme = useTheme();
  const position = [52.212992, 5.27937];

  const handleFormSubmit = (data) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: "80vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "2rem",

        "@media only screen and (max-width: 600px)": {
          padding: "1rem",
        },
      }}
    >
      <Container
        style={{
          padding: 0,
        }}
        sx={{
          display: "flex",
          backgroundColor: "primary.bgHero",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "var(--heroShadow)",
        }}
      >
        <Box
          sx={{
            padding: theme.spacing(2),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flex: 1,
            padding: 0,
            // height: "500px",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
              clipPath: "polygon(0 0, 100% 0%, 93% 100%, 0% 100%)",
            }}
          >
            <Box sx={{ width: "100%", height: "100%" }}>
              <MapContainer
                center={position}
                zoom={16}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>Nederland</Popup>
                </Marker>
              </MapContainer>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            padding: theme.spacing(2),
            display: "flex",
            overflow: "hidden",
            flex: 1,
          }}
        >
          <Box
            sx={{
              //   display: "flex",
              //   flexDirection: "column",
              //   justifyContent: "space-between",
              height: "100%",
              padding: "2rem 1rem",
              width: "100%",
            }}
          >
            <Form onSubmit={handleFormSubmit} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
