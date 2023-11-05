import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
  idToken: "",
  purchasingToken: "",
  username: "",
  userID: "",
};

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
    setPurchasing: (state, action) => {
      const { purchasingToken } = action.payload;
      state.purchasingToken = purchasingToken;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    resetUserState: () => {
      return initialState;
    },
  },
});

export const { setTokens, setPurchasing, setUsername, setUserID, resetUserState } = userSlice.actions;

export default userSlice.reducer;
