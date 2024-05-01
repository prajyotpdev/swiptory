import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';

export const addStory = createAsyncThunk("addStory", async (storyData) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const jwttoken = JSON.parse(localStorage.getItem("user")).token;
  console.log("this is jwt token: "+ jwttoken);
    const response = await fetch(`${baseUrl}/api/v1/stories/add`,{
      method: 'POST',
      headers : {
        Authorization: jwttoken,      
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(storyData),
    });
    return response.json();
  });

export const fetchAllItems= createAsyncThunk("fetchAllItems", async () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const jwttoken = JSON.parse(localStorage.getItem("user")).token;
  const response = await fetch(`${baseUrl}/api/v1/stories/all`,{
    headers : {
      Authorization: jwttoken,      
      'Content-Type': 'application/json',
    },
  });
  return response.json();
});


  export const filterstorys = createAsyncThunk("filterstorys", async (filterParams) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const jwttoken = JSON.parse(localStorage.getItem("user")).token;
    const response = await fetch(`${baseUrl}/api/v1/Story/filter`,{                  
      headers : {
        Authorization: jwttoken,      
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body:filterParams,
    });
    return response.json();
  });

const storyListSlice = createSlice({
  name: "story",
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
      state.story = action.payload;
      console.log("this is action.payload " + JSON.stringify(action.payload))
    });
    builder.addCase(fetchAllItems.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
    builder.addCase(addStory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addStory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.story = action.payload;
      console.log("this is action.payload " + JSON.stringify(action.payload))
    });
    builder.addCase(addStory.rejected, (state, action) => {
      console.error('Error creating task:', action.error.message);
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(filterstorys.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(filterstorys.fulfilled, (state, action) => {
      state.isLoading = false;
      state.story = action.payload;
    });
    builder.addCase(filterstorys.rejected, (state, action) => {
      console.error('Error fetchTaskByStatus:', action.error.message);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

   export default storyListSlice.reducer;