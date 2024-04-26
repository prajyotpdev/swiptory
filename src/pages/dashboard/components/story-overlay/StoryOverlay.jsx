import styles from "./StoryOverlay.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { fetchAllItems } from "../../store/slices/feedSlice.js";
import FilterBar from "./components/filterBar/FilterBar.jsx";
import StoryComponent from "./components/itemGrid/storyComponent.jsx";
import dummyDataJSON from "../../assets/json/dummy-api-data.json";
import { convertStoriesToModels } from "../../utils/dataconverter.jsx";

const StoryOverlay = ({ story }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.feed.isLoading);

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleSwipe = (event) => {
    const deltaX = event.deltaX;
    if (deltaX > 0) {
      handlePrev();
    } else if (deltaX < 0) {
      handleNext();
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % story.slides.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex =
      currentIndex === 0 ? story.slides.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  // Handle touch events for swipe gestures (optional)
  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener("touchstart", (e) => {
        const startPosition = e.touches[0].clientX;
        carouselElement.addEventListener("touchmove", (e) => {
          const movePosition = e.touches[0].clientX;
          const deltaX = startPosition - movePosition;
          if (Math.abs(deltaX) > 30) {
            // Adjust threshold for swipe sensitivity
            handleSwipe(e);
          }
        });
      });
    }
    return () => {
      // Cleanup function to remove event listeners
      if (carouselElement) {
        carouselElement.removeEventListener("touchstart");
        carouselElement.removeEventListener("touchmove");
      }
    };
  }, [carouselRef, story]);

  const slides = story.slides; // Extract slides from the story object

  return (
    <div className="image-carousel" ref={carouselRef}>
      <ul className="image-carousel-list">
        {slides.map((slide, index) => (
          <li
            key={index}
            className={`image-carousel-item ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <img src={slide.imageUrl} alt={`Slide ${index + 1}`} />
          </li>
        ))}
      </ul>
      <button className="image-carousel-prev" onClick={handlePrev}>
        Prev
      </button>
      <button className="image-carousel-next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default StoryOverlay;
