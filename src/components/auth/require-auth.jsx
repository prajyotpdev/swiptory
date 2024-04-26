import { useContext } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectUser } from "../../store/slices/authSlice";

function RequireAuth({ children }) {
  // const state = useSelector((state) => state);
  // console.log("State", state);
  const currentUser = useSelector(selectUser);
  let location = useLocation();

  if (!currentUser) {
    return (
      <Navigate to="/swiptory/signin" state={{ from: location }} replace />
    );
  } else {
  }
  return <Navigate to="/swiptory/home" state={{ from: location }} replace />;
}

export default RequireAuth;
