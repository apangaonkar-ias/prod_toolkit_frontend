import axios from "axios";
import {
  USER_FAILURE,
  USER_SUCCESS,
  FETCH_USER_REQUEST,
  UPDATE_USER_REQUEST,
  SAVE_USER_REQUEST,
  DELETE_USER_REQUEST,
} from "./userTypes";

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .get("http://localhost:8080/toolkit/home")
      .then((response) => {
        dispatch(UserSuccess(response.data));
      })
      .catch((error) => {
        dispatch(UserFailure(error.message));
      });
  };
};

const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const updateUser = (postData, e_id) => {
  return (dispatch) => {
    dispatch(updateUserRequest());
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    console.log("Inside Editing in actions");
    axios.put("http://localhost:8080/toolkit/updateEmp/" + e_id, postData, {
      headers: headers,
    });
  };
};

const updateUserRequest = () => {
  return {
    type: UPDATE_USER_REQUEST,
  };
};

export const saveUsers = (postData) => {
  return (dispatch) => {
    dispatch(saveUserrequest());
    var config = {
      method: "post",
      url: "http://localhost:8080/toolkit/addEmp",
      data: postData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios(config);
  };
};

const saveUserrequest = () => {
  return {
    type: SAVE_USER_REQUEST,
  };
};

export const deleteUser = (userId) => {
  return (dispatch) => {
    dispatch(deleteUserRequest());
    axios.delete("http://localhost:8080/toolkit/deleteEmp/" + userId);
  };
};

const deleteUserRequest = () => {
  return {
    type: DELETE_USER_REQUEST,
  };
};

const UserSuccess = (users) => {
  return {
    type: USER_SUCCESS,
    payload: users,
  };
};

const UserFailure = (error) => {
  return {
    type: USER_FAILURE,
    payload: error,
  };
};
