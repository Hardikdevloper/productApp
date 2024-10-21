import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Snackbar,
} from "@mui/material";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

/****************************
 * @use:used for product items
 * @param:{product}
 ****************************/
const ProductItem = ({ product }) => {
  const { cart, dispatch } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const addToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
    setSnackbarOpen(true); // Open the Snackbar
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false); // Close the Snackbar
  };

  const isInCart = cart.some((item) => item.id === product.id);

  /****************************
   * @use:used for render html
   ****************************/
  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: 3,
        }}>
        <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
          <CardMedia
            component='img'
            height='200'
            image={product.image}
            alt={product.title}
            sx={{ objectFit: "contain" }}
          />
        </Link>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant='h6' gutterBottom>
            {product.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            ${product.price}
          </Typography>
          <Button
            variant='contained'
            onClick={addToCart}
            sx={{ marginTop: 2 }}
            disabled={isInCart} // Disable if product is already in cart
          >
            {isInCart ? "Added to Cart" : "Add to Cart"}
          </Button>
        </CardContent>
      </Card>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={`${product.title} added to cart`}
      />
    </>
  );
};

export default ProductItem;
