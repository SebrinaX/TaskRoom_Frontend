import { createSlice } from '@reduxjs/toolkit';


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    isAuthenticated: false 
  },
  reducers: {
    login(state, action) {
      state.user = action.payload
      state.isAuthenticated = true
      action.payload.token && localStorage.setItem('token', action.payload.token)
    },
    logout(state) {
      state.user = {}  
      state.isAuthenticated = false
      localStorage.removeItem('token')
    }
  }
})

export const { login, logout } = authSlice.actions

const authReducer = authSlice.reducer

export default authReducer
