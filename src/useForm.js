import { React, useState } from "react";
import "./useForm.css";
import { makeStyles } from "@material-ui/core";

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});
  const [index, setIndex] = useState(2);

  const handleInputChange = (e) => {
    console.log("In handle input change");

    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    console.log("In handle input change");
    console.log(values);
    if (validateOnChange) validate({ [name]: value });
  };

  
  const resetForm = () => {
    console.log("INside Reset Funtionality")
    setValues(initialFValues);
    console.log(initialFValues);
    console.log("INside Reset Funtionality")
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    index,
    setIndex
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
