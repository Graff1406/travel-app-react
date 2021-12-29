import React from "react";
import PropTypes from "prop-types";

// MUI
import {
  ListItemText,
  ListItem,
  List,
  Typography,
  StepLabel,
  StepContent,
  Box,
  Button,
} from "@mui/material";

function CartProducts({
  chosenProducts,
  totalPriceAllOfProducts,
  handleSetActiveStep,
}) {
  return (
    <>
      <StepLabel>
        <Typography variant="h6" gutterBottom component="div">
          Chosen Products
        </Typography>
      </StepLabel>
      <StepContent>
        <List dense={true}>
          {chosenProducts.map(({ name, price, sum, qty }) => (
            <ListItem key={name}>
              <ListItemText primary={`${name}: £${price} x ${qty} = £${sum}`} />
            </ListItem>
          ))}
        </List>
        <Typography variant="subtitle2" gutterBottom component="div">
          {`Total: £${totalPriceAllOfProducts}`}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <div>
            <Button
              variant="contained"
              disableElevation
              onClick={() => handleSetActiveStep(1)}
              sx={{ mt: 1, mr: 1 }}
              size="small"
              disabled={!chosenProducts.length}
            >
              Continue
            </Button>
          </div>
        </Box>
      </StepContent>
    </>
  );
}

CartProducts.propTypes = {
  chosenProducts: PropTypes.array,
  totalPriceAllOfProducts: PropTypes.number,
  handleSetActiveStep: PropTypes.func,
};

export default CartProducts;
