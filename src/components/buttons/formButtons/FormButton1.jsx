import React from "react";
import styles from "./FormButton1.module.css";

function FormButton1({ handleClick, children, color }) {
  return (
    <button
      className={styles.form_button}
      onClick={handleClick}
      style={{ backgroundColor: color }}
    >
      {children}
    </button>
  );
}

export default FormButton1;
