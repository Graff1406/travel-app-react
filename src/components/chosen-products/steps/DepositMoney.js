import React from "react";

import PropTypes from "prop-types";

import {
  Typography,
  StepLabel,
  StepContent,
  Box,
  Button,
  Chip,
} from "@mui/material";

const coins = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2];
function DepositMoney({
  chosenCoins,
  totalPriceAllOfProducts,
  leftChange,
  change,
  activeStep,
  handleChosenCoin,
  handleSetActiveStep,
}) {
  return (
    <>
      <StepLabel>
        <Typography variant="h6" gutterBottom component="div">
          Deposit money
        </Typography>
      </StepLabel>
      <StepContent>
        <Box sx={{ my: 2 }}>
          {coins.map((coin) => (
            <Box component="span" key={coin}>
              <Chip
                label={`£${coin}`}
                onClick={() => handleChosenCoin(coin)}
                sx={{ marginTop: 1, marginRight: 1 }}
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography variant="subtitle2" gutterBottom component="div">
            Money deposited: £{chosenCoins}
          </Typography>
          {chosenCoins < totalPriceAllOfProducts && (
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              style={{ color: "red" }}
            >
              Not enough money deposited
            </Typography>
          )}
          {leftChange < change && (
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              style={{ color: "red" }}
            >
              There is not enough change in the machine. Left Change is equal
              <Typography
                variant="subtitle2"
                component="span"
                sx={{ mx: "5px" }}
              >
                £{leftChange}
              </Typography>
              but you need to pick up
              <Typography
                variant="subtitle2"
                component="span"
                sx={{ mx: "5px" }}
              >
                £{+change?.toFixed(2)}
              </Typography>
            </Typography>
          )}
          <Typography variant="subtitle2" gutterBottom component="div">
            For payment: £{totalPriceAllOfProducts}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <div>
            <Button
              variant="contained"
              size="small"
              disableElevation
              onClick={() => handleSetActiveStep(2)}
              sx={{ mt: 1, mr: 1 }}
              disabled={chosenCoins < totalPriceAllOfProducts}
            >
              Buy now
            </Button>
            <Button
              disabled={activeStep === 2}
              onClick={() => handleSetActiveStep(0)}
              sx={{ mt: 1, mr: 1 }}
            >
              Back
            </Button>
          </div>
        </Box>
      </StepContent>
    </>
  );
}

DepositMoney.propTypes = {
  chosenCoins: PropTypes.number,
  totalPriceAllOfProducts: PropTypes.number,
  leftChange: PropTypes.number,
  change: PropTypes.number,
  activeStep: PropTypes.number,
  handleChosenCoin: PropTypes.func,
  handleSetActiveStep: PropTypes.func,
};

export default DepositMoney;
