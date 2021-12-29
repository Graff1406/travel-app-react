import React from "react";

// MUI
import { Grid, Card } from "@mui/material";

// Components
import Product from "./product/Product";

// Store
import { useSelector } from "react-redux";

function ProductsSpace() {
  const products = useSelector((state) => state.products.data);

  return (
    <Card sx={{ padding: 2, backgroundColor: "#ededed" }}>
      <Grid container spacing={2}>
        {products.map((item) => (
          <Grid item xs={3} key={item.id}>
            <Product product={item} />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}

export default ProductsSpace;
