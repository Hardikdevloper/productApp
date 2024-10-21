import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../../api/api";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

/****************************
 * @use:used for user detail page
 * @param:{}
 ****************************/
const UserDetail = () => {
  const { id } = useParams();
  const { data: users, isLoading } = useUsers();
  const navigate = useNavigate();
  const user = users ? users.find((user) => user.id === parseInt(id)) : null;

  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated User Data:", formData);
    navigate("/users");
  };

  const handleDelete = () => {
    console.log("User deleted:", user.id);
    navigate("/users");
  };

  if (isLoading) return <CircularProgress />;
  if (!user) return <div>User not found</div>;

  /****************************
   * @use:used for user detail page
   * @param:{}
   ****************************/
  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Typography variant='h4'>Edit User</Typography>
      <TextField
        label='Name'
        name='name'
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Email'
        name='email'
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin='normal'
      />
      <Button variant='contained' type='submit'>
        Save
      </Button>
      <Button variant='outlined' onClick={handleDelete}>
        Delete User
      </Button>
      <Button variant='outlined' onClick={() => navigate("/users")}>
        Cancel
      </Button>
    </Box>
  );
};

export default UserDetail;
