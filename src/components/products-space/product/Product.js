import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// MUI
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

// MUI - icons
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";

// Store
import { useSelector, useDispatch } from "react-redux";
import {
  reducerResetChosenQuantityProduct,
  reducerToChosenProducts,
  reducerStep,
} from "../../../store/reducers";

function Product({ product }) {
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);

  const resetChosenQuantityProduct = useSelector(
    (state) => state.products.resetChosenQuantityProduct
  );

  let chosenProducts = useSelector((state) => state.products.chosenProducts);

  useEffect(() => {
    if (resetChosenQuantityProduct && count) {
      setCount(0);
      dispatch(reducerResetChosenQuantityProduct(false));
      dispatch(reducerToChosenProducts([]));
    }
  }, [resetChosenQuantityProduct]);

  const handleChooseProduct = (total) => {
    setCount(total);

    let localChosenProducts = [...chosenProducts];

    const productItem = {
      ...product,
      sum: total * product.price,
      qty: total,
    };

    if (total) {
      const index = localChosenProducts.findIndex(
        ({ id }) => id === product.id
      );

      if (index >= 0) localChosenProducts[index] = productItem;
      else localChosenProducts.push(productItem);
    } else {
      localChosenProducts = localChosenProducts?.filter(
        ({ id }) => id !== product?.id
      );
    }

    dispatch(reducerToChosenProducts(localChosenProducts));
    dispatch(reducerStep(0));
  };
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
                  onClick={() => handleChooseProduct(count - 1)}
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

                <IconButton
                  color="primary"
                  aria-label="increase"
                  disabled={count === product.qty}
                  onClick={() => handleChooseProduct(count + 1)}
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

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
