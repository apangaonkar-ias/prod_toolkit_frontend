import { combineReducers } from "redux";
import userReducer from "./user/UserReducer";
import authReducer from "./auth/authReducer";
import SkillReducer from "./skills/SkillReducer";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  skill: SkillReducer,
});

export default rootReducer;
