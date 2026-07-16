import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart(state, action) {
      state.currentUser = action.payload
      loading =true
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
    signInSuccess(state, action) {
      state.currentUser = action.payload
        loading = false
    },
    signInFailure(state, action) {
      state.error = action.payload
      loading = false
    }
  }
})

export const { setCurrentUser, setLoading, setError , signInStart, signInSuccess, signInFailure } = userSlice.actions
export default userSlice.reducer