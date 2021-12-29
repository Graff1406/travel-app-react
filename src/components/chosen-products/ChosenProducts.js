import React, { useState, useEffect } from "react";

// MUI
import { Stepper, Step } from "@mui/material";

// Components
import CartProducts from "./steps/CartProducts";
import DepositMoney from "./steps/DepositMoney";
import PurchasedProducts from "./steps/PurchasedProducts";

// Store
import { useDispatch, useSelector } from "react-redux";
import {
  reducerChangeCoins,
  reducerStep,
  reducerResetChosenQuantityProduct,
} from "../../store/reducers";

function ChosenProducts() {
  const dispatch = useDispatch();

  const [chosenCoins, setChosenCoins] = useState(0);
  const [change, setChange] = useState(0);

  const chosenProducts = useSelector((state) => state.products.chosenProducts);
  const leftChange = useSelector((state) => state.products.changeCoins);
  const activeStep = useSelector((state) => state.products.step);

  let totalPriceAllOfProducts = +chosenProducts
    .reduce((ac, cu) => {
      ac += cu.sum;
      return ac;
    }, 0)
    ?.toFixed(2);

  const countChangeWhatWeWillGiveInTheEnd = () => {
    if (chosenCoins > totalPriceAllOfProducts) {
      const leftSum = chosenCoins - totalPriceAllOfProducts;
      setChange(leftSum);
    }
  };

  useEffect(() => {
    if (activeStep === 2) {
      countChangeWhatWeWillGiveInTheEnd();
      setChosenCoins(0);
      dispatch(reducerResetChosenQuantityProduct(true));
    }
  }, [activeStep]);

  useEffect(() => countChangeWhatWeWillGiveInTheEnd(), [chosenCoins]);

  const handleSetActiveStep = (step) => dispatch(reducerStep(step));

  const handleChosenCoin = (coin) => {
    setChosenCoins((prevChosenCoins) => {
      const coins = +prevChosenCoins + +coin;
      if (coins?.toString()?.length > 4) return +coins?.toFixed(2);
      return coins;
    });
  };

  const handleTakeChange = () => {
    setChange(0);
    if (leftChange < change) dispatch(reducerChangeCoins(0));
    else dispatch(reducerChangeCoins(leftChange - change));
  };

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      <Step>
        <CartProducts
          chosenProducts={chosenProducts}
          totalPriceAllOfProducts={totalPriceAllOfProducts}
          handleSetActiveStep={handleSetActiveStep}
        />
      </Step>
      <Step>
        <DepositMoney
          totalPriceAllOfProducts={totalPriceAllOfProducts}
          change={change}
          leftChange={leftChange}
          activeStep={activeStep}
          chosenCoins={chosenCoins}
          handleSetActiveStep={handleSetActiveStep}
          handleChosenCoin={handleChosenCoin}
        />
      </Step>
      <Step>
        <PurchasedProducts
          leftChange={leftChange}
          change={change}
          handleTakeChange={handleTakeChange}
          chosenProducts={chosenProducts}
        />
      </Step>
    </Stepper>
  );
}

export default ChosenProducts;
