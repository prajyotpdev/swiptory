import React from "react";
import styles from "./post-button-red.module.css";

function PostButtonRed({ handleClick, children }) {
  return (
    <button className={styles.post_button} onClick={handleClick}>
      {children}
    </button>
  );
}

export default PostButtonRed;
