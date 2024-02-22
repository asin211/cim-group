import Chart from "../../components/chart/Chart";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";

import { useEffect, useMemo, useState, useContext } from "react";
import axios from "axios";

import { UserContext } from "../../context/userContext/UserContext";
import { getUsers } from "../../context/userContext/apiCalls";
import { VideoContext } from "../../context/videoContext/VideoContext";
import { getVideos } from "../../context/videoContext/apiCalls";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

import BASE_URL from '../../apiConfig';

export default function Home() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);
  const [videoStats, setVideoStats] = useState([]);

  const { users, dispatch: userDispatch } = useContext(UserContext);
  const { videos, dispatch: videoDispatch } = useContext(VideoContext);

  useEffect(() => {
    getUsers(userDispatch);
    getVideos(videoDispatch);
  }, [userDispatch, videoDispatch]);

  useEffect(() => {
    const getUserStats = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users/stats`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
          },
        });
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getUserStats();
  }, [MONTHS]);

  useEffect(() => {
    const getVideoStats = async () => {
      try {
        const res_1 = await axios.get(`${BASE_URL}/videos/stats`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
          },
        });
        const statsList = res_1.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setVideoStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New Video": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getVideoStats();
  }, [MONTHS]);

  return (
    <>
      <Topbar />
      <div className="outer-container">
        <Sidebar />
        <div className="home-container">
          <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
          <Chart data={videoStats} title="Video Analytics" grid dataKey="New Video" />
          <div className="homeWidgets">
            <WidgetSm newUsers={users.slice(0, 6)} />
            <WidgetLg newVideos={videos.slice(0, 5)} />
          </div>
        </div>
      </div>
    </>
  );
}
