import styles from "./DashboardPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { fetchAllItems } from "../../store/slices/feedSlice.js";
import FilterBar from "./components/filterBar/FilterBar.jsx";
import StoryComponent from "./components/itemGrid/storyComponent.jsx";
import dummyDataJSON from "../../assets/json/dummy-api-data.json";
import { convertStoriesToModels } from "../../utils/dataconverter.jsx";
import StoryOverlay from "./components/story-overlay/StoryOverlay.jsx";
import OverlayComponent from "../../components/overlay/OverlayComponent.jsx";

const DashBoardpage = () => {
  const dispatch = useDispatch();
  const storiesFeedState = useSelector((state) => state.feed.feed);
  const isLoading = useSelector((state) => state.feed.isLoading);

  const [storiesFeed, setStoriesFeed] = useState(storiesFeedState);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const [isStoryPopup, setIsStoryPopup] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  // useEffect(() => {
  //   handleGetAllData();
  // });

  useEffect(() => {
    dispatch(fetchAllItems());

    // const convertedStories = convertStoriesToModels(storiesFeedState);
    // console.log(convertedStories);
    // setStoriesFeed(convertedStories);
  }, [dispatch]);
  const handleGetAllData = async (e) => {
    // dispatch(fetchAllItems());
    // setFeed([
    //   {
    //     _id: "65fc605825e7463a49446e9a",
    //     displayName: "My Favorite Song",
    //     type: "song",
    //     price: 9,
    //     colour: "red",
    //     description: "This is a detailed description of the song",
    //     company: "Music Company",
    //     aboutItem: "A great song",
    //     isAvailable: true,
    //     displayImageList: ["image1.jpg", "image2.png"],
    //     __v: 0,
    //   },
    // ]);
    console.log("this is username" + nameUser);
  };

  const [feed, setFeed] = useState([]);
  const [dummyData, setDummyData] = useState();
  const clearLocalStorage = () => {
    localStorage.clear();
    // You can also update the state or perform any other necessary actions
  };
  const fetchFeed = async () => {
    try {
      dispatch(fetchAllItems());
      // const response = await axios.get(
      //   "http://localhost:8000/api/v1/musicartitem/all"
      // );
      setFeed(response.data);
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  const handleStoryPopup = (story) => {
    setSelectedStory(story);
    setIsStoryPopup(true);
    console.log("popup is showing");
  };

  const handleStoryClosePopup = () => {
    setIsStoryPopup(false);
    setSelectedStory(null);
  };

  return (
    <>
      {selectedStory && <StoryOverlay story={selectedStory} />}
      <div className={styles.dashboardPage}>
        <div className={styles.dashboardHeroContainer}>
          {/* {isOpen && (
            <OverlayComponent isOpen={isOpen} onClose={handleClose}>
              <p>This is some content withasdasdin the overlay.</p>
            </OverlayComponent>
          )} */}
          {/* <FilterBar updateFeed={handleUpdateFeed} /> */}
          {isLoading && !storiesFeed && <div>..Loading</div>}
          {storiesFeedState && (
            <div className={styles.storycards}>
              {storiesFeedState &&
                storiesFeedState.map((story) => (
                  <StoryComponent
                    key={story._id}
                    story={story}
                    onClick={() => handleStoryPopup(story)}
                  >
                    <div key={story._id}></div>
                  </StoryComponent>
                ))}

              {isStoryPopup && selectedStory && (
                <StoryOverlay
                  story={selectedStory}
                  onClose={handleStoryClosePopup}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashBoardpage;
