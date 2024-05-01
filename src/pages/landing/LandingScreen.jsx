import { useState } from "react";
import User from "../../store/models/User";
import stylesLandingPage from "../landing/LandingPage.module.css";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import DashBoardpage from "../dashboard/DashboardPage.jsx";
import InvoicePage from "../invoice/InvoicePage.jsx";
import TopRibbon from "./components/top-ribbon/TopRibbon.jsx";
import TopNavbar from "../home/components/topnavbar/TopNavbar.jsx";

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState("feed"); // Track active section

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

  const handleSectionChange = (newSection) => {
    setActiveSection(newSection);
  };
  return (
    <div className={stylesLandingPage.LandingPage}>
      <TopNavbar
        onSectionChange={handleSectionChange}
        currentsection={activeSection}
        style={{ flex: "1 auto" }}
      />
      <div className={stylesLandingPage.heroContainer}>{renderSection()}</div>{" "}
    </div>
  );
};

export default LandingPage;
