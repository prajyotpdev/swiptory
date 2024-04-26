import React from "react";
import styles from "./Sidebar.module.css";
import SandboxLogo from "../../../../assets/icons/sandboxLogo.svg";
import BoardIcon from "../../../../assets/icons/boardIcon.svg";
import AnalyticsIcon from "../../../../assets/icons/analyticsIcon.svg";
import SettingsIcon from "../../../../assets/icons/settingsIcon.svg";
import SignOutIcon from "../../../../assets/icons/signoutIcon.svg";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onSectionChange, currentsection }) => {
  const handleClick = (section) => {
    onSectionChange(section);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/swiptory/signin");
  };

  const dumpAllData = () => {
    localStorage.clear();
    // You can also update the state or perform any other necessary actions
  };

  return (
    <div className={styles.sidebar}>
      <button
        onClick={() => handleClick("board")}
        className={`${styles["sidebar-title"]}`}
      >
        <img src={SandboxLogo} alt="logo" />
        Pro Manage
      </button>
      <button
        onClick={() => handleClick("board")}
        className={`${styles["sidebar-item"]} ${
          currentsection === "board" ? styles.active : ""
        }`}
      >
        <img src={BoardIcon} alt="board_icon" />
        Board
      </button>
      <button
        onClick={() => handleClick("analytics")}
        className={`${styles["sidebar-item"]} ${
          currentsection === "analytics" ? styles.active : ""
        }`}
        style={{ fill: currentsection === "board" ? "blue" : "inherit" }}
      >
        <img src={AnalyticsIcon} alt="logo" />
        Analytics
      </button>
      <button
        onClick={() => handleClick("settings")}
        className={`${styles["sidebar-item"]} ${
          currentsection === "settings" ? styles.active : ""
        }`}
      >
        <img src={SettingsIcon} alt="logo" fill="black" />
        Settings
      </button>
      <button onClick={logout} className={`${styles["sidebar-signout"]}`}>
        <img src={SignOutIcon} alt="logo" />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
