import { React, useState } from "react";
import "./useForm.css";

export function useForm(initialFieldValues) {
  const [values, setValues] = useState(initialFieldValues);

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
    handleInputChange,
  };
}

export function Form(props) {
  return <form autoComplete="off">{props.children}</form>;
}
