import { React, useState } from "react";
import "./useForm.css";

export function useForm(initialFieldValues) {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...value,
      [name]: value,
    });
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
  };
}

export function Form(props) {
  const { children, ...other } = props; // children means all the elements inside the
  //form attribute in registerForm
  // other will have onSubmit event
  return (
    <form autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
