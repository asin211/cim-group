import "./featured.scss";
import cim_background_video from "../../assets/videos/home_background_video.mp4"

export default function Featured() {

  return (
    <div className="featured">
      <video
        src={cim_background_video}
        autoPlay
        muted
        loop
      />

      <div className="info">
        <p> Owner, Operator, Lender & Developer of Real Assets</p>
        <span className="desc">
          Creating real value for our Customers
        </span>
      </div>
    </div>
  );
}
