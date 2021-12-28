import React, { useState, useEffect } from "react";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  CardMedia,
  Badge,
  Box,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";

import InputMask from "react-input-mask";

function Administration({
  countTotalSum,
  resetCount,
  pushResetCount,
  leftChange,
  setLeftChange,
  products,
  setProducts,
}) {
  const [change, setChange] = useState("");
  const [product, setProduct] = useState({});

  const handleChange = () => {
    setLeftChange(+change);
    setChange("");
  };

  const handleChooseProduct = (event) => {
    const item = event.target.value;
    setProduct(item);
  };

  const handleChangeProduct = () => {
    const filteredProducts = products.map((p) => {
      if (p.id === product.id) return product;
      else return p;
    });
    setProducts(filteredProducts);
  };

  const handleSetNewValueField = (key, e) => {
    const value = e.target.value;

    if (key === "price") {
      const price = value?.match(/\d|\./g)?.join("");
      setProduct((items) => ({ ...items, price: price || "" }));
    } else {
      const qty = value
        .match(/\d/g)
        ?.filter((p, i) => i < 2)
        ?.join("");
      setProduct((items) => ({ ...items, qty: qty || "" }));
    }
    // if (
    //   (key === "qty" && value?.length < 3 && Number.isInteger(+value)) ||
    //   (key === "qty" && e.which === 8)
    // )
    //   setProduct({ ...product, [key]: value });
    // else e.preventDefault();
  };

  const fields = Object.entries(product).filter(([key]) => {
    const names = ["price", "qty"];
    if (names.includes(key)) return true;
    else return false;
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Card sx={{ p: "10px", height: "100%", py: 1 }}>
          <CardContent>
            <Typography variant="subtitle2" gutterBottom component="div">
              Administration Product
            </Typography>

            <Grid container justifyContent="space-around">
              <Grid item xs={6}>
                <FormControl fullWidth variant="standard">
                  <InputLabel id="demo-simple-select-label">
                    Choose Product
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={product}
                    label="Choose Product"
                    onChange={handleChooseProduct}
                    dense={true}
                  >
                    {products.map((item) => (
                      <MenuItem value={item} key={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {product.hasOwnProperty("id") && (
                  <Button
                    variant="contained"
                    size="small"
                    disableElevation
                    onClick={handleChangeProduct}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={!product?.qty || !product?.price}
                  >
                    Save change
                  </Button>
                )}
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <div>
                  {fields.map(([key, value], i) => (
                    <Box sx={{ p: 1 }} key={i}>
                      <TextField
                        label={key}
                        id="filled-size-small"
                        size="small"
                        value={value}
                        onChange={(e) => handleSetNewValueField(key, e)}
                      ></TextField>
                    </Box>
                  ))}
                  {/* <Box sx={{ p: 1 }}>
                    <TextField
                      label="Price"
                      id="filled-size-small"
                      size="small"
                      value={product.price}
                      onChange={(e) => handleSetNewValueField("price", e)}
                    ></TextField>
                  </Box>

                  <Box sx={{ p: 1 }}>
                    <TextField
                      label="Qty"
                      id="filled-size-small"
                      size="small"
                      value={product.qty}
                      onChange={(e) => handleSetNewValueField("qty", e)}
                    ></TextField>
                  </Box> */}
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card sx={{ p: "10px", height: "100%", py: 1 }}>
          <CardContent sx={{ py: 1 }}>
            <Typography variant="subtitle2" gutterBottom component="div">
              Administration Change
            </Typography>

            <Box sx={{ py: 1 }}>
              <TextField
                label="Amount"
                id="filled-size-small"
                size="small"
                value={change}
                onChange={(e) => setChange(e.target.value)}
              />
              <Button
                variant="contained"
                size="small"
                disableElevation
                onClick={handleChange}
                sx={{ mt: 1, mr: 1 }}
              >
                Add change
              </Button>
            </Box>

            <Typography variant="subtitle2" gutterBottom component="div">
              Left Change: £{leftChange || 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Administration;
