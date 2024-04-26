import styles from "./DashboardPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { fetchAllItems } from "../../store/slices/feedSlice.js";
import FilterBar from "./components/filterBar/FilterBar.jsx";
import StoryComponent from "./components/itemGrid/storyComponent.jsx";
import dummyDataJSON from "../../assets/json/dummy-api-data.json";
import { convertStoriesToModels } from "../../utils/dataconverter.jsx";

const DashBoardpage = () => {
  const dispatch = useDispatch();
  // const storiesFeed = useSelector(
  //   (state) => state.feed && state.feed.feed && state.feed.feed.data
  // );
  const isLoading = useSelector((state) => state.feed.isLoading);

  const [storiesFeed, setStoriesFeed] = useState([]);
  // useEffect(() => {
  //   handleGetAllData();
  // });

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = dummyDataJSON;
      const convertedStories = convertStoriesToModels(jsonData);
      console.log(convertedStories);
      setStoriesFeed(convertedStories);
    };

    fetchData();
  }, []);
  useEffect(() => {
    // Dispatch fetchAllItems action when component mounts
    //   dispatch(
    //     fetchAllItems()
    // );
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
  return (
    <>
      <div className={styles.dashboardPage}>
        <div className={styles.dashboardHeroContainer}>
          {/* <FilterBar updateFeed={handleUpdateFeed} /> */}
          {isLoading && !storiesFeed && <div>..Loading</div>}
          <div className={styles.storycards}>
            {storiesFeed &&
              storiesFeed.map((story) => (
                <StoryComponent story={story}>
                  <div key={story._id}></div>
                </StoryComponent>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardpage;
