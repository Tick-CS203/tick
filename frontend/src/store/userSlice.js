import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: "",
    refreshToken: "",
    idToken: "",
    username: "",
  },
  reducers: {
    setTokens: (state, action) => {
      const { accessToken, refreshToken, idToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.idToken = idToken;
    },
    setUsername: (state, action) => {
        state.username = action.payload;
    }
  },
});

export const { setTokens, setUsername } = userSlice.actions;

export default userSlice.reducer;
