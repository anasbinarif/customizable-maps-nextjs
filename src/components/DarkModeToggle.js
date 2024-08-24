"use client";
import React, { useContext, useEffect } from "react";
import { IconButton } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function DarkModeToggle() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-bg",
      darkMode
        ? "linear-gradient(to top, #212121 0%, #292929 100%)"
        : "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)"
    );
  }, [darkMode]);

  // (theme) => theme.palette.background.paper
  return (
    <IconButton
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1000,
        backgroundColor: darkMode ? "#efefef" : "#333",

        "& svg": {
          color: darkMode ? "#333" : "#efefef",
        },
      }}
      onClick={toggleTheme}
    >
      {!darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
