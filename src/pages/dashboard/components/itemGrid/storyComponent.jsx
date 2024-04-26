import styles from "./storyComponent.module.css";
import img1 from "../../../../assets/images/img1.png";
import { useNavigate } from "react-router-dom";
import addtocartbtn from "../../../../assets/icons/addToCartIcon.svg";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../../../store/slices/cartSlice";
import Loader from "../../../../components/loader/loader";
import { useState } from "react";

function StoryComponent({ story }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const firstSlide = story.slides[0];
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    onShowOverlay(story);
  };

  return (
    <div className={styles.storyCard} onClick={handleClick}>
      <div style={{ display: loading ? "block" : "none" }}>
        <Loader />
      </div>
      <img
        className={styles.imgContainer}
        src={firstSlide.imageUrl}
        onLoad={() => setLoading(false)}
      />
      <div className={styles.textOverlaySection}>
        <p className={styles.header}>{firstSlide.heading}</p>
        <p className={styles.description}>{firstSlide.description}</p>
      </div>
    </div>
  );
}

export default StoryComponent;
