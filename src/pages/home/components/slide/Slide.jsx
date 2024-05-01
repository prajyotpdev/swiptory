import React, { useState } from "react";
import InputField from "../../../../components/input-field/Input";

const SlideForm = ({ slide, onSlideChange }) => {
  const [heading, setHeading] = useState(
    slide.heading != undefined ? slide.heading : ""
  );
  const [description, setDescription] = useState(
    slide.description != undefined ? slide.description : ""
  );
  const [imageUrl, setImgUrl] = useState(
    slide.imageUrl != undefined ? slide.imageUrl : ""
  );
  const [category, setCategory] = useState("");

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

    const isValid = validateSlideData(heading, description, imageUrl, category);

    if (isValid) {
      const updatedSlide = {
        heading: heading,
        description: description,
        imageUrl: imageUrl,
        category: category,
      };
      onSlideChange(updatedSlide);
      setHeading("");
      setDescription("");
      setImgUrl("");
      setCategory("");
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
    <>
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
        <InputField
          id={"category"}
          label="Category"
          placeholder="Select Category"
          value={category}
          onInputChange={handleInputChange}
        />
        <button type="submit">Save Changes</button>
      </form>
    </>
  );
};

export default SlideForm;
