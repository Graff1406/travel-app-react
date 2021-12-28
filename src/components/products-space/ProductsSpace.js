import React, { useState, useEffect } from "react";

// import "./vending-machine.css";

import { Container, Box, Grid, Card } from "@mui/material";

// Components
import Product from "./product/Product";

function ProductsSpace({
  getChosenProducts,
  resetCount,
  chosenProducts,
  products,
}) {
  // const [chosenProducts, setChosenProducts] = useState([]);

  // useEffect(() => getChosenProducts(chosenProducts), [chosenProducts]);

  function countTotalSum(item) {
    const filtredProducts = chosenProducts.filter(
      ({ name }) => name !== item?.name
    );

    if (item.sum) getChosenProducts([...filtredProducts, item]);
    else getChosenProducts(filtredProducts);
  }
  return (
    <Card sx={{ padding: 2, backgroundColor: "primary.dark" }}>
      <Grid container spacing={2}>
        {products.map((item) => (
          <Grid item xs={3} key={item.id}>
            <Product
              product={item}
              countTotalSum={countTotalSum}
              resetCount={resetCount}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}

export default ProductsSpace;
