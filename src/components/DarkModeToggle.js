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
        ? "linear-gradient(to top, #141414 0%, #141414 100%)"
        : "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)"
    );
    document.documentElement.style.setProperty(
      "--heroShadow",
      darkMode
        ? "#ffffff20 0px 30px 60px -10px, #ffffff20 0px 20px 40px -15px, #ffffff20 0px -1px 4px 0px inset"
        : "#32325d3f 0px 30px 60px -10px, #0000004c 0px 20px 40px -15px, #0a254059 0px -1px 4px 0px inset"
    );
    document.documentElement.style.setProperty(
      "--footer-bg",
      darkMode
        ? "linear-gradient(to top, #333333 0%, #333333 100%)"
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
