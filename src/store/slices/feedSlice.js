import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';

export const addMusicArtItem = createAsyncThunk("addMusicArtItem", async (musicItemData) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const jwttoken = JSON.parse(localStorage.getItem("user")).token;
    const response = await fetch(`${baseUrl}/api/v1/musicartitem/all`,{
      method: 'POST',
      headers : {
        Authorization: jwttoken,      
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(musicItemData),
    });
    return response.json();
  });

export const fetchAllItems= createAsyncThunk("fetchAllItems", async () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const jwttoken = JSON.parse(localStorage.getItem("user")).token;
  const response = await fetch(`${baseUrl}/api/v1/musicartitem/all`,{
    headers : {
      Authorization: jwttoken,      
      'Content-Type': 'application/json',
    },
  });
  return response.json();
});


  export const filterMusicItems = createAsyncThunk("filterMusicItems", async (filterParams) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const jwttoken = JSON.parse(localStorage.getItem("user")).token;
    const response = await fetch(`${baseUrl}/api/v1/musicartitem/filter`,{                  
      headers : {
        Authorization: jwttoken,      
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body:filterParams,
    });
    return response.json();
  });

const feedListSlice = createSlice({
  name: "feed",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllItems.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.feed = action.payload;
      console.log("this is action.payload " + action.payload)
    });
    builder.addCase(fetchAllItems.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
    builder.addCase(addMusicArtItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addMusicArtItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.feed = action.payload;
      console.log("this is action.payload " + action.payload)
    });
    builder.addCase(addMusicArtItem.rejected, (state, action) => {
      console.error('Error creating task:', action.error.message);
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(filterMusicItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(filterMusicItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.feed = action.payload;
    });
    builder.addCase(filterMusicItems.rejected, (state, action) => {
      console.error('Error fetchTaskByStatus:', action.error.message);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

   export default feedListSlice.reducer;