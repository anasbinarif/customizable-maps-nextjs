import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useState, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { StyledTextField } from "./CustomTextFields";

const ChangePasswordModal = ({ open, onClose, onSave }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { darkMode } = useContext(ThemeContext);

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    // Implement the API call to update the password here
    try {
      await onSave(currentPassword, newPassword);
      onClose();
    } catch (e) {
      setError("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: !darkMode
            ? "rgba(255, 255, 255, 0.5)"
            : "rgba(0, 0, 0, 0.5)", // Transparent background
          backdropFilter: "blur(10px)", // Blurred background
          borderRadius: "20px",
          //   padding: "2rem",
          boxShadow: "none",
          // backgroundColor: "red",
        },
      }}
    >
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <StyledTextField
          placeholder="Current Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <StyledTextField
          placeholder="New Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <StyledTextField
          placeholder="Confirm New Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordModal;
