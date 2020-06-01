import { combineReducers } from "redux";
import authReducer from "./authReducer";
import coreReducer from "./coreReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    core: coreReducer
})

export default rootReducer