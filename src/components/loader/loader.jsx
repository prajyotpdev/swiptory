import React from "react";
import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className={styles.Loadercontainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loader;
