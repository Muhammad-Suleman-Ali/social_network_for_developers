import axios from "axios";
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode'; 

import { GET_ERRORS,SET_CURRENT_USER } from "../actions/types";

//Register User
export const registerUser=(userData,history)=>dispatch=>{
    
        axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
    
    };    
//Login user || Get User token
export const loginUser =(userData)=>dispatch=> {
    axios.post('/api/users/login',userData)
    .then(res => {
        //Save to local storage 
        const {token} =res.data;
        // set token to local storage 
        localStorage.setItem('jwtToken', token);
        // set token to auth header
        setAuthToken(token);
        //Decode token to get user data 
        const decoded = jwt_decode(token); 
        //set current user 
        dispatch(setCurrentUser(decoded));    
    })
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }))
};



//set logged in user

export const setCurrentUser=(decoded)=> {
    return {
        type:SET_CURRENT_USER,
        payload:decoded
    }
};
 
//Log User out 
export const logoutUser =()=>dispatch=>{
    //remove the token from local storage
    localStorage.removeItem('jwtToken');
    //remove auth header for future request 
    setAuthToken(false);
    //set current user to {} which will also set isAuthenticated to false 
    dispatch(setCurrentUser({}))
}