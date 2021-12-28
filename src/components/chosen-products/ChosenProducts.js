import React, { useState, useEffect } from "react";

// import "./vending-machine.css";

import {
  ListItemText,
  ListItem,
  List,
  Card,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Box,
  Button,
  Chip,
} from "@mui/material";

// Components
// import Product from "./product/Product";

// const steps = [
//   {
//     label: "Chosen Products",
//   },
//   {
//     label: "Deposit money",
//   },
// ];

const coins = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2];

function ChosenProducts({
  chosenProducts,
  setChosenProducts,
  activeStep,
  setActiveStep,
  pushResetCount,
  leftChange,
  setLeftChange,
}) {
  const [chosenCoins, setChosenCoins] = useState(0);
  const [change, setChange] = useState(0);
  const [localChosenProducts, setLocalChosenProducts] = useState([]);

  const total = chosenProducts.reduce((ac, cu) => {
    ac += +cu.sum;
    return ac;
  }, 0);

  const countChange = () => {
    if (chosenCoins > total) {
      const leftSum = +(chosenCoins - total)?.toFixed(2);
      setChange(leftSum);
      console.log(
        "🚀 ~ file: ChosenProducts.js ~ line 56 ~ countChange ~ leftSum",
        leftSum
      );
    }
  };

  useEffect(() => {
    if (activeStep === 2) {
      countChange();
      setLocalChosenProducts([...chosenProducts]);
      setTimeout(() => {
        setChosenProducts([]);
        setChosenCoins(0);
        pushResetCount();
      }, 1000);
    }
  }, [activeStep]);

  useEffect(() => countChange(), [chosenCoins]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClick = (coin) => {
    setChosenCoins((prevChosenCoins) => (+prevChosenCoins + +coin)?.toFixed(2));
  };

  const handleTakeChange = () => {
    setChange(0);
    if (leftChange < change) setLeftChange(0);
    else setLeftChange(leftChange - change);
  };

  let errorText = "";

  if (chosenCoins < total) {
    errorText = "Not enough money deposited";
    console.log("errorText", errorText);
  }

  if (leftChange < change) {
    errorText =
      "There is not enough change in the machine. Left Change is equal £" +
      leftChange +
      " but you need to pick up £" +
      change;

    console.log("leftChange", leftChange < change);
  } else {
  }

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      <Step>
        <StepLabel>
          <Typography variant="h6" gutterBottom component="div">
            Chosen Products
          </Typography>
        </StepLabel>
        <StepContent>
          <List dense={true}>
            {chosenProducts.map(({ name, price, sum, qty }) => (
              <ListItem key={name}>
                <ListItemText
                  primary={`${name}: £${price} x ${qty} = £${sum}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="subtitle2" gutterBottom component="div">
            {`Total: £${total}`}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <div>
              <Button
                variant="contained"
                disableElevation
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
                size="small"
                disabled={!chosenProducts.length}
              >
                Continue
              </Button>
            </div>
          </Box>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>
          <Typography variant="h6" gutterBottom component="div">
            Deposit money
          </Typography>
        </StepLabel>
        <StepContent>
          <Box sx={{ my: 1 }}>
            {coins.map((coin) => (
              <Box component="span" sx={{ m: 1 }} key={coin}>
                <Chip label={`£${coin}`} onClick={() => handleClick(coin)} />
              </Box>
            ))}
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle2" gutterBottom component="div">
              Money deposited: £{chosenCoins}
            </Typography>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              style={{ color: "red" }}
            >
              {errorText}
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div">
              For payment: £{total}
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <div>
              <Button
                variant="contained"
                size="small"
                disableElevation
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
                disabled={chosenCoins < total}
              >
                Buy now
              </Button>
              <Button
                disabled={activeStep === 2}
                onClick={handleBack}
                sx={{ mt: 1, mr: 1 }}
              >
                Back
              </Button>
            </div>
          </Box>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>
          <Typography variant="h6" gutterBottom component="div">
            Purchased products
          </Typography>
        </StepLabel>
        <StepContent>
          <List dense={true}>
            {localChosenProducts.map(({ name, price, sum, qty }) => (
              <ListItem key={name}>
                <Chip label={`${name}: ${qty} pc`} />
              </ListItem>
            ))}
          </List>
          {leftChange && change ? (
            <Button
              variant="contained"
              size="small"
              disableElevation
              onClick={handleTakeChange}
            >
              Take change: £{leftChange < change ? leftChange : change}
            </Button>
          ) : null}
        </StepContent>
      </Step>
    </Stepper>
  );
}

export default ChosenProducts;
