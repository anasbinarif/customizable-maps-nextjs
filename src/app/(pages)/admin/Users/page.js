'use client';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';

import useCustomSnackbar from '@/components/snackbar-hook/useCustomSnackbar';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '', isAdmin: false });
  const [newUserData, setNewUserData] = useState({ name: '', email: '', password: '', isAdmin: false });
  const [isAddUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [isDeleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const { openSnackbar } = useCustomSnackbar();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/getAllUsers');
        const data = await response.json();

        setUsers(data.users);
      } catch (error) {
        openSnackbar(`Failed to fetch users: ${error}`);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setEditData({ name: user.name, email: user.email, isAdmin: user.isAdmin });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/admin/updateUserProfile/${editUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      const updatedUser = await response.json();

      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
      setEditUserId(null);
      const res = await fetch('/api/admin/getAllUsers');
      const data = await res.json();

      setUsers(data.users);
    } catch (error) {
      openSnackbar(`Failed to update user: ${error}`);
    }
  };

  const handleCancel = () => {
    setEditUserId(null);
    setEditData({ name: '', email: '', isAdmin: false });  // Reset edit data
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/admin/updateUserProfile/${userToDelete}`, {
        method: 'DELETE',
      });
      setUsers(users.filter(user => user.id !== userToDelete));
      setDeleteConfirmDialogOpen(false);
      setUserToDelete(null);
    } catch (error) {
      openSnackbar(`Failed to delete user: ${error} ${userToDelete}`);
    }
  };

  const handleOpenAddUserDialog = () => {
    setAddUserDialogOpen(true);
  };

  const handleCloseAddUserDialog = () => {
    setAddUserDialogOpen(false);
    setNewUserData({ name: '', email: '', password: '', isAdmin: false });
  };

  const handleOpenDeleteConfirmDialog = (userId) => {
    setUserToDelete(userId);
    setDeleteConfirmDialogOpen(true);
  };

  const handleCloseDeleteConfirmDialog = () => {
    setDeleteConfirmDialogOpen(false);
    setUserToDelete(null);
  };

  const handleAddUser = async () => {
    try {
      const res = await fetch('/api/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserData),
      });

      if (res.ok) {
        const newUser = await res.json();

        setUsers([...users, newUser]);
        setNewUserData({ name: '', email: '', password: '', isAdmin: false });
        setAddUserDialogOpen(false);
      } else {
        const error = await res.json();

        openSnackbar(`Failed to add user: ${error.message}`);
      }
    } catch (e) {
      openSnackbar(`Failed to add user: ${e.message}`);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
                Manage Users
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleOpenAddUserDialog}>
                Add New User
      </Button>
      <List>
        {users.map(user => (
          <ListItem key={user.id}>
            {editUserId === user.id ? (
              <>
                <TextField
                  label="Name"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  fullWidth
                  sx={{ mr: 2 }}
                />
                <TextField
                  label="Email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  fullWidth
                  sx={{ mr: 2 }}
                />
                <TextField
                  select
                  label="Admin Status"
                  value={editData.isAdmin}
                  onChange={(e) => setEditData({ ...editData, isAdmin: e.target.value })}
                  fullWidth
                  sx={{ mr: 2 }}
                >
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </TextField>
                {/*<Typography sx={{ mr: 2 }}>Maps: {user.maps.length}</Typography>*/}
                <IconButton edge="end" onClick={handleSave}>
                  <SaveIcon />
                </IconButton>
                <IconButton edge="end" onClick={handleCancel}>
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <>
                <ListItemText
                  primary={`${user.name} (Maps: ${user?.maps.length || 0})`}
                  secondary={`${user.email} | Admin: ${user.isAdmin ? 'Yes' : 'No'}`}
                />
                <IconButton edge="end" onClick={() => handleEdit(user)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleOpenDeleteConfirmDialog(user.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </ListItem>
        ))}
      </List>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onClose={handleCloseAddUserDialog}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={newUserData.name}
            onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            value={newUserData.email}
            onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            value={newUserData.password}
            onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Admin Status"
            value={newUserData.isAdmin}
            onChange={(e) => setNewUserData({ ...newUserData, isAdmin: e.target.value })}
            fullWidth
          >
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddUserDialog}>Cancel</Button>
          <Button onClick={handleAddUser} color="primary">Add User</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmDialogOpen} onClose={handleCloseDeleteConfirmDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="primary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
