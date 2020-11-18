import { combineReducers } from "redux";
import authReducer from './reducers/authReducer'
import errorReducer from './reducers/errorReducer'

const rootReducer = combineReducers({
    auth:authReducer,
    errors:errorReducer

});
export default rootReducer;