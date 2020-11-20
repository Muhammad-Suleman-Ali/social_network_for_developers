import { combineReducers } from "redux";
import authReducer from './reducers/authReducer'
import errorReducer from './reducers/errorReducer'
import profileReducer from './reducers/profileReducer'


const rootReducer = combineReducers({
    auth:authReducer,
    errors:errorReducer,
    profile:profileReducer

});
export default rootReducer;