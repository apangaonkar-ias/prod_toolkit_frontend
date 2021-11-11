import React, { useState } from "react";
import "./Login.css";
import logo from "../images/logo.png";

import RegisterUser from "../RegisterPage/RegisterUser";
import PageHeader from "../PageHeader/PageHeader";
import Paper from "@mui/material/Paper";
import { CssBaseline, makeStyles } from "@material-ui/core";
import Controls from "../Controls/Controls";
import { Form } from "../useForm";
import AddIcon from '@mui/icons-material/Add';

export default function login() {


  const LoginToApp = () => {};

  const register = () => {};

  const useStyles = makeStyles()
 
  return (
    <>
      {/* <PageHeader
        title="Employee Profile"
        subtitle=""
      /> */}
      <Paper variation="elevated">
        <RegisterUser />
      </Paper>
      <CssBaseline />
   

    <div className="login">
      <img
        src={logo}
        alt="Image"
      />

    <Form >

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="password" />

        <label> Select Role </label>
        <select>
          <option value="Developer"> Developer</option>
          <option value="Manager"> Manager</option>
          <option value="ScrumMaster"> Scrum Master</option>
          <option value="BusinessHead"> Business Head</option>
        </select>

        <button type="submit" onClick={LoginToApp}>
          {" "}
          Sign in{" "}
        </button>
        </Form>

      

      <p>
        Not a member? {"  "}
    
        <Controls.Button text="Register" variant = "outlined" startIcon = {<AddIcon/>}/>
      </p>

    </div>

    </>
  );
 
}

