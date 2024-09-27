import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import React from 'react';

const ConfirmDeleteModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
                    Are you sure you want to delete this map? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
                    Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
                    Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
