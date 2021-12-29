import React from "react";

// MUI
import { Grid } from "@mui/material";

// Components
import AdministrationProduct from "./AdministrationProduct";
import AdministrationChange from "./AdministrationChange";

function Administration() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <AdministrationProduct />
      </Grid>
      <Grid item xs={4}>
        <AdministrationChange />
      </Grid>
    </Grid>
  );
}

export default Administration;
