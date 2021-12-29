import React, { useState } from "react";

// MUI
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

// Store
import { useDispatch, useSelector } from "react-redux";
import { reducerChangeCoins } from "../../store/reducers";

function AdministrationChange() {
  const dispatch = useDispatch();

  const [change, setChange] = useState("");

  const handleChange = () => {
    dispatch(reducerChangeCoins(+change));
    setChange("");
  };

  const leftChange = useSelector((state) => state.products.changeCoins);
  const chosenProducts = useSelector((state) => state.products.chosenProducts);

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ py: "5px" }}>
        <Typography variant="subtitle2" gutterBottom component="div">
          Administration Change
        </Typography>

        <Box sx={{ py: 1, my: 1 }}>
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
            disabled={!!chosenProducts?.length}
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
  );
}

export default AdministrationChange;
