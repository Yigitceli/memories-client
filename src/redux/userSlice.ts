import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IUserBody } from "../types";
import { googleSignIn } from "../utils";

interface IState {
  data: IUserBody | null | undefined;
  loading: "pending" | "success" | "rejected" | "idle";
}

export const login = createAsyncThunk(
  "auth/login",
  async (authType: string, thunkAPI) => {
    try {
      if (authType === "google") {
        const data = await googleSignIn();
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  }
);

const initialState: IState = {
  data: null,
  loading: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = "success";
    });
    builder.addCase(login.pending, (state, action) => {
      state.data = null;
      state.loading = "pending";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.data = null;
      state.loading = "rejected";
    });
  },
});

export default userSlice.reducer;
export const {} = userSlice.actions;
