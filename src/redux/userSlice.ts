import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { ILoginBody, IUserBody } from "../types";
import {
  customSignIn,
  googleSignIn,
  removeAccessToken,
  removeAuthType,
  removeRefreshToken,
  setAccessToken,
  setAuthType,
  setRefreshToken,
} from "../utils";

interface IState {
  data: IUserBody | null | undefined;
  loading: "pending" | "success" | "rejected" | "idle";
  error: undefined | 401 | 500;
}

export const login = createAsyncThunk<
  IUserBody | undefined,
  {
    authType: "custom" | "google";
    data?: ILoginBody | undefined;
  },
  { rejectValue: 401 | 500 | undefined }
>(
  "auth/login",
  async (
    { authType, data }: { authType: "custom" | "google"; data?: ILoginBody },
    { rejectWithValue }
  ) => {
    try {
      if (authType === "google") {
        const googleData = await googleSignIn();       
        return googleData;
      }
      if (authType === "custom") {
        const customData = await customSignIn(data);
        return customData;
      }
    } catch (error) {
      removeAccessToken();
      removeRefreshToken();
      removeAuthType();
      const err = error as AxiosError;
      const errorCode: 401 | 500 | undefined = err.response?.status as
        | 401
        | 500
        | undefined;
      return rejectWithValue(errorCode);
    }
  }
);

const initialState: IState = {
  data: null,
  loading: "idle",
  error: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      removeAccessToken();
      removeRefreshToken();
      removeAuthType();
      (state.data = null), (state.loading = "idle");
    },
    setError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<IUserBody | null | undefined>) => {
        state.data = action.payload;
        state.error = undefined;
        state.loading = "success";
      }
    );
    builder.addCase(login.pending, (state, action) => {
      state.data = null;
      state.error = undefined;
      state.loading = "pending";
    });
    builder.addCase(
      login.rejected,
      (state, action: PayloadAction<401 | 500 | undefined>) => {
        state.data = null;
        state.error = action.payload;
        state.loading = "rejected";
      }
    );
  },
});

export default userSlice.reducer;
export const { logOut, setError } = userSlice.actions;
