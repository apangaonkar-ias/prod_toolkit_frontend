import {
  FETCH_SKILL_REQUEST,
  UPDATE_SKILL_REQUEST,
  SKILL_SUCCESS,
  SKILL_FAILURE,
} from "./skillTypes";

import axios from "axios";

export const fetchSkills = () => {
  console.log("Fetching skills");
  return (dispatch) => {
    dispatch(fetchSkillRequest());
    axios
      .get("http://localhost:8080/toolkit/home2")
      .then((response) => {
        dispatch(SkillSuccess(response.data));
      })
      .catch((error) => {
        dispatch(SkillFailure(error.message));
      });
  };
};

const fetchSkillRequest = () => {
  return {
    type: FETCH_SKILL_REQUEST,
  };
};

export const updateSkill = (postData, e_id) => {
  return (dispatch) => {
    console.log("In updateSkill");
    dispatch(updateSkillRequest());
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    console.log("Inside Editing in actions");
    axios.put(
      "http://localhost:8080/toolkit/updateUserSkills/" + e_id,
      postData,
      {
        headers: headers,
      }
    );
  };
};

const updateSkillRequest = () => {
  return {
    type: UPDATE_SKILL_REQUEST,
  };
};

const SkillSuccess = (skills) => {
  return {
    type: SKILL_SUCCESS,
    payload: skills,
  };
};

const SkillFailure = (error) => {
  return {
    type: SKILL_FAILURE,
    payload: error,
  };
};
