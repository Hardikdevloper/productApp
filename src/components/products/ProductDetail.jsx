import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Snackbar,
} from "@mui/material";
import { useCart } from "../../context/CartContext";
import { useProductDetail } from "../../api/api";

const ShimmerLoader = () => (
  <Box
    sx={{
      padding: 4,
      width: "100%",
      maxWidth: 600,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    }}>
    <Box
      sx={{
        height: "300px",
        backgroundColor: "#e0e0e0",
        borderRadius: "4px",
        animation: "pulse 1.5s infinite",
        width: "100%",
        maxWidth: "100%",
      }}
    />
    <Box sx={{ marginTop: 2, width: "100%" }}>
      <Box
        sx={{
          height: "24px",
          backgroundColor: "#e0e0e0",
          borderRadius: "4px",
          marginBottom: 1,
          width: "80%",
          alignSelf: "center",
        }}
      />
      <Box
        sx={{
          height: "16px",
          backgroundColor: "#e0e0e0",
          borderRadius: "4px",
          marginBottom: 1,
          width: "70%",
          alignSelf: "center",
        }}
      />
      <Box
        sx={{
          height: "24px",
          backgroundColor: "#e0e0e0",
          borderRadius: "4px",
          marginBottom: 1,
          width: "60%",
          alignSelf: "center",
        }}
      />
    </Box>
    <style>{`
      @keyframes pulse {
        0% {
          background-color: #e0e0e0;
        }
        50% {
          background-color: #d0d0d0;
        }
        100% {
          background-color: #e0e0e0;
        }
      }
    `}</style>
  </Box>
);

/****************************
 * @use:used for product detail page
 * @param:{}
 ****************************/
const ProductDetail = () => {
  const { productId } = useParams();
  const { data: product, isLoading, isError } = useProductDetail(productId);
  const { cart, dispatch } = useCart();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const addToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const isInCart = cart.some((item) => item.id === product?.id);

  if (isLoading) return <ShimmerLoader />;
  if (isError)
    return (
      <Typography variant='h6'>Error fetching product details.</Typography>
    );

  /****************************
   * @use:used for render html
   ****************************/

  return (
    <Box sx={{ padding: 4, display: "flex", justifyContent: "center" }}>
      <Card
        variant='outlined'
        sx={{ width: "100%", maxWidth: 600, boxShadow: 3 }}>
        <CardMedia
          component='img'
          height='300'
          image={product.image}
          alt={product.title}
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant='h5' gutterBottom>
            {product.title}
          </Typography>
          <Typography variant='body2' color='text.secondary' gutterBottom>
            {product.description}
          </Typography>
          <Typography variant='h6' color='primary'>
            ${product.price}
          </Typography>
          <Button
            variant='contained'
            color='primary'
            onClick={addToCart}
            sx={{ marginTop: 2 }}
            disabled={isInCart}>
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
    </Box>
  );
};

export default ProductDetail;
