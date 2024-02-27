import axios from "axios";
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "./AuthActions";

import BASE_URL from '../../apiConfig';

/*
export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/login", user);
    res.data.is_admin && dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
*/

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    // const res = await axios.post("auth/login", user);
    const res = await axios.post(`${BASE_URL}/auth/login`, user);
    dispatch(loginSuccess(res.data));
    // console.log(res.data)
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (new_user, dispatch) => {
  // dispatch(registerStart());
  try {
    // const res = await axios.post("auth/register", new_user);
    const res = await axios.post(`${BASE_URL}/auth/register`, new_user);
    // dispatch(registerSuccess());
  } catch (err) {
    // dispatch(registerFailure());
  }
};
