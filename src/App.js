import React from "react";
import "./App.css";
import Home from "./LandingPage/Home";
import RegisterUser from "./RegisterPage/RegisterUser";
import Header from "./Header/Header";
import Login from "./Login/Login";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
//Router - Everything enclosed under Router will be eligible for Routing
//Route - Renders out the component based on the URL

function App() {
  return (
    <>
      <Home />
    </>
  );
}

export default App;
