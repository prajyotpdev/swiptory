import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchusers = createAsyncThunk("fetchusers", async () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${baseUrl}/api/v1/job/all`);
  return response.json();
});

export const fetchuserDetails = createAsyncThunk("fetchuserdetails", async () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${baseUrl}/api/v1/job/all`);
  return response.json();
});

const user = JSON.parse(localStorage.getItem("user"));

// const initialState = user
// ? { user }
// : { user: null };

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: user ,
    isError: false,
  },
  reducers: {
     setUser: (state, action) => {
      console.log("action.payload is " + action.payload);
          state.user = action.payload;
          localStorage.setItem("user", JSON.stringify(action.payload));
        },
        setLoading: (state, action) => {
          state.isLoading = action.payload;
        },
        setError: (state, action) => {
          state.isError = action.payload;
        },
  }, 
});

export const{  setUser, setLoading, setError} =userSlice.actions;
1
export const selectUser = (state) => state.user.user;

export const registerAsync = (userData) => async (dispatch) => {
     dispatch(setLoading(true));
   
     try {      
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
       const response = await axios.post(`${baseUrl}/api/v1/auth/register`, userData);
       dispatch(setUser(response.data));
     } catch (error) {
       dispatch(setError(true));
       console.error('Register error:', error);
     } finally {
       dispatch(setLoading(false));
     }
   };

   export const loginAsync = (userData) => async (dispatch) => {
     dispatch(setLoading(true));
     try {  
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
       const signin = await fetch(`${baseUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      
      if (signin.ok) {
        const responseJson = await signin.json();
        console.log(responseJson);
        dispatch(setUser(responseJson));
        // console.log("Response from the server:", responseJson);
      } else {
        console.error("Signin failed with status:", signin.status);
      }
     } catch (error) {
       dispatch(setError(true));
       console.error('Login error:', error);
     } finally {
       dispatch(setLoading(false));
     }
   };

   export default userSlice.reducer;