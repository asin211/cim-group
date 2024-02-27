import React, { useContext, useState } from "react";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./login.scss";

import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isFetching, dispatch } = useContext(AuthContext);

  const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/   //validate email
  const password_pattern = /^.{6,}$/  //consists for at least 6 characters

  const [err, setErr] = useState({
    "email": "",
    "password": "",
  })

  const handleLogin = (e) => {
    // e.preventDefault();
    // login({ email, password }, dispatch);

    if (email.length === 0 || password.length === 0) {
      // 
    } else {
      if (!email || !password) {
        e.preventDefault();
        console.log("please check email and password")
      } else {
        e.preventDefault();
        login({ email, password }, dispatch);
      }
    }
  };

  const handleFocus = (e) => {
    if (e.target.name === 'email') {
      if (!email_pattern.test(email)) {
        setErr((prevErr) => ({ ...prevErr, email: "Please enter a valid email address!" }));
        console.log('111', err.email, e.target.name)
      }
    }
    else if (e.target.name === 'password') {
      console.log(1)
      if (!password_pattern.test(password)) {
        console.log(2)
        setErr((prevErr) => ({ ...prevErr, password: "Password should be at least 6 characters!" }));
        console.log('222', err.password, e.target.name)
      }
    }
  };

  return (
    // <div className="login">
    //   <form className="loginForm">
    //     <input
    //       type="text"
    //       placeholder="email"
    //       className="loginInput"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="password"
    //       className="loginInput"
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button
    //       className="loginButton"
    //       onClick={handleLogin}
    //       disabled={isFetching}
    //     >
    //       Login
    //     </button>
    //   </form>
    // </div>

    <>
      <div className="login">
        <div className="top">
          <div className="wrapper">
            <div className="logo">CIM Group</div>
          </div>
        </div>
        <div className="outer-container">
          <form>
            <h1 style={{ color: 'white'}}>Sign In</h1>
            <input type="email" name="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required onBlur={handleFocus} />
            {
              !email_pattern.test(email) && err.email && <span style={{ color: 'red', fontSize: "12px" }}> {err.email}</span>
            }

            <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required onBlur={handleFocus} minLength={6} />
            {
              !password_pattern.test(password) && err.password && <span style={{ color: 'red', fontSize: "12px" }}> {err.password}</span>
            }

            <button className="loginButton" onClick={handleLogin} disabled={isFetching} >Sign In</button>
            {
              error && <i><span style={{ color: 'red', fontSize: "12px" }}> Please check your Login details</span></i>
            }

            {/* <button disabled={email.length < 10 || password.length < 5} className="loginButton" onClick={handleLogin} >Sign In</button> */}
            <span>
              <Link to="/register" >
                <b>Register</b>
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
