import React from "react";

import { Container, Box, Grid, Card } from "@mui/material";

//Components
import ProductsSpace from "../components/products-space/ProductsSpace";
import ChosenProducts from "../components/chosen-products/ChosenProducts";
import Administration from "../components/administration/Administration";

function VendingMachine() {
  return (
    <Container fixed>
      <Box sx={{ margin: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ProductsSpace />
              </Grid>
              <Grid item xs={12}>
                <Administration />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ p: 2 }}>
                  <ChosenProducts />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default VendingMachine;
