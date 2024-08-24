"use client";
import React, { createContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: darkMode ? "#fff" : "#000",
            bgHero: darkMode
              ? "rgba(20, 20, 20, 0.85)"
              : "rgba(255, 255, 255, 0.85)",
            btnShadow: darkMode
              ? "rgba(50, 50, 93, 0.15) 0px 50px 100px -20px, rgba(0, 0, 0, 0.2) 0px 30px 60px -30px, rgba(10, 37, 64, 0.25) 0px -2px 6px 0px inset"
              : "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
            // pageBg1: darkMode
            //   ? "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)"
            //   : "linear-gradient(to top, #212121 0%, #292929 100%)",
          },
          secondary: {
            main: darkMode ? "#fff" : "#000",
          },
        },
        typography: {
          fontFamily: quicksand.style.fontFamily,
        },
      }),
    [darkMode]
  );

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
