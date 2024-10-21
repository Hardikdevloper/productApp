import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Snackbar,
  Typography,
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUsers, useUpdateUser, useDeleteUser } from "../../api/api";
import ShimmerLoader from "../loader/ShimmerLoader"; // Import the ShimmerLoader

const UsersList = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch users based on the current page and items per page
  const { data: users, isLoading } = useUsers(page, itemsPerPage);

  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const [editUser, setEditUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOpenDialog = (user) => {
    setEditUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditUser(null);
    setOpenDialog(false);
  };

  const handleEditUser = () => {
    updateUserMutation.mutate(
      { userId: editUser.id, updatedUser: editUser },
      {
        onSuccess: () => {
          setSnackbarMessage("User updated successfully");
          setSnackbarOpen(true);
          handleCloseDialog();
        },
        onError: () => {
          setSnackbarMessage("Error updating user");
          setSnackbarOpen(true);
        },
      }
    );
  };

  const handleDeleteUser = (userId) => {
    deleteUserMutation.mutate(userId, {
      onSuccess: () => {
        setSnackbarMessage("User deleted successfully");
        setSnackbarOpen(true);
      },
      onError: () => {
        setSnackbarMessage("Error deleting user");
        setSnackbarOpen(true);
      },
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  if (isLoading) return <ShimmerLoader count={5} />; // Use ShimmerLoader here

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant='h5' sx={{ marginBottom: 2 }}>
        User List
      </Typography>
      <List sx={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: 2 }}>
        {users?.map((user) => (
          <ListItem key={user.id} sx={{ borderBottom: "1px solid #e0e0e0" }}>
            <ListItemText
              primary={`${user.name.firstname} ${user.name.lastname}`}
              secondary={user.email}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleOpenDialog(user)} edge='end'>
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteUser(user.id)}
                color='secondary'
                edge='end'>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Pagination Component */}
      <Pagination
        count={4} // Make sure to update this based on your total user count
        page={page}
        onChange={handleChangePage} // Update page on change
        color='primary'
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />

      {/* Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {editUser && (
            <>
              <TextField
                autoFocus
                margin='dense'
                label='First Name'
                type='text'
                fullWidth
                variant='outlined'
                value={editUser.name.firstname}
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
                    name: { ...editUser.name, firstname: e.target.value },
                  })
                }
              />
              <TextField
                margin='dense'
                label='Last Name'
                type='text'
                fullWidth
                variant='outlined'
                value={editUser.name.lastname}
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
                    name: { ...editUser.name, lastname: e.target.value },
                  })
                }
              />
              <TextField
                margin='dense'
                label='Email'
                type='email'
                fullWidth
                variant='outlined'
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
              />
              <TextField
                margin='dense'
                label='Username'
                type='text'
                fullWidth
                variant='outlined'
                value={editUser.username}
                onChange={(e) =>
                  setEditUser({ ...editUser, username: e.target.value })
                }
              />
              <TextField
                margin='dense'
                label='Phone'
                type='text'
                fullWidth
                variant='outlined'
                value={editUser.phone}
                onChange={(e) =>
                  setEditUser({ ...editUser, phone: e.target.value })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleEditUser} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        autoHideDuration={3000}
      />
    </Box>
  );
};

export default UsersList;
