import { useState } from "react";
import User from "../../store/models/User";
import styleshomepage from "../home/HomePage.module.css";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import DashBoardpage from "../dashboard/DashboardPage.jsx";
import TopNavbar from "./components/topnavbar/TopNavbar.jsx";
import InvoicePage from "../invoice/InvoicePage.jsx";
import TopRibbon from "./components/top-ribbon/TopRibbon.jsx";
import BookmarkPage from "../bookmarks/BookMarkPage.jsx";

const HomePage = () => {
  const [activeSection, setActiveSection] = useState("feed"); // Track active section
  const [user, setUser] = useState(new User());
  const [isAddStoryPopup, setAddStoryPopup] = useState(false);
  const [isStoryPopup, setIsStoryPopup] = useState(false);
  const updateUser = () => {
    const updatedUser = new User("prajyot@getTimeMeasureUtils.com");
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };
  const handleSectionChange = (newSection) => {
    setActiveSection(newSection);
  };
  const renderSection = () => {
    switch (activeSection) {
      case "feed":
        return <DashBoardpage />;
      case "invoice":
        return <InvoicePage />;
      case "bookmark":
        return <BookmarkPage />;
      default:
        return <DashBoardpage />;
    }
  };

  const handleAddPopup = (story) => {
    setSelectedStory(story);
    setIsStoryPopup(true);
    console.log("popup is showing");
  };

  const handleAddStoryClosePopup = () => {
    setIsStoryPopup(false);
    setSelectedStory(null);
  };

  return (
    <div className={styleshomepage.homepage}>
      <TopNavbar
        onSectionChange={handleSectionChange}
        currentsection={activeSection}
        style={{ flex: "1 auto" }}
      />
      <div className={styleshomepage.heroContainer}>{renderSection()}</div>{" "}
    </div>
  );
};

export default HomePage;
