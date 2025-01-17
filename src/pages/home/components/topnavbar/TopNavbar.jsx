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
import PostButtonRed from "../../../../components/buttons/post-button-red/PostButtonRed";
import defaultUserPicture from "../../../../assets/images/profile_default.png";
import hamburgerMenu from "../../../../assets/icons/hamburgerMenu.svg";
import OverlayComponent from "../../../../components/overlay/OverlayComponent";
import AddStoryCard from "../add_story_card/AddStoryCard";

const TopNavbar = ({ onSectionChange, currentsection, onCreateStoryPopup }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (section) => {
    onSectionChange(section);
  };
  const navigate = useNavigate();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleProfileOptions = () => {
    setIsProfileSectionOpened(!isProfileSectionOpened);
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/swiptory/signin");
  };

  const gotoSignUpPage = () => {
    let path = `signup`;
    navigate("/swiptory/register");
  };

  const gotoSignInPage = () => {
    let path = `signin`;
    navigate("/swiptory/signin");
  };
  const gotoAddStory = () => {
    handleOpen();
  };
  const gotoBookmark = () => {
    handleClick("bookmark");
  };

  const userName = useSelector((state) => state.user?.user?.name || "");
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
          SwipTory
        </button>
        {/* <button
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
        </button> */}
      </div>

      <div className={styles.rightsection}>
        {userName == null || userName == "" ? (
          <>
            <PostButtonRed handleClick={gotoSignUpPage}>
              Register Now
            </PostButtonRed>
            <PostButtonRed handleClick={gotoSignInPage}>Sign In</PostButtonRed>
          </>
        ) : (
          <>
            <PostButtonRed handleClick={gotoBookmark}>Bookmarks</PostButtonRed>
            <PostButtonRed handleClick={gotoAddStory}>Add Story</PostButtonRed>

            <div className={styles.profileButton}>
              <div className={styles.profileAbbreviation}>
                <img
                  src={defaultUserPicture}
                  alt=""
                  width={"30px"}
                  color="transperant"
                />
                {/* {userName.split(" ").map((x) => x[0])} */}
              </div>
            </div>
            {isOpen && (
              <OverlayComponent isOpen={isOpen} onClose={handleClose}>
                <AddStoryCard />
              </OverlayComponent>
            )}
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
                <img
                  src={hamburgerMenu}
                  alt=""
                  width={"20px"}
                  color="transperant"
                />
                {/* {userName.split(" ").map((x) => x[0])} */}
              </div>
            </div>
          </>
        )}

        {/* <div
          className={styles.viewCartButton}
          onClick={() => handleClick("cart")}
        >
          <div className={styles.viewCartButtonLogo}>
            <img src={CartIcon} alt="cartLogo" height={"20px"} />
          </div>
          <div className={styles.viewCartButtonContent}>View Cart</div>
          <div className={styles.viewCartButtonCount}>{cartItems}</div>
        </div> */}
      </div>
    </div>
  );
};

export default TopNavbar;
