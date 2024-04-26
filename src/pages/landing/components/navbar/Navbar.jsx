import React from "react";
import stylesnavbar from "./Navbar.module.css";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const Navbar = () => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const originalDate = new Date();
  const day = originalDate.getDate();
  const month = originalDate.toLocaleString("en-US", { month: "short" });
  const year = originalDate.getFullYear();

  function getOrdinalNum(n) {
    return (
      n +
      (n > 0
        ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
        : "")
    );
  }

  const userName = useSelector((state) => state.user.user).name;

  return (
    <div className={stylesnavbar.navbar}>
      <div className={stylesnavbar.navbaritem}>Welcome! {userName}</div>
      <div className={stylesnavbar.navbaritem}>
        {month} {getOrdinalNum(day)}, {year}
      </div>
    </div>
  );
};

export default Navbar;
