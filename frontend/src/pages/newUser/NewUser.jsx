import "./newUser.css";

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";
import storage from "../../firebase";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";


export default function NewUser() {
  const [user, setUser] = useState(null);
  const { dispatch } = useContext(UserContext)
  const navigate = useNavigate()
  const [progress, setProgress] = useState(null);

  // Email Pattern to test a valid email address
  const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  // Password Pattern to test password should be 6-15 characters and include at least 1 letter, 1 number and 1 special character!
  const password_pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/

  // Username Pattern to test username  should be 4 - 15 characters in length
  const username_pattern = /^(?!.*undefined)[^\s]{4,15}$/

  const [err, setErr] = useState({
    "validate_user": ""
  })

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setErr((prevErr) => ({ ...prevErr, validate_user: "Please enter valid user details!" }));
    } else {
      if (email_pattern.test(user.email) && username_pattern.test(user.username) && password_pattern.test(user.password)) {
        createUser(user, dispatch);
        navigate("/admin/users")
      } 
    }
  };
  
  const handleUpload = async (e) => {
    const file = e.target.files[0]
    const fileName = new Date().getTime() + "_" + e.target.name + "_" + file.name;
    const uploadTask = storage.ref(`/items/${fileName}`).put(file);
    
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
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          setUser((prev) => {
            return { ...prev, [e.target.name]: url };
          });
        });
      }
    );

    // delete first file from firebase storage if user attempt to load another one
    await new Promise((resolve, reject) => {
      // for deleting old file in firebase storage
      if (user !== null && user[e.target.name]) {
        const oldFileName = user[e.target.name].split("items%2F")[1].split("?")[0]
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
  };

  return (
        <>
      <Topbar />
      <div className="outer-container">
        <Sidebar />
        <div className="newUser" style={{ boxSizing: 'content-box' }}>
          <h1 className="newUserTitle">New User</h1>
          <form>
            <div className="newUserForm">
              <div className="newUserItem">
                <label>Username</label>
                <input type="text" placeholder="john@1" name="username" onChange={handleChange} required minLength={4} maxLength={15} />
                {
                  !username_pattern.test(user?.username) && <span style={{ color: 'red', fontSize: "12px" }}>Username should be 4 - 15 characters and unique!</span>
                }
              </div>
              <div className="newUserItem">
                <label>Full Name</label>
                <input type="text" placeholder="John Smith" name="full_name" onChange={handleChange} />
              </div>
              <div className="newUserItem">
                <label>Email</label>
                <input type="email" placeholder="john@gmail.com" name="email" onChange={handleChange} />
                {
                  !email_pattern.test(user?.email) && <span style={{ color: 'red', fontSize: "12px" }}>Please enter a valid email address!</span>
                }
              </div>
              <div className="newUserItem">
                <label>Password</label>
                <input type="password" placeholder="password" name="password" onChange={handleChange} />
                {
                  !password_pattern.test(user?.password) && <span style={{ color: 'red', fontSize: "12px" }}>Password should contain at least 1 letter, 1 number, 1 special character, and be 6-15 characters!</span>
                }
              </div>

              <div className="newUserItem">
                <label>Staff ID</label>
                <input type="text" placeholder="IN001" name="staff_id" onChange={handleChange} />
              </div>
              <div className="newUserItem">
                <label>Admin</label>
                <select className="newUserSelect" name="is_admin" id="is_admin" onChange={handleChange}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div className="newUserItem">
                <label>Active</label>
                <select className="newUserSelect" name="is_active" id="is_active" onChange={handleChange}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div className="newUserItem">
                <label>Profile Image</label>
                <input
                  type="file"
                  id="img"
                  name="profile_img"
                  // onChange={(e) => setProfileImg(e.target.files[0])}
                  onChange={handleUpload}
                />
                {progress
                  && <i>{`File is ${progress} % uploaded`}</i>
                }
              </div>
            </div>
            {
              !user && err.validate_user && <span style={{ color: 'red', fontSize: "12px", marginTop: "10px" }}>{err.validate_user}</span>
            }
            <div>
              {
                (progress === null || progress === 100) &&
                <button className="newUserButton"
                  onClick={handleSubmit}>
                  Create
                </button>
              }
            </div>
          </form>
        </div>
      </div>
    </>

  );
}
