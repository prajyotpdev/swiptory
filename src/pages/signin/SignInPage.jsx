import React from "react";
import styles from "../signin/SignInPage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAsync, selectUser } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import User from "../../store/models/User.jsx";
import MusicArtLogo from "../../../src/assets/icons/musicArtLogo.svg";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user.user);

  const [user, setUser] = useState(new User());

  const updateUser = () => {
    const updatedUser = new User("prajyot@getTimeMeasureUtils.com");
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    dispatch(
      loginAsync({
        email: email,
        password: password,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("User Signed In");
    const userData = {
      email: email,
      password: password,
    };

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const signin = await fetch(`${baseUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (signin.ok) {
        const responseJson = await signin.json();
      } else {
        // Handle the case when the request was not successful
        console.error("Signin failed with status:", signin.status);
      }
    } catch (err) {
      console.error();
    }
  };

  const handleCheckHealth = async (e) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const checkHealth = await fetch(`${baseUrl}/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("server is running = " + checkHealth.json);
  };

  const routeChange = () => {
    let path = `signup`;
    navigate("/swiptory/register");
  };

  return (
    <div className={styles.signInContainer}>
      <div className={styles.leftSide}>
        <button className={styles.logo}>
          <img src={MusicArtLogo} alt="logo" />
          SwipTory
        </button>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.heading}>
          <h1>Sign in</h1>
        </div>
        {/* <h3>Your personal job finder is here</h3> */}
        <div className={styles.signInForm}>
          <form onSubmit={handleSignIn} className={styles.signInForm}>
            Email
            <input
              className={styles.inputfield}
              type="email"
              onChange={handleEmail}
            />
            Password
            <input
              className={styles.inputfield}
              type="password"
              onChange={handlePassword}
            />
            <button type="submit" className={styles.submitbtn}>
              Log in
            </button>
            <div className={styles.signup} onClick={routeChange}>
              Don't have account yet?{" "}
              <div className={styles.signupbtn}>Register</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
