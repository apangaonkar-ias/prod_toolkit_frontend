import { Paper } from "@mui/material";
import React from "react";
import "./PageHeader.css";

export default function PageHeader(props) {
  return (
    <Paper elevation={2} square style = {{textAlign: 'center'}}>
      <h2>{props.title}</h2>

      <p>{props.subtitle}</p>
    </Paper>
  );
}
