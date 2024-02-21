import axios from 'axios';
import { loginRequest, loginSuccess, loginFail, logout, registerRequest, registerSuccess, registerFail,getUserFail,getUserRequest,getUserSuccess } from '../reducer/userReducer';
import {emptytodo} from "../reducer/todoReducer"

// Action function for user login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password }, config);
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response && error.response.data.message ? error.response.data.message : error.message));
  }
};

// Action function for user logout
export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(emptytodo());
  dispatch(logout());
};

// Action function for user registration
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('http://localhost:5000/api/users', { name, email, password }, config);
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response && error.response.data.message ? error.response.data.message : error.message));
  }
};


export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch(getUserRequest());

    const {
      userLogin: { userInfo }, // 2 level destructuring
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`http://localhost:5000/api/users/profile`, config);

    dispatch(getUserSuccess(data));
  } catch (err) {
    dispatch(getUserFail(err.response && err.response.data.message
      ? err.response.data.message
      : err.message)
      
     
    );
  }
};
