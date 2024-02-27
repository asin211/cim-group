import axios from "axios";
import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./UserActions";

import BASE_URL from '../../apiConfig';

//get all users
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get(`${BASE_URL}/users`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

// create
export const createUser = async (user, dispatch) => {
  dispatch(createUserStart());
  try {
    const res = await axios.post(`${BASE_URL}/users`, user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
      },
    });
    dispatch(createUserSuccess(res.data));
  } catch (err) {
    dispatch(createUserFailure());
  }
};

//delete
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axios.delete(`${BASE_URL}/users/` + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
      },
    });
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

//update
export const updateUser = async (user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.put(`${BASE_URL}/users/` + user._id, user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
      },
    });
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
