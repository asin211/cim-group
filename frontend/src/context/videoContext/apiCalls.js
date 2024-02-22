import axios from "axios";
import {
  createVideoFailure,
  createVideoStart,
  createVideoSuccess,
  deleteVideoFailure,
  deleteVideoStart,
  deleteVideoSuccess,
  getVideosFailure,
  getVideosStart,
  getVideosSuccess,
  updateVideoFailure,
  updateVideoStart,
  updateVideoSuccess,
} from "./VideoActions";

import BASE_URL from '../../apiConfig';

//get
export const getVideos = async (dispatch) => {
  dispatch(getVideosStart());
  try {
    const res = await axios.get(`${BASE_URL}/videos`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
      },
    });
    dispatch(getVideosSuccess(res.data));
  } catch (err) {
    dispatch(getVideosFailure());
  }
};

//create
export const createVideo = async (video, dispatch) => {
  dispatch(createVideoStart());
  try {
    const res = await axios.post(`${BASE_URL}/videos`, video, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
      },
    });
    dispatch(createVideoSuccess(res.data));
  } catch (err) {
    dispatch(createVideoFailure());
  }
};

//delete
export const deleteVideo = async (id, dispatch) => {
  dispatch(deleteVideoStart());
  try {
    await axios.delete(`${BASE_URL}/videos/` + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
      },
    });
    dispatch(deleteVideoSuccess(id));
  } catch (err) {
    dispatch(deleteVideoFailure());
  }
};

//update
export const updateVideo = async (video, dispatch) => {
  dispatch(updateVideoStart());
  try {
    const res = await axios.put(`${BASE_URL}/videos/` + video._id, video, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
      },
    });
    dispatch(updateVideoSuccess(res.data));
  } catch (err) {
    dispatch(updateVideoFailure());
  }
};