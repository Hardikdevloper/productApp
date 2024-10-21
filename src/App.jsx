import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/products/ProductList";
import UsersList from "./components/Users/UsersList";
import UserDetail from "./components/Users/UserDetail";
import Cart from "./components/Cart/Cart";
import Navbar from "./components/layout/Navbar";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import ProductDetail from "./components/products/ProductDetail";

const queryClient = new QueryClient();

/****************************
 * @use:used for app component
 ****************************/

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={<ProductList />} />
              <Route path='/users' element={<UsersList />} />
              <Route path='/user/:id' element={<UserDetail />} />
              <Route path='/products/:productId' element={<ProductDetail />} />
              <Route path='/cart' element={<Cart />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
