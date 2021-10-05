import { combineReducers } from "redux";
import path from "./layout/breadcrumbReducer";
import task from "./task/taskReducers";

const rootReducer = combineReducers({
    path,
    task
  });
  
  export default rootReducer;
  