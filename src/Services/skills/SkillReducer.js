import {
  FETCH_SKILL_REQUEST,
  UPDATE_SKILL_REQUEST,
  SKILL_SUCCESS,
  SKILL_FAILURE,
} from "./skillTypes";

const initialState = {
  skills: [],
  errors: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SKILL_REQUEST || UPDATE_SKILL_REQUEST:
      return {
        ...state,
      };

    case SKILL_SUCCESS:
      return {
        skills: action.payload,
        error: "",
      };
    case SKILL_FAILURE:
      return {
        skills: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
