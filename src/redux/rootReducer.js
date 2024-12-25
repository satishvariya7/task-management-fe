import { combineReducers } from "redux";
import { projectData, taskData, userData } from "./reducer";

export default combineReducers({
  userData,
  projectData,
  taskData
});
