import React, { useState } from "react";
import { Grid, Pagination, Box } from "@mui/material";
import { useProducts } from "../../api/api";
import ProductItem from "./ProductItem";
import ProductPageLoader from "../loader/ProductPageLoader";

/****************************
 * @use:used for product6 list
 * @param:{}
 ****************************/
const ProductList = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useProducts(page, itemsPerPage);

  if (isLoading) return <ProductPageLoader count={itemsPerPage} />;
  if (isError) return <div>Error: {error.message}</div>;

  const totalProducts = 20;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  /****************************
   * @use:used for render html
   ***************************/
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {products?.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductItem product={product} isLoading={isLoading} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        color='primary'
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};

export default ProductList;
