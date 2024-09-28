'use client';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import {useSession} from 'next-auth/react';
import React, {useEffect, useState} from 'react';

import useCustomSnackbar from '@/components/snackbar-hook/useCustomSnackbar';

const Profile = ({ userId }) => {
  const { data: session } = useSession();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    avatar: '',
    isAdmin: false,
    mapsCount: 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [originalProfileData, setOriginalProfileData] = useState({});
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { openSnackbar } = useCustomSnackbar();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/admin/getUserById/${userId || session?.user?.id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();

        setProfileData({
          ...data.user,
          mapsCount: data.user?.maps.length || 0,
        });
        setOriginalProfileData({
          ...data.user,
          mapsCount: data.user?.maps.length || 0,
        });
      } catch (error) {
        openSnackbar(`Failed to fetch profile data: ${error}`);
      }
    };

    fetchProfileData();
  }, [userId, session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const dataToSave = {
        name: profileData.name,
        email: profileData.email,
        avatar: profileData.avatar,
        isAdmin: profileData.isAdmin,
      };

      const response = await fetch(`/api/admin/updateUserProfile/${userId || session?.user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });

      const updatedUser = await response.json();

      setProfileData(updatedUser.user);
      setOriginalProfileData(updatedUser.user); // Update original data after save
      setEditMode(false);
      setLoading(false);
    } catch (error) {
      openSnackbar(`Failed to update profile: ${error}`);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData(originalProfileData); // Revert to original data
    setEditMode(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');

      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/updateUserProfile/${userId || session?.user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        alert('Password updated successfully');
        setPasswordDialogOpen(false);
        setNewPassword('');
        setConfirmPassword('');
      } else {
        throw new Error('Failed to update password');
      }
    } catch (error) {
      alert(`Failed to update password: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
                Profile
      </Typography>
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar alt={profileData.name} src={profileData.avatar} sx={{ width: 80, height: 80, mr: 2 }} />
        {editMode && (
          <IconButton color="primary" component="label">
            <PhotoCamera />
            <input type="file" hidden />
          </IconButton>
        )}
        <Typography variant="h6">{profileData.name}</Typography>
      </Box>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={profileData.name}
          onChange={handleInputChange}
          disabled={!editMode}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={profileData.email}
          onChange={handleInputChange}
          disabled
        />
        {/*<TextField*/}
        {/*    label="Number of Maps"*/}
        {/*    name="mapsCount"*/}
        {/*    variant="outlined"*/}
        {/*    fullWidth*/}
        {/*    margin="normal"*/}
        {/*    value={profileData.mapsCount}*/}
        {/*    disabled*/}
        {/*/>*/}
        <TextField
          select
          label="Admin Status"
          name="isAdmin"
          variant="outlined"
          fullWidth
          margin="normal"
          value={profileData.isAdmin}
          onChange={(e) => setProfileData({ ...profileData, isAdmin: e.target.value })}
          disabled={!editMode}
        >
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
        </TextField>
        <Box mt={3} display="flex" justifyContent="space-between">
          {editMode ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} />}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
                            Edit Profile
            </Button>
          )}
        </Box>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setPasswordDialogOpen(true)}>
                    Change Password
        </Button>
      </Box>

      {/* Password Change Dialog */}
      <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialogOpen(false)} color="secondary">
                        Cancel
          </Button>
          <Button onClick={handlePasswordChange} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : 'Update Password'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
