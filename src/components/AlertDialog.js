import WarningIcon from '@mui/icons-material/Warning';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import React from 'react';

const LayoutDialog = ({ open, onClose, message }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          position: 'absolute', // Make it absolute to maintain centering
          top: '5%',
          left: '5%',
          maxWidth: '300px',
          //   transform: 'translate(-50%, -50%)', // Center the dialog
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <IconButton color="warning" sx={{ marginRight: 1 }}>
            <WarningIcon />
          </IconButton>
          <Typography variant="h6">Alert</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LayoutDialog;
