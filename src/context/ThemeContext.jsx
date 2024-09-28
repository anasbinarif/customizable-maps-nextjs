"use client";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Quicksand } from "next/font/google";
import React, { createContext, useMemo, useState } from "react";

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
            // main: darkMode ? "#fff" : "#000",
            main: "#0092A2",
            main2: "#00afc2",
            bgHero: darkMode ? "#333333" : "#ffffffd8",
            // btnShadow: darkMode
            //   ? "#32325d26 0px 50px 100px -20px, #00000033 0px 30px 60px -30px, #0a25403f 0px -2px 6px 0px inset"
            //   : "#32325d3f 0px 50px 100px -20px, #0000004c 0px 30px 60px -30px, #0a254059 0px -2px 6px 0px inset",
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
