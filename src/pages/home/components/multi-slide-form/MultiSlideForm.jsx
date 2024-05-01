import React, { useState } from "react";
import Slide from "../slide/Slide"; // Assuming your Slide component is in the same directory

const MultiSlideForm = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesData, setSlidesData] = useState([]);

  const handleInputChange = (heading, description, imageUrl, category) => {
    setSlidesData((prevData) => {
      const updatedData = [...prevData];
      updatedData[currentSlide] = { heading, description, imageUrl, category };
      return updatedData;
    });
  };

  const handleNext = (heading, description, imageUrl, category) => {
    if (currentSlide < 5) {
      setCurrentSlide(currentSlide + 1);
      handleInputChange(heading, description, imageUrl, category); // Update state with current slide data
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="multi-slide-form">
      {slidesData.map((slideData, index) => (
        <Slide
          key={index}
          heading={slideData.heading}
          description={slideData.description}
          imageUrl={slideData.imageUrl}
          category={slideData.category}
          onInputChange={handleInputChange}
          slideIndex={index}
          activeSlide={currentSlide}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      ))}
    </div>
  );
};

export default MultiSlideForm;
