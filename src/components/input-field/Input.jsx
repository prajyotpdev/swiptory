import React from "react";
import styles from "./Input.module.css";

const InputField = ({ id, label, placeholder, onInputChange, value, name }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        className={styles.inputField}
        onChange={onInputChange}
        value={value}
      />
    </div>
  );
};

export default InputField;
