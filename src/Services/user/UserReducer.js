import {
  USER_FAILURE,
  USER_SUCCESS,
  FETCH_USER_REQUEST,
  UPDATE_USER_REQUEST,
  SAVE_USER_REQUEST,
  DELETE_USER_REQUEST,
  LOGGED_IN_USER,
  ROADMAP_SKILLS_REQUEST,
} from "./userTypes";

const initialState = {
  users: [],
  errors: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST ||
      UPDATE_USER_REQUEST ||
      SAVE_USER_REQUEST ||
      LOGGED_IN_USER ||
      ROADMAP_SKILLS_REQUEST ||
      DELETE_USER_REQUEST:
      return {
        ...state,
      };

    case USER_SUCCESS:
      return {
        users: action.payload,
        error: "",
      };
    case USER_FAILURE:
      return {
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
