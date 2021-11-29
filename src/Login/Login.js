import React, { useState } from "react";
import "./Login.css";
import logo from "../images/logo.png";

import RegisterUser from "../RegisterPage/RegisterUser";
import PageHeader from "../PageHeader/PageHeader";
import Paper from "@mui/material/Paper";
import { CssBaseline, makeStyles } from "@material-ui/core";
import Controls from "../Controls/Controls";
import { Form } from "../useForm";
import AddIcon from "@mui/icons-material/Add";
import Header from "../Header/Header";
import { useForm } from "../useForm";

const initialFValues = {
  password: "",
  email: "",
};

export default function Login() {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const useStyles = makeStyles();

  return (
    <>
      <Header />

      <div className="login">
        {/* <img
        src={logo}
        alt="Image"
      /> */}

        <Form>
          <Controls.Input
            label="Email"
            name="email"
            // value= {recordForEdit=== null ? email : values.email}
            value={values.email}
            // onChange={(e) => setEmail(e.target.value)}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            label="Password"
            name="password"
            // value= {recordForEdit=== null ? email : values.email}
            value={values.password}
            // onChange={(e) => setEmail(e.target.value)}
            onChange={handleInputChange}
            error={errors.password}
          />

          {/* <input type="email" placeholder="Email" /> */}
          {/* <input type="password" placeholder="password" />

        <label> Select Role </label>
        <select>
          <option value="Developer"> Developer</option>
          <option value="Manager"> Manager</option>
          <option value="ScrumMaster"> Scrum Master</option>
          <option value="BusinessHead"> Business Head</option>
        </select> */}

          {/* <button type="submit" onClick={LoginToApp}>
          {" "}
          Sign in{" "}
        </button> */}
        </Form>
      </div>
    </>
  );
}
