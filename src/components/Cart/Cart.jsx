import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  Divider,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

/****************************
 * @use:used for cart page
 * @param:{}
 ****************************/
const Cart = () => {
  const { cart, dispatch } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const removeItem = (product) => {
    dispatch({ type: "REMOVE_ITEM", payload: product });
    setSnackbarMessage(`cart item has been removed from the cart.`);
    setSnackbarOpen(true);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  /****************************
   * @use:used for render ui
   ****************************/

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant='h4' gutterBottom>
        Your Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant='h6'>Your cart is empty.</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cart.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  variant='outlined'
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}>
                  <CardContent>
                    <Typography variant='h6'>{product.title}</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      ${product.price.toFixed(2)}
                    </Typography>
                    <IconButton
                      onClick={() => removeItem(product)}
                      color='secondary'>
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography variant='h5'>Total: ${calculateTotal()}</Typography>
          <Button variant='contained' color='primary' sx={{ mt: 2 }}>
            Proceed to Checkout
          </Button>
        </>
      )}

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        autoHideDuration={3000}
      />
    </div>
  );
};

export default Cart;
