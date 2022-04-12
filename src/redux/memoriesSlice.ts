import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import AuthInstance from "../AxiosAuth";
import {
  IMemory,
  IMemoryAuthor,
  IMemoryPost,
  InputData,
  IUserBody,
} from "../types";
import { RootState } from "./store";

export const postMemory = createAsyncThunk<
  IMemory[] | undefined,
  InputData,
  { rejectValue: 404 | 500 | undefined; state: RootState }
>(
  "memories/postMemory",
  async (data: InputData, { rejectWithValue, getState }) => {
    try {
      const postData: IMemoryPost = {
        tags: data.tags,
        memoryMessage: data.message,
        memoryPhotoUrl: data.image,
        memoryTitle: data.title,
      };
      const response = await AuthInstance.post(
        "memory",
        postData
      );
      
    } catch (error) {
      const err = error as AxiosError;
      const errorCode: 404 | 500 | undefined = err.response?.status as
        | 404
        | 500
        | undefined;
      return rejectWithValue(errorCode);
    }
  }
);

interface IState {
  data: IMemory[] | null;
  loading: "pending" | "success" | "rejected" | "idle";
}

const initialState: IState = {
  data: null,
  loading: "idle",
};

const memoriesSlice = createSlice({
  name: "memories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default memoriesSlice.reducer;
export const {} = memoriesSlice.actions;
