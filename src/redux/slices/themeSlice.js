import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultTheme: "light",
  isDarkTheme: JSON.parse(localStorage.getItem("theme")) || false
};

const themeSlice = createSlice({
  name: "themes",
  initialState,
  reducers: {
    toggleTheme(state, action) {
      state.isDarkTheme = action.payload;
      localStorage.setItem("theme", JSON.stringify(action.payload));
    }
  },
  extraReducers: () => {}
});

const { reducer, actions } = themeSlice;

export const { toggleTheme } = actions;

export default reducer;
