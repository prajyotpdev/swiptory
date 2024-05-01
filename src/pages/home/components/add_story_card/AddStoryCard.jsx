import React, { useState } from "react";
import styles from "./AddStoryCard.module.css";
import InputField from "../../../../components/input-field/Input";
import SlideForm from "../slide/Slide";

import FormButton1 from "../../../../components/buttons/formButtons/FormButton1";
import { addStory } from "../../../../store/slices/storySlice";
import { useDispatch } from "react-redux";

const AddStoryCard = ({}) => {
  const dispatch = useDispatch();
  const [slides, setSlides] = useState([
    { heading: "", description: "", imageUrl: "", category: "" },
    { heading: "", description: "", imageUrl: "", category: "" },
    { heading: "", description: "", imageUrl: "", category: "" },
  ]);
  const [finalSlides, setFinalSlides] = useState([]);
  const [selectedSlide, setSelectedSlide] = useState(slides[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [heading, setHeading] = useState(
    selectedSlide.heading != undefined ? selectedSlide.heading : ""
  );
  const [description, setDescription] = useState(
    selectedSlide.description != undefined ? selectedSlide.description : ""
  );
  const [imageUrl, setImgUrl] = useState(
    selectedSlide.imageUrl != undefined ? selectedSlide.imageUrl : ""
  );
  const [category, setCategory] = useState("");
  const selectedColor = "#73ABFF";
  const completedColor = "#7EFF73";
  const inCompletedColor = "#FF7373";
  const categoryOptions = [
    { value: "food", label: "Food" },
    { value: "health and fitness", label: "Health & Fitness" },
    { value: "travel", label: "Travel" },
    { value: "movie", label: "Movie" },
    { value: "education", label: "Education" },
  ];

  const allSlidesSameCategory = (slides) => {
    const referenceCategory = slides[0].category;
    return slides.every((slide) => slide.category === referenceCategory);
  };

  const handleSlideChange = (index) => {
    heading == "" && description == "" && imageUrl == "" && category == ""
      ? null
      : handleSubmit(event);
    setSelectedSlide(slides[index]);
    setSelectedIndex(index);
    console.log("this is selected slide:" + index);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCategory(event.target.value);
    console.log(category);
  };

  const handleAddSlide = () => {
    setSlides([
      ...slides,
      { heading: "", description: "", imgUrl: "", category: "" },
    ]);
    setSelectedSlide({
      heading: "",
      description: "",
      imgUrl: "",
      category: "",
    });
  };
  const handlePostStory = async () => {
    try {
      heading == "" && description == "" && imageUrl == "" && category == ""
        ? null
        : handleSubmit(event);

      const filteredSlides = slides.filter((slide) => {
        const hasContent = Object.values(slide).some(
          (value) => value.trim() !== ""
        );
        return hasContent;
      });

      // if (!allSlidesSameCategory(filteredSlides)) {
      //   console.error("Error: Slides must have the same category!");
      //   return;
      // }

      if (filteredSlides.length === 0) {
        console.error(
          "No valid slides to post! Please add content to your slides."
        );
        return;
      }
      if (filteredSlides.length > 6) {
        alert("More than Enough Slides added");
        return;
      }
      if (filteredSlides.length < 3) {
        alert("Not Enough Slides added");
        return;
      }

      dispatch(
        addStory({
          slides: filteredSlides,
          category: selectedCategory,
        })
      );
    } catch (error) {
      console.error("Error posting story:", error);
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case "heading":
        setHeading(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "imageUrl":
        setImgUrl(value);
        break;
      case "category":
        setCategory(value);
        break;
      default:
        console.warn("Unexpected input field name:", id);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateSlideData(
      heading,
      description,
      imageUrl,
      selectedCategory
    );

    if (isValid) {
      const updatedSlide = {
        heading: heading,
        description: description,
        imageUrl: imageUrl,
        category: category,
      };
      var updatedSlides = slides;
      updatedSlides[selectedIndex] = updatedSlide;
      setSlides(updatedSlides);
      console.log(slides);
      setHeading("");
      setDescription("");
      setImgUrl("");
      setCategory(selectedCategory);
    } else {
      alert("Slide data is invalid! Please fill in all fields.");
    }
  };

  const validateSlideData = (heading, description, imageUrl, category) => {
    return (
      heading.trim() !== "" &&
      description.trim() !== "" &&
      imageUrl.trim() !== "" &&
      category.trim() !== ""
    );
  };

  return (
    <div className={styles.addstoryCard}>
      <div className={styles.slidecardList}>
        {slides.map((item, index) => (
          <div
            key={index}
            className={styles.slidecard}
            onClick={() => handleSlideChange(index)}
            style={{
              backgroundColor:
                selectedIndex == index
                  ? selectedColor
                  : // : slides[selectedIndex].header == ""
                    // ? inCompletedColor
                    // : slides[selectedIndex].header == ""
                    // "white"
                    "white",
            }}
          >
            Slide {index + 1}
          </div>
        ))}
        <div className={styles.slidecard} onClick={handleAddSlide}>
          Add +
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <InputField
          id={"heading"}
          label={"Heading"}
          placeholder={"Your heading"}
          value={heading}
          onInputChange={handleInputChange}
        />
        <InputField
          id={"description"}
          label="Description"
          placeholder="Story description"
          value={description}
          onInputChange={handleInputChange}
        />
        <InputField
          id={"imageUrl"}
          label="Image"
          placeholder="Add Image Url"
          value={imageUrl}
          onInputChange={handleInputChange}
        />

        <div className={styles.categoryfield}>
          <label className={styles.label}>Category</label>
          <select
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>{" "}
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {/* <InputField
          id={"category"}
          label="Category"
          placeholder="Select Category"
          value={category}
          onInputChange={handleInputChange}
        /> */}
      </form>
      <div className={styles.btnNavigation}>
        <div className={styles.left}>
          <FormButton1
            color={"#73ABFF"}
            handleClick={() =>
              handleSlideChange(selectedIndex > 0 ? selectedIndex - 1 : 0)
            }
          >
            Prev
          </FormButton1>
          <FormButton1
            color={"#7EFF73"}
            handleClick={() =>
              handleSlideChange(
                selectedIndex >= 0 && selectedIndex < slides.length - 1
                  ? selectedIndex + 1
                  : slides.length - 1
              )
            }
          >
            Next
          </FormButton1>
        </div>
        <div className={styles.right}></div>
        <FormButton1 color={"#FF7373"} handleClick={handlePostStory}>
          Post
        </FormButton1>
      </div>
    </div>
  );
};

export default AddStoryCard;
