// ShimmerLoader.js
import React from "react";
import { Box, Skeleton } from "@mui/material";
/****************************
 * @use:used for shimer loader
 * @param:{count}
 ****************************/
const ShimmerLoader = ({ count = 5 }) => {
  /****************************
   * @use:used for render html
   ****************************/
  return (
    <Box>
      {Array.from(new Array(count)).map((_, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "10px 0",
            padding: "10px",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            animation: "pulse 1.5s infinite",
          }}>
          <Skeleton variant='rectangular' width={100} height={100} />
          <Box sx={{ marginLeft: 2, flex: 1 }}>
            <Skeleton variant='text' />
            <Skeleton variant='text' width='60%' />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ShimmerLoader;
