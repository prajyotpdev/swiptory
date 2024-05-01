import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./StoryOverlay.module.css";
import prevButton from "../../../../assets/icons/prevButton.svg";
import bookMarkIcon from "../../../../assets/icons/bookMarkIcon.svg";
import likeIcon from "../../../../assets/icons/likeIcon.svg";

const StoryOverlay = ({ story, onClose }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.feed.isLoading);

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleClickOutside = (event) => {
    const isButton = event.target.closest(
      ".image-carousel-prev, .image-carousel-next"
    );
    if (
      !isButton &&
      carouselRef.current &&
      !carouselRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, carouselRef]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === story.slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? story.slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles["story-overlay"]}>
      <div className={styles["image-carousel"]} ref={carouselRef}>
        <ul className={styles["image-carousel-list"]}>
          {story.slides.map((slide, index) => (
            <li
              key={index}
              className={`${styles["image-carousel-item"]} ${
                index === currentIndex ? styles.active : ""
              }`}
            >
              <div className={styles.storyCardOverlay}>
                <img src={slide.imageUrl} alt={`Slide ${index + 1}`} />
                <div className={styles.textOverlaySection}>
                  <p className={styles.header}>{slide.heading}</p>
                  <p className={styles.description}>{slide.description}</p>
                  <div className={styles.interactionTab}>
                    <div className={styles.bookMarkBtn}>
                      <img src={bookMarkIcon} alt="" />
                    </div>
                    <div className={styles.likeBtn}>
                      <img src={likeIcon} alt="" />
                      <div className="likeCount">56165</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles["image-carousel-prev"]} onClick={handlePrev}>
          <img src={prevButton} alt="" width={"40px"} />
        </div>
        <div className={styles["image-carousel-next"]} onClick={handleNext}>
          <img src={prevButton} alt="" width={"40px"} />
        </div>
      </div>
    </div>
  );
};

export default StoryOverlay;
