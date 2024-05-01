import React, { useRef, useEffect, useState } from "react";
import styles from "./OverlayComponent.module.css";

const OverlayComponent = ({ children, onClose, isOpen, isLoading = false }) => {
  const overlayRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      !overlayRef.current ||
      event.target === overlayRef.current ||
      overlayRef.current.contains(event.target)
    ) {
      return;
    }

    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    const listener = document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", listener);
  }, [onClose]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.active : ""}`}
      ref={overlayRef}
      onClick={handleClose}
    >
      {isLoading && (
        <div className="overlay-loading">
          {/* Your loading indicator component or JSX here */}
        </div>
      )}

      <div // Wrap children in a separate container
        className={styles.overlayContent}
        onClick={(event) => event.stopPropagation()} // Prevent bubbling to overlay
      >
        {children}
      </div>
    </div>
  );
};

export default OverlayComponent;
