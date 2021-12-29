import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// MUI
import {
  Typography,
  StepLabel,
  StepContent,
  ListItem,
  Button,
  Chip,
  List,
} from "@mui/material";

function PurchasedProducts({
  leftChange,
  change,
  chosenProducts,
  handleTakeChange,
}) {
  const [localChosenProducts, setLocalChosenProducts] = useState([]);

  useEffect(() => {
    if (chosenProducts.length) setLocalChosenProducts([...chosenProducts]);
  }, [chosenProducts]);

  return (
    <>
      <StepLabel>
        <Typography variant="h6" gutterBottom component="div">
          Purchased products
        </Typography>
      </StepLabel>
      <StepContent>
        <List dense={true}>
          {localChosenProducts.map(({ name, qty }) => (
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
    </>
  );
}

PurchasedProducts.propTypes = {
  leftChange: PropTypes.number,
  change: PropTypes.number,
  chosenProducts: PropTypes.array,
  handleTakeChange: PropTypes.func,
};

export default PurchasedProducts;
