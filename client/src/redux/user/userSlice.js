import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart(state) {
      state.loading = true; // ✅ fixed
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    signInSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure(state, action) {
      state.loading = false; 
      state.error = action.payload;
    },
    updateUserStart(state) {
      state.loading = true;
    },
    updateUserSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    updateUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart:(state)=>{
      state.loading=true;
    },
    deleteUserSuccess:(state)=>{
      state.loading=false
      state.error=null
      state.currentUser=null
    },
    deleteUserFailure:(state,action)=>{
      state.loading=false
      state.error=action.payload
      
    },
    signoutStart:(state)=>{
      state.loading=true
      
    },
    signoutSuccess:(state)=>{
      state.loading=false
      state.currentUser=null

    },
    signoutFailure:(action,state)=>{
      state.loading=false
      state.error=action.payload
    },
  },
});

export const {
  setLoading,
  setError,
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signoutStart,
  signoutSuccess,
  signoutFailure,
} = userSlice.actions;
export default userSlice.reducer;