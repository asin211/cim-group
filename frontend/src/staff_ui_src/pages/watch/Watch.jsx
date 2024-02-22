import { ArrowBackOutlined } from "@material-ui/icons";
import "./watch.scss";
import { Link, useLocation } from "react-router-dom";

export default function Watch() {
  const location = useLocation();
  const video = location.state.video;
  // console.log(location)
  return (
    <div className="watch">
      <Link to="/videos">
        <div className="back">
          <ArrowBackOutlined />
        </div>
      </Link>
      <video
        className="video"
        autoPlay
        progress
        controls
        src={video.video}
      />
    </div>
  );
}
