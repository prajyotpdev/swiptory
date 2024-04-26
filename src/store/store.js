import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer  from '../store/slices/authSlice';
import feedReducer from "./slices/feedSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    cart: cartReducer,
  },
})