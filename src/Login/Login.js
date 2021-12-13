import React from "react";
import "./Login.css";
import Controls from "../Controls/Controls";
import { Form } from "../useForm";
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

  const { values, errors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );

  return (
    <>
      <Header />

      <div className="login">
        <Form>
          <Controls.Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            label="Password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            error={errors.password}
          />
        </Form>
      </div>
    </>
  );
}
