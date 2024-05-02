import React from "react";
import styles from "../register/RegisterPage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAsync, selectUser } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
// import ArtImage from "../../assets/images/LoginPageArt.png";
import MusicArtLogo from "../../../src/assets/icons/musicArtLogo.svg";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user.user);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePhonenumber = (e) => {
    setPhonenumber(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleregister = async (e) => {
    e.preventDefault();
    alert("User Signed In");
    dispatch(
      loginAsync({
        email: email,
        password: password,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    alert("User Added");
    const userData = {
      email: email,
      password: password,
      name: name,
      mobile: phonenumber,
    };

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const add = await fetch(`${baseUrl}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
    } catch (err) {
      console.error();
    }
  };
  const routeChange = () => {
    let path = `signup`;
    navigate("/swiptory/signin");
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.leftSide}>
        <button className={styles.logo}>
          <img src={MusicArtLogo} alt="logo" />
          SwipTory
          
        </button>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.heading}>
          <h1>Register</h1>
        </div>
        {/* <h3>Your personal job finder is here</h3> */}

        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <input
            placeholder="Name"
            type="text"
            onChange={handleName}
            className={styles.inputfield}
          />
          <input
            placeholder="Email"
            type="email"
            onChange={handleEmail}
            className={styles.inputfield}
          />
          <input
            placeholder="Mobile"
            type="number"
            onChange={handlePhonenumber}
            className={styles.inputfield}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={handlePassword}
            className={styles.inputfield}
          />
          <button type="submit" className={styles.submitbtn}>
            Register
          </button>
          <div className={styles.signin} onClick={routeChange}>
            Have an account? <div className={styles.signinbtn}>Log in</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
