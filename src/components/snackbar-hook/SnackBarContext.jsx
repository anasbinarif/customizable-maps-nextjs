'use client';

import {Snackbar} from '@mui/material';
import React, {createContext, useCallback, useState} from 'react';

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
    autoHideDuration: 5000,
  });

  const openSnackbar = useCallback((message, duration = 5000) => {
    setSnackbarData({
      open: true,
      message,
      autoHideDuration: duration,
    });
  }, []);

  const closeSnackbar = () => {
    setSnackbarData({ ...snackbarData, open: false });
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <Snackbar
        open={snackbarData.open}
        autoHideDuration={snackbarData.autoHideDuration}
        onClose={closeSnackbar}
        message={snackbarData.message}
      />
    </SnackbarContext.Provider>
  );
};
