import { LOGIN_REQUEST, LOGOUT_REQUEST, SUCCESS, FAILURE } from "./authTypes";
import axios from "axios";

export const authenticateUser = (username, userpwd) => {
  const credentials = {
    username: username,
    userpwd: userpwd,
  };
  return (dispatch) => {
    dispatch(loginRequest());
    axios
      .post("http://localhost:8080/signin", credentials)
      .then((response) => {
        let token = response.data.token;
        localStorage.setItem("jwtToken", token);
        dispatch(success(true));
      })
      .catch((error) => {
        dispatch(failure());
      });
    // if (email === "test" && password === "test") {
    //   dispatch(success(true));
    // } else {
    //   dispatch(failure());
    // }
  };
};

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
    localStorage.removeItem("jwtToken");
    dispatch(success(false));
  };
};

const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const success = (isLoggedIn) => {
  return {
    type: SUCCESS,
    payload: isLoggedIn,
  };
};

const failure = () => {
  return {
    type: FAILURE,
    payload: false,
  };
};
