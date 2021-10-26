import React from "react";
import "./Login.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import RegisterUser from "../RegisterPage/RegisterUser";
import PageHeader from "../PageHeader/PageHeader";
import Header from "../Header/Header";
import Paper from "@mui/material/Paper";
import { CssBaseline } from "@material-ui/core";

function login() {
  const LoginToApp = () => {};

  const register = () => {};

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
    </>

    // <div className="login">
    //   <img
    //     src={logo}
    //     alt="Image"
    //   />

    //   <form>

    //     <input type="email" placeholder="Email" />
    //     <input type="password" placeholder="password" />

    //     <label> Select Role </label>
    //     <select>
    //       <option value="Developer"> Developer</option>
    //       <option value="Manager"> Manager</option>
    //       <option value="ScrumMaster"> Scrum Master</option>
    //       <option value="BusinessHead"> Business Head</option>
    //     </select>

    //     <button type="submit" onClick={LoginToApp}>
    //       {" "}
    //       Sign in{" "}
    //     </button>
    //   </form>

    //   <p>
    //     Not a member? {"  "}
    //     <span className="login__register" onClick={register}>
    //       Register Now
    //     </span>
    //   </p>

    // </div>
  );
}

export default login;
