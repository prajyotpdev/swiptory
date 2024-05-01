// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// export function useUserDetails() {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         setCurrentUser(JSON.parse(storedUser));
//         setCurrentUser(
//           JSON.parse(useSelector((state) => state.user.user).name)
//         );
//       } catch (error) {
//         console.error("Error parsing stored user data:", error);
//         localStorage.removeItem("user"); // Clear potentially invalid data
//       }
//     }
//   }, []);

//   return currentUser;
// }
