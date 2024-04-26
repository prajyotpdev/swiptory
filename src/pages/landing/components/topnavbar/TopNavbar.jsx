import React, { useState } from "react";
import styles from "./TopNavbar.module.css";
import MusicArtLogo from "../../../../assets/icons/musicArtLogo.svg";
import BoardIcon from "../../../../assets/icons/boardIcon.svg";
import AnalyticsIcon from "../../../../assets/icons/analyticsIcon.svg";
import SettingsIcon from "../../../../assets/icons/settingsIcon.svg";
import CartIcon from "../../../../assets/icons/cartIcon.svg";
import SignOutIcon from "../../../../assets/icons/signoutIcon.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const TopNavbar = ({ onSectionChange, currentsection }) => {
  const handleClick = (section) => {
    onSectionChange(section);
  };

  const handleProfileOptions = () => {
    setIsProfileSectionOpened(!isProfileSectionOpened);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/swiptory/signin");
  };

  const userName = useSelector((state) => state.user.user).name;
  const cartItems = 0;
  const dispatch = useDispatch();
  const musicItemsFeed = useSelector(
    (state) => state.feed && state.feed.feed && state.feed.feed.data
  );
  const [isProfileSectionOpened, setIsProfileSectionOpened] = useState(false);
  const dumpAllData = () => {
    localStorage.clear();

    // You can also update the state or perform any other necessary actions
  };

  return (
    <div className={styles.topnavbar}>
      <div className={styles.leftsection}>
        <button
          onClick={() => handleClick("feed")}
          className={`${styles["topnavbar-title"]}`}
        >
          <img src={MusicArtLogo} alt="logo" />
          MusicArt
        </button>
        <button
          onClick={() => handleClick("feed")}
          className={`${styles["topnavbar-item"]} ${
            currentsection === "feed" ? styles.active : ""
          }`}
        >
          Home
        </button>
        <button
          onClick={() => handleClick("invoice")}
          className={`${styles["topnavbar-item"]} ${
            currentsection === "invoice" ? styles.active : ""
          }`}
          style={{ fill: currentsection === "board" ? "blue" : "inherit" }}
        >
          Invoice
        </button>
      </div>

      <div className={styles.rightsection}>
        <div
          className={styles.viewCartButton}
          onClick={() => handleClick("cart")}
        >
          <div className={styles.viewCartButtonLogo}>
            <img src={CartIcon} alt="cartLogo" height={"20px"} />
          </div>
          <div className={styles.viewCartButtonContent}>View Cart</div>
          <div className={styles.viewCartButtonCount}>{cartItems}</div>
          {/* <button onClick={logout} className={`${styles["topnavbar-signout"]}`}>
          <img src={SignOutIcon} alt="logo" />
          Logout
        </button> */}
        </div>
        <div
          className={styles.profileButton}
          onClick={() => handleProfileOptions()}
        >
          {isProfileSectionOpened && (
            <div className={styles.profileOverlayModal}>
              <div className={styles.profileName}>{userName}</div>
              <div className={styles.logOut} onClick={logout}>
                Logout
              </div>
            </div>
          )}
          <div className={styles.profileAbbreviation}>
            {userName.split(" ").map((x) => x[0])}
          </div>
          {/* <button onClick={logout} className={`${styles["topnavbar-signout"]}`}>
          <img src={SignOutIcon} alt="logo" />
          Logout
        </button> */}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
