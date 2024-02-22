import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { Link } from "react-router-dom";


export default function WidgetSm({newUsers}) {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user) => (
          <li className="widgetSmListItem">
            <img
              src={
                user.profile_img ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <Link to={"/admin/users"}>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}