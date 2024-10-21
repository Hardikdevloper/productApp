// ProductPageLoader.js
import React from "react";
import { Box, Skeleton } from "@mui/material";

/****************************
 * @use:used for shimer loader
 * @param:{count}
 ****************************/

const ProductPageLoader = ({ count = 5 }) => {
  /****************************
   * @use:used for render html
   ****************************/
  return (
    <Box sx={{ padding: 2 }}>
      {Array.from(new Array(count)).map((_, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "10px 0",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#f0f0f0",
            boxShadow: 1,
          }}>
          <Skeleton
            variant='rectangular'
            width='100%'
            height={200}
            sx={{ borderRadius: "8px" }}
          />
          <Box sx={{ marginTop: 1 }}>
            <Skeleton
              variant='text'
              sx={{ fontSize: "1.5rem", marginBottom: 1 }}
            />
            <Skeleton variant='text' width='60%' sx={{ fontSize: "1rem" }} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ProductPageLoader;
