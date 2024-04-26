import styles from "./InvoicePage.module.css";
import Navbar from "../home/components/navbar/Navbar.jsx";
// import { fetchTasks } from "../../store/slices/taskSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
const InvoicePage = () => {
  const clearLocalStorage = () => {
    localStorage.clear();
    // You can also update the state or perform any other necessary actions
  };

  return (
    <>
      <div className={styles.dashboardPage}>
        <Navbar/>
        <div className={styles.dashboardHeader}>
          {/* <FilterForm
            data={currentTaskList}
            onFilteredDataChange={handleFilteredDataChange}
          /> */}
        </div>
        {/* <SolidButton
          bgcolor={"#FF2473"}
          fontColor={"#FFFFFF"}
          onClick={handleGetAllTasks}
        >
          Test
        </SolidButton> */}
        <div className={styles.invoiceHeroContainer}>
          {/* <button onClick={clearLocalStorage}>Clear</button> */}
          {/* <div className={styles.verticalTailScroll}> */}

          {/* <ItemGrid/> */}
          {/* <StatusFeed statusId="Backlog" key={1} />
            <StatusFeed statusId="To-do" key={2} />
            <StatusFeed statusId="In progress" key={3} />
            <StatusFeed statusId="Done" key={4} /> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default InvoicePage;
