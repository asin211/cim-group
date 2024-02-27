import "./listItem.scss";
import { PlayArrow, Add, ThumbUpAltOutlined, ThumbDownOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import BASE_URL from '../../../apiConfig';

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [video, setVideo] = useState({});

  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/videos/` + item, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
          },
        });
        setVideo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getVideo();
  }, [item]);
  console.log(video)
  return (

    <Link
      to={"/watch"}
      state={{ video: video }}
    >
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={video.thumbnail || ""}
          alt=""
        />
        {isHovered && (
          <>
            <video src={video.video} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{video.title}</span>
              </div>
              <div className="itemInfoTop">
                <span>{video.duration}</span>
                <span className="limit">{video.type}</span>
                <span className="limit">{video.year}</span>
              </div>
              <div className="desc">
                {video.desc}
              </div>
              <div className="genre">{video.category}</div>
            </div>
          </>
        )}
      </div>
    </Link>

  );
}
