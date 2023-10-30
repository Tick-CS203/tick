import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, 
  accessToken: "",
  refreshToken: "",
  idToken: "",
  purchasingToken: "",
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
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
    resetUserState: () => {
      return initialState;
    },
  },
});

export const { setUser, setTokens, setPurchasing, setUsername, resetUserState } = userSlice.actions;

export default userSlice.reducer;