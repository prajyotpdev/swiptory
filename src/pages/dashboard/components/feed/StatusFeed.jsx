import styles from "./StatusFeed.module.css";
import CollapseAllIcon from "../../../../assets/icons/collapseAllIcon.svg";
import AddTodoIcon from "../../../../assets/icons/addTodoIcon.svg";

import { useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const StatusFeed = ({ statusId }) => {
  const clearLocalStorage = () => {
    localStorage.clear();
    // You can also update the state or perform any other necessary actions
  };

  // const state = useSelector((state) => state);
  const userID = jwtDecode(
    useSelector((state) => state.user.user).token
  ).userId;
  const currentTaskList = [
    {
      taskCheckList: {
        id1: { subtaskName: "subtaskName1", isDone: true },
        id2: { subtaskName: "subtaskName2", isDone: false },
        id3: { subtaskName: "subtaskName3", isDone: true },
        id4: { subtaskName: "subtaskName4", isDone: false },
      },
      _id: "65d60bb73545645bde5552ff",
      taskStatus: "Done",
      taskTitle: "Task Title3",
      taskValidity: "2022-02-04T12:34:56.789Z",
      taskPriority: "Low",
      createdBy: "65d5d5fafd55e7cade4c3fb3",
      createdAt: "2022-02-01T12:34:56.789+00:00",
    },
    {
      _id: "65d79a6e01c359116a78c7c3",
      taskTitle: "Task Title3",
      taskStatus: "In Progress",
      taskPriority: "Moderate",
      taskValidity: "2024-02-22T12:34:56.789Z",
      taskCheckList: {
        id1: { subtaskName: "subtaskName1", isDone: true },
        id2: { subtaskName: "subtaskName2", isDone: false },
        id3: { subtaskName: "subtaskName3", isDone: true },
        id4: { subtaskName: "subtaskName4", isDone: false },
      },
      __v: 0,
      createdBy: "65d5d5fafd55e7cade4c3fb3",
      createdAt: "2022-02-03T12:34:56.789+00:00",
    },
    {
      _id: "65d79a6e01c359111a78c7c3",
      taskTitle: "Task Title6",
      taskStatus: "Done",
      taskPriority: "High",
      taskValidity: "2024-02-12T12:34:56.789Z",
      taskCheckList: {
        id1: { subtaskName: "subtaskName1", isDone: true },
        id2: { subtaskName: "subtaskName2", isDone: false },
        id3: { subtaskName: "subtaskName3", isDone: true },
        id4: { subtaskName: "subtaskName4", isDone: false },
      },
      __v: 0,
      createdBy: "65d5d5fafd55e7cade4c3fb3",
      createdAt: "2022-02-03T13:34:56.789+00:00",
    },
  ];

  const [allCollapsed, setAllCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const openTodoModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleCollapseAll = () => {
    setAllCollapsed(!allCollapsed);
  };
  const handleAddTodoClicked = (section) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilteredDataChange = (filteredData) => {};

  return (
    <>
      <div className={styles.tasksFeedContainer}>
        <div className={styles.feed}>
          {/* <TaskCard task={currentTask} allCollapsed={allCollapsed} key= {currentTask.id}/> */}
        </div>
      </div>
    </>
  );
};

export default StatusFeed;
