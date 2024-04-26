import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';

export const addCartItem = createAsyncThunk("addCartItem", async (cartItemData) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const jwttoken = JSON.parse(localStorage.getItem("user")).token;
    const response = await fetch(`${baseUrl}/api/v1/profile/cart/add`,{
      method: 'POST',
      headers : {
        Authorization: jwttoken,      
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItemData),
    });
    return response.json();
  });

export const fetchAllCartItems= createAsyncThunk("fetchAllCartItems", async () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const jwttoken = JSON.parse(localStorage.getItem("user")).token;
  const response = await fetch(`${baseUrl}/api/v1/profile/cart/all`,{
    headers : {
      Authorization: jwttoken,      
      'Content-Type': 'application/json',
    },
  });
  return response.json();
});


  export const filtercartItems = createAsyncThunk("filtercartItems", async (filterParams) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const jwttoken = JSON.parse(localStorage.getItem("user")).token;
    const response = await fetch(`${baseUrl}/api/v1/Cartitem/filter`,{                  
      headers : {
        Authorization: jwttoken,      
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body:filterParams,
    });
    return response.json();
  });

const cartListSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCartItems.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllCartItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
      console.log("this is action.payload " + action.payload)
    });
    builder.addCase(fetchAllCartItems.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
    builder.addCase(addCartItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCartItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
      console.log("this is action.payload " + JSON.stringify(action.payload) )
    });
    builder.addCase(addCartItem.rejected, (state, action) => {
      console.error('Error creating task:', action.error.message);
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(filtercartItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(filtercartItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    });
    builder.addCase(filtercartItems.rejected, (state, action) => {
      console.error('Error fetchTaskByStatus:', action.error.message);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

   export default cartListSlice.reducer;