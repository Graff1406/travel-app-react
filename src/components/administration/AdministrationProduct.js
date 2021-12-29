import React, { useState } from "react";

// MUI
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
  Box,
} from "@mui/material";

// Store
import { useDispatch, useSelector } from "react-redux";
import { reduceChangeData } from "../../store/reducers";

function AdministrationProduct() {
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});

  const handleUpdateProduct = (item) => setProduct(item);

  const products = useSelector((state) => state.products.data);

  const fields = Object.entries(product).filter(([key]) => {
    const names = ["price", "qty"];
    if (names.includes(key)) return true;
    else return false;
  });

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
  };

  const handleChangeProduct = () => {
    const filteredProducts = products.map((p) => {
      if (p.id === product.id) return product;
      else return p;
    });
    dispatch(reduceChangeData(filteredProducts));
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ py: "5px" }}>
        <Typography variant="subtitle2" gutterBottom component="div">
          Administration Product
        </Typography>

        <Grid container justifyContent="space-around">
          <Grid item xs={6}>
            <FormControl sx={{ minWidth: 150, maxWidth: 300, marginTop: 1 }}>
              <InputLabel shrink htmlFor="select-multiple-native">
                Native
              </InputLabel>
              <Select
                multiple
                native
                label="Native"
                inputProps={{
                  id: "select-multiple-native",
                }}
              >
                {products.map((item) => (
                  <option
                    key={item.name}
                    value={item}
                    onClick={() => handleUpdateProduct(item)}
                  >
                    {item.name}
                  </option>
                ))}
              </Select>
            </FormControl>
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
            </div>
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
        </Grid>
      </CardContent>
    </Card>
  );
}

export default AdministrationProduct;
