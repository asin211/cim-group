import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  Publish,
  StarBorder,
  VerifiedUser,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./user.css";


import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { updateUser } from "../../context/userContext/apiCalls";
import storage from "../../firebase";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";


export default function User() {
  const location = useLocation()
  const selected_user = location.state.user;

  const [user, setUser] = useState(selected_user);
  const { dispatch } = useContext(ListContext);
  const navigate = useNavigate()
  const [progress, setProgress] = useState(null);
  const [upload, setUpload] = useState(false);

  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  // console.log(formattedDate); // Output: 17 May 2023

  const [err, setErr] = useState({
    "validate_user": ""
  })

  // Email Pattern to test a valid email address
  const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  // Password Pattern to test password should be 6-15 characters and include at least 1 letter, 1 number and 1 special character!
  const password_pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/

  // Username Pattern to test username  should be 4 - 15 characters in length
  const username_pattern = /^(?!.*undefined)[^\s]{4,15}$/

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    // if (user.profile_img) {
    //   updateUser(user, dispatch);
    //   console.log("User updated in the database: ", user);
    // }

    e.preventDefault();
    if (!email_pattern.test(user?.email) || !username_pattern.test(user?.username)) {
      setErr((prevErr) => ({ ...prevErr, validate_user: "Please enter valid User details!" }));
    } else {
      updateUser(user, dispatch);
      navigate("/admin/users")
    }
  };


  const handleUpload = async (e) => {
    const file = e.target.files[0]
    const label = e.target.name

    console.log('file: ', file)
    // uploading new file to firebase storage
    const fileName = new Date().getTime() + "_" + e.target.name + "_" + file.name;
    const uploadTask = storage.ref(`/items/${fileName}`).put(file);
    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress)
        },
        (error) => {
          console.log(error);
          reject(error)
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setUser((prev) => {
              return { ...prev, [e.target.name]: url };
            });
            resolve()
            setUpload(true)
          })
        }
      )
    })

    await new Promise((resolve, reject) => {
      // for deleting old file in firebase storage
      if (user[label]) {
        const oldFileName = user[label].split("items%2F")[1].split("?")[0]
        const deleteOldFile = storage.ref(`/items/${oldFileName || ""}`);

        //delete old file from firebase storage
        deleteOldFile.delete().then(() => {
          console.log("File deleted successfully")
          resolve()
        }).catch((error) => {
          console.log("Error: ", error)
          reject(error)
        })
      }
    });
  }

  useEffect(() => {
    if (upload) {
      updateUser(user, dispatch);
      console.log("User updated in the database: ", user);
      setUpload(false)
    }
  }, [upload]);
  return (
    <>
      <Topbar />
      <div className="outer-container">
        <Sidebar />
        <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            <Link to="/admin/newUser">
              <button className="userAddButton">Create</button>
            </Link>
          </div>
          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <img
                  src={user.profile_img}
                  alt=""
                  className="userShowImg"
                />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">{user.username}</span>
                  <span className="userShowUserTitle">{user.staff_id}</span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">User Details</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.full_name}</span>
                </div>
                <div className="userShowInfo">
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">{formattedDate}</span>
                </div>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                  <StarBorder className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.is_admin === "true" ? "Admin" : "Staff"}</span>
                </div>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.email}</span>
                </div>
                <div className="userShowInfo">
                  <VerifiedUser className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.staff_id}</span>
                </div>
              </div>
            </div>

            <div className="userUpdate">
              <span className="userUpdateTitle">Edit</span>
              <form className="userUpdateForm">
                <div className="userUpdateLeft" style={{ width: "250px" }}>
                  <div className="userUpdateItem">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      placeholder={user.username}
                      className="userUpdateInput"
                      onChange={handleChange}
                    />
                    {
                      !username_pattern.test(user?.username) && <span style={{ color: 'red', fontSize: "12px" }}>Username should be 4 - 15 characters, without space and unique!</span>
                    }
                  </div>
                  <div className="userUpdateItem">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={user.full_name}
                      placeholder={user.full_name}
                      className="userUpdateInput"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      placeholder={user.email}
                      className="userUpdateInput"
                      onChange={handleChange}
                    />
                    {
                      !email_pattern.test(user?.email) && <span style={{ color: 'red', fontSize: "12px" }}>Please enter a valid email address!</span>
                    }
                  </div>
                  {/* <div className="userUpdateItem">
                <label> New Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div> */}
                  <div className="userUpdateItem">
                    <label>Staff Id</label>
                    <input
                      type="text"
                      name="staff_id"
                      value={user.staff_id}
                      placeholder={user.staff_id}
                      className="userUpdateInput"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label for="is_admin" >Admin</label>
                    <select className="newUserSelect" name="is_admin" id="admin" onChange={handleChange}>
                      <option value={user.is_admin}>Select</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                  <div className="userUpdateItem">
                    <label>Active</label>
                    <select className="newUserSelect" name="is_active" id="active" onChange={handleChange}>
                      <option value={user.is_active}>Select</option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </div>
                <div className="userUpdateRight">
                  <div className="userUpdateUpload">
                    <img
                      className="userUpdateImg"
                      src={user.profile_img}
                      name="profile_img"
                      alt=""
                    />
                    <label htmlFor="file">
                      <Publish className="userUpdateIcon" />
                    </label>
                    <input type="file" id="file"
                      name="profile_img"
                      onChange={handleUpload}
                      id="file" style={{ display: "none" }} />
                  </div>
                  <button className="userUpdateButton" onClick={handleSubmit}>Update</button>
                </div>
              </form>
              <div style={{ marginTop: 10 }}>
                {progress
                  && <i>{`File is ${progress} % uploaded`}</i>
                }
                {
                  (!email_pattern.test(user?.email) || !username_pattern.test(user?.username)) && err.validate_user && <span style={{ color: 'red', fontSize: "12px", marginTop: "10px" }}>{err.validate_user}</span>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
