import React from "react";
import styles from "./TopRibbon.module.css";
import PhoneContactLogo from "../../../../assets/icons/phoneContactLogo.svg";
import SignOutIcon from "../../../../assets/icons/signoutIcon.svg";
import { useNavigate } from "react-router-dom";

const TopRibbon = ({ onSectionChange, currentsection }) => {
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
    <div className={styles.topribbon}>
      <div className={styles.contactus}>
        <img src={PhoneContactLogo} alt="logo" height={"30vh"} />
        912121131313
      </div>
      <div className={styles.ribbonheader}>
        <div className={styles.ribbonheaderItem}>
          Get 50% off on selected items
        </div>
        <div className={styles.ribbonheaderItem}> | </div>
        <div className={styles.ribbonheaderItem}>Shop Now</div>
      </div>
      <div onClick={logout} className={styles.signout}>
        Logout
      </div>
    </div>
  );
};

export default TopRibbon;
