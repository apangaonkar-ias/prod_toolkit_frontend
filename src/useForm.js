import { React, useState } from "react";
import "./useForm.css";
import { makeStyles } from "@material-ui/core";

// export function useForm(
//   initialFieldValues,
//   validateOnChange = false,
//   validate
// ) {
//   const [values, setValues] = useState(initialFieldValues);
//   const [errors, setErrors] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setValues({
//       ...value,
//       [name]: value,
//     });

//     if (validateOnChange) {
//       validate({ [name]: value });
//     }
//   };

//   const resetForm = () => {
//     setValues(initialFieldValues);
//     setErrors({});
//   };

//   return {
//     values,
//     setValues,
//     errors,
//     setErrors,
//     handleInputChange,
//     resetForm,
//   };
// }

// export function Form(props) {
//   const { children, ...other } = props; // children means all the elements inside the
//   //form attribute in registerForm
//   // other will have onSubmit event
//   return (
//     <form autoComplete="off" {...other}>
//       {props.children}
//     </form>
//   );
// }

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
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
