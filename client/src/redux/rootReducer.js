import { combineReducers } from "redux";
import authReducer from './reducers/authReducer'
import errorReducer from './reducers/errorReducer'
import postReducer from "./reducers/postReducer";
import profileReducer from './reducers/profileReducer'


const rootReducer = combineReducers({
    auth:authReducer,
    errors:errorReducer,
    profile:profileReducer,
    post:postReducer

});
export default rootReducer;