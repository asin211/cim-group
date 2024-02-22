import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom"

// import { AuthContext } from "../../authContext/AuthContext";
// import { logout } from "../../authContext/AuthActions";

import { AuthContext } from "../../../context/authContext/AuthContext";
import { logout } from "../../../context/authContext/AuthActions";


function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar-container scrolled shadow-none" : "navbar-container shadow-none" }>
      <div className="container ">
        <div className="left">
          <div className="logo">CIM Group</div>
          <Link to="/" className="link">
            <span className="navbarmainLinks">Home</span>
          </Link>
          <Link to="/projects" className="link">
            <span className="navbarmainLinks">Projects</span>
          </Link>
          <div className="videos">
            <span className="navbarmainLinks">Videos</span>
            <div className="options">
              <Link to="/videos" className="link">
                <span className="navbarmainLinks">All Videos</span>
              </Link>
              <Link to="/list" className="link videoCategory">
                <span className="">Video Category</span>
              </Link>
            </div>
          </div>

          {/* <span>Services</span> */}
          <Link to="/book" className="link">
            <span className="">Book</span>
          </Link>
        </div>
        <div className="right">
          {/* <Search className="icon" /> */}
          <span className="icon username">{user.username}</span>
          {/* <Notifications className="icon" /> */}
          <img
            src={user.profile_img}
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              {/* <span>Settings</span> */}
              {
                user.is_admin && <Link to="/admin" className="link" >
                  <span>Admin UI</span>
                </Link>
              }

              <Link className="link" >
                <span onClick={() => dispatch(logout())}>Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
