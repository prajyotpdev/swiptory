import Slide from "./slide";

class Story {
  constructor(data) {
    this.id = data._id;
    this.author = data.author;
    this.slides = data.slides.map((slide) => new Slide(slide));
    this.likes = data.likes;
    this.category = data.category;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export default Story;
