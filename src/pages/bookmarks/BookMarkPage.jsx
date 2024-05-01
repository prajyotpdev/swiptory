import styles from "./BookmarkPage.module.css";
import Navbar from "../home/components/navbar/Navbar.jsx";
// import { fetchTasks } from "../../store/slices/taskSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
const BookmarkPage = () => {
  const clearLocalStorage = () => {
    localStorage.clear();
    // You can also update the state or perform any other necessary actions
  };

  return <></>;
};

export default BookmarkPage;
