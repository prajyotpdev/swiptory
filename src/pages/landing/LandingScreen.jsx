import { useState } from "react";
import User from "../../store/models/User";
import stylesLandingPage from "../landing/LandingPage.module.css";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import DashBoardpage from "../dashboard/DashboardPage.jsx";
import TopNavbar from "./components/topnavbar/TopNavbar.jsx";
import InvoicePage from "../invoice/InvoicePage.jsx";
import TopRibbon from "./components/top-ribbon/TopRibbon.jsx";

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState("feed"); // Track active section
  const [user, setUser] = useState(new User());
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
      case "cart":
        return <CartPage />;
      default:
        return <InvoicePage />;
    }
  };

  return (
    <div className={stylesLandingPage.LandingPage}>
      <div className={stylesLandingPage.heroContainer}>{renderSection()}</div>{" "}
    </div>
  );
};

export default LandingPage;
