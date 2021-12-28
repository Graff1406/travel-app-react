import React, { useState, useEffect } from "react";

// import "./vending-machine.css";

import {
  Grid,
  Card,
  CardMedia,
  Badge,
  Box,
  IconButton,
  ButtonGroup,
  Typography,
} from "@mui/material";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";

function Product({ product, countTotalSum, resetCount, pushResetCount }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (resetCount) setCount(0);
  }, [resetCount]);

  useEffect(() => {
    // if (count === 1) pushResetCount();
  }, [count]);

  function chooseProduct(total) {
    setCount(total);
    countTotalSum({
      sum: total * product.price,
      name: product.name,
      qty: total,
      price: product.price,
    });
  }
  return (
    <Card sx={{ px: "10px" }}>
      <Grid container direction="column">
        <Grid item xs={12}>
          <Grid container justifyContent="space-between">
            <Grid item xs={4}>
              <h4>£{product.price}</h4>
            </Grid>
            <Grid component="h5" item xs={4}>
              <Typography variant="subtitle2" gutterBottom component="div">
                {product.name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Grid container justifyContent="flex-end">
                <Box sx={{ margin: 2 }}>
                  <Badge badgeContent={product.qty} color="primary"></Badge>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <CardMedia
            component="img"
            height="80"
            src={product.img}
            alt="Cola-Soda"
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Box sx={{ marginY: 2 }}>
              <ButtonGroup size="small">
                <IconButton
                  color="primary"
                  aria-label="reduce"
                  disabled={count === 0}
                  onClick={() => chooseProduct(count - 1)}
                  size="small"
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>

                <Box
                  sx={{
                    width: 20,
                    height: 15,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {count}
                </Box>

                {/* <IconButton color="primary" disabled>
                  {count}
                </IconButton> */}

                <IconButton
                  color="primary"
                  aria-label="increase"
                  disabled={count === product.qty}
                  onClick={() => chooseProduct(count + 1)}
                  size="small"
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </ButtonGroup>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Product;
