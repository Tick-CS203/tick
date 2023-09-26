import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
  idToken: "",
  username: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTokens: (state, action) => {
      const { accessToken, refreshToken, idToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.idToken = idToken;
    },
    setUsername: (state, action) => {
        state.username = action.payload;
    },
    resetUserState: () => {
      return initialState;
    }
  },
});

export const { setTokens, setUsername, resetUserState } = userSlice.actions;

export default userSlice.reducer;
