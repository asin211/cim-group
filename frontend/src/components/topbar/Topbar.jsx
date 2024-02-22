import React from "react";
import "./topbar.css";
import { NotificationsNone, Settings } from "@material-ui/icons";
import { useContext } from "react";
import { Link } from "react-router-dom"

import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthActions";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo"> <i>CIM Group</i></span>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div> */}
          <div className="topbarIconContainer" >
            <Settings />
            <div className="options">
              <Link to="/" className="link">
                <span className="">Staff UI</span>
              </Link>
              <Link to="/" className="link" onClick={() => dispatch(logout())}>
                <span className="">Logout</span>
              </Link>
            </div>
          </div>
          <img src={user?.profile_img || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
