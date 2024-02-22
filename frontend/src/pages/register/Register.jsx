import "./register.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { register } from "../../context/authContext/apiCalls";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Email Pattern to test a valid email address
  const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  // Password Pattern to test password should be 6-15 characters and include at least 1 letter, 1 number and 1 special character!
  const password_pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/

  // Username Pattern to test username  should be 4 - 15 characters in length
  const username_pattern = /^(?!.*undefined)[^\s]{4,15}$/

  const [err, setErr] = useState({
    "email": "",
    "password": "",
    "username": "",
    "validate_user": ""
  })

  const handleFocus = (e) => {
    if (e.target.name === 'email') {
      if (!email_pattern.test(email)) {
        setErr((prevErr) => ({ ...prevErr, email: "Please enter a valid email address!" }));
      }
    }
    else if (e.target.name === 'username') {
      if (!username_pattern.test(username)) {
        setErr((prevErr) => ({ ...prevErr, username: "Username should be 4 - 15 characters and unique" }));
      }
    }
    else if (e.target.name === 'password') {
      if (!password_pattern.test(password)) {
        setErr((prevErr) => ({ ...prevErr, password: "Password should be 6-15 characters and include at least 1 letter, 1 number and 1 special character!" }));
      }
    }
  };

  const handleRegister = async (e) => {
    if (email.length === 0 || username.length === 0 || password.length === 0) {
      // 
    } else {
      if (!email || !username || !password) {
        console.log(3)
        e.preventDefault();
        console.log("please check your details")
      } else {
        try {
          console.log(4)
          e.preventDefault();
          if (email_pattern.test(email) && username_pattern.test(username) && password_pattern.test(password)) {
            register({ email, username, password });
            navigate("/")
          } else {
            setErr((prevErr) => ({ ...prevErr, validate_user: "Please check your details" }))
          }
        } catch (err) {
          console.log(err.message)
        }
      }
    }
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <div className="logo">CIM Group</div>
          <Link to="/login">
            {/* <button className="loginButton">Login</button> */}
          </Link>
        </div>
      </div>

      <div className="outer-container">
        <form>
          <h1 style={{ color: 'white' }}>Register</h1>
          <input type="email" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)} required pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" onBlur={handleFocus} />
          {
            !email_pattern.test(email) && err.email && <span style={{ color: 'red', fontSize: "12px" }}> {err.email}</span>
          }

          <input type="username" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} pattern="^.{4,}$" minLength={3} maxLength={15} required onBlur={handleFocus} />
          {
            !username_pattern.test(username) && err.username && <span style={{ color: 'red', fontSize: "12px" }}> {err.username}</span>
          }

          <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$" onBlur={handleFocus} minLength={6} maxLength={15} />
          {
            !password_pattern.test(password) && err.password && <span style={{ color: 'red', fontSize: "12px" }}> {err.password}</span>
          }

          <button className="loginButton" onClick={handleRegister} >Register</button>
          {
            err.validate_user && <i><span style={{ color: 'red', fontSize: "12px" }}>{err.validate_user}</span></i>
          }
          <span>
            <Link to="/" >
              <b>Login</b>
            </Link>
          </span>
        </form>
      </div>

    </div>
  );
}
