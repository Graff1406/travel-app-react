import React, { useState } from "react";

import "./vending-machine.css";

import { Container, Box, Grid, Card } from "@mui/material";

//Components
import ProductsSpace from "../../components/products-space/ProductsSpace";
import ChosenProducts from "../../components/chosen-products/ChosenProducts";
import Administration from "../../components/Administration";

// data
const data = [
  {
    id: 1,
    img: "https://image.shutterstock.com/image-photo/london-uk-december-07-2017-260nw-772010821.jpg",
    price: 10,
    qty: 2,
    name: "Coca Cola",
  },
  {
    id: 2,
    img: "https://www.greekflavours.com/static/37fa2034006e3a932212b7ca9ef56a72/73c85/lays-oregano.png",
    price: 5,
    qty: 2,
    name: "Chips",
  },
  {
    id: 3,
    img: "https://img2.zakaz.ua/novus20200617.1592412978.ad72436478c_2020-06-17_Alina/novus20200617.1592412978.SNCPSG10.obj.0.1.jpg.oe.jpg.pf.jpg.350nowm.jpg.350x.jpg",
    price: 3,
    qty: 2,
    name: "Cookies",
  },
  {
    id: 4,
    img: "https://nuts.org.ua/wp-content/uploads/2020/10/nutella.jpg",
    price: 7,
    qty: 2,
    name: "Nutella",
  },
  {
    id: 5,
    img: "https://irecommend.ru/sites/default/files/product-images/875197/uy0bUBoJmrB0OkHKBZQ.jpg",
    price: 2,
    qty: 2,
    name: "Nuts",
  },
  {
    id: 6,
    img: "https://produits.bienmanger.com/36906-0w470h470_Pili_Nuts_With_Cocoa_From_Ecuador.jpg",
    price: 4,
    qty: 2,
    name: "Pili Nuts",
  },
  {
    id: 7,
    img: "https://swissmade.direct/wp-content/uploads/2015/10/Nescafe-Gold-De-Luxe-200-g.jpg",
    price: 4,
    qty: 2,
    name: "Nescafe",
  },
  {
    id: 8,
    img: "https://images.ua.prom.st/2389349717_w700_h500_sprite-10l-sprajt.jpg",
    price: 4,
    qty: 2,
    name: "Sprite",
  },
];

function VendingMachine() {
  const [chosenProducts, setChosenProducts] = useState([]);
  const [products, setProducts] = useState(data);
  const [resetCount, setResetCount] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [leftChange, setLeftChange] = useState(0);

  function getChosenProducts(products) {
    setChosenProducts(products);
    setActiveStep(0);
  }

  function pushResetCount() {
    setResetCount(true);
    setTimeout(() => setResetCount(false), 1000);
  }

  return (
    <Container fixed>
      <Box sx={{ margin: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ProductsSpace
                  getChosenProducts={getChosenProducts}
                  resetCount={resetCount}
                  chosenProducts={chosenProducts}
                  pushResetCount={pushResetCount}
                  products={products}
                />
              </Grid>
              <Grid item xs={12}>
                <Administration
                  leftChange={leftChange}
                  setLeftChange={setLeftChange}
                  products={products}
                  setProducts={setProducts}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ p: 2, height: "100%" }}>
                  <ChosenProducts
                    chosenProducts={chosenProducts}
                    resetCount={resetCount}
                    setChosenProducts={setChosenProducts}
                    pushResetCount={pushResetCount}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    leftChange={leftChange}
                    setLeftChange={setLeftChange}
                  />
                </Card>
              </Grid>
              {/* <Grid item xs={12}>
                <Card>xs=8</Card>
              </Grid>
              <Grid item xs={12}>
                <Card>xs=8</Card>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default VendingMachine;
