import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

/****************************
 * @use:used for navbar page
 ****************************/
const Navbar = () => {
  /****************************
   * @use:used for render navbar
   ****************************/
  return (
    <AppBar position='static'>
      <Container maxWidth='lg'>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            <Link to='/' style={{ color: "inherit", textDecoration: "none" }}>
              My Store
            </Link>
          </Typography>
          <Button component={Link} to='/' color='inherit'>
            Products
          </Button>
          <Button component={Link} to='/cart' color='inherit'>
            Cart
          </Button>
          <Button component={Link} to='/users' color='inherit'>
            Users
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
