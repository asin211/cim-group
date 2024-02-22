import axios from "axios";
import {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
  updateListFailure,
  updateListStart,
  updateListSuccess,
} from "./ListActions";

import BASE_URL from '../../apiConfig';

//get
export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get(`${BASE_URL}/lists`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (err) {
    dispatch(getListsFailure());
  }
};

//create
export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  try {
    const res = await axios.post(`${BASE_URL}/lists`, list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
      },
    });
    dispatch(createListSuccess(res.data));
  } catch (err) {
    dispatch(createListFailure());
  }
};

//delete
export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());
  try {
    await axios.delete(`${BASE_URL}/lists/` + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
      },
    });
    dispatch(deleteListSuccess(id));
  } catch (err) {
    dispatch(deleteListFailure());
  }
};

//update
export const updateList = async (list, dispatch) => {
  dispatch(updateListStart());
  try {
    const res = await axios.put(`${BASE_URL}/lists/` + list._id, list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
      },
    });
    dispatch(updateListSuccess(res.data));
  } catch (err) {
    dispatch(updateListFailure());
  }
};