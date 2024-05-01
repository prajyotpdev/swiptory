import Slide from "../store/models/slide";
import Story from "../store/models/story";

export function convertStoriesToModels(data) {
  console.log("Its data " + data);
  return data.map((storyData) => {
    const newStory = new Story({
      id: storyData._id,
      author: storyData.author,
      slides: storyData.slides.map((slideData) => new Slide(slideData)),
      likes: storyData.likes,
      category: storyData.category,
      createdAt: storyData.createdAt,
      updatedAt: storyData.updatedAt,
    });
    return newStory;
  });
}
