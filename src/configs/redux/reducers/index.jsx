import { combineReducers } from "redux";
import userReducer from "./User";

const rootReducers = combineReducers({ user: userReducer });

export default rootReducers;
