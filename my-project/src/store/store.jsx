import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../reducer/userReducer"; // Assuming your reducer file is userReducer.js
import todoReducer from '../reducer/todoReducer';

const store = configureStore({
  reducer: {
    auth: userReducer, // Assuming your slice reducer manages authentication state and is named userReducer
    // Add more slices if needed
    todo :todoReducer,
  },
});

export default store;