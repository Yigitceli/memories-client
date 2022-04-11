import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  IMemory,
  IMemoryAuthor,
  IMemoryPost,
  InputData,
  IUserBody,
} from "../types";
import { RootState } from "./store";

export const fetchMemories = createAsyncThunk<
  IMemory[] | undefined,
  InputData,
  { rejectValue: 404 | 500 | undefined; state: RootState }
>(
  "memories/fetchMemories",
  async (data: InputData, { rejectWithValue, getState }) => {
    try {
      const user: IUserBody | null | undefined = getState().user.data;
      const postAuthor: IMemoryAuthor = {
        userId: user?.userId!,
        displayName: user?.displayName!,
        email: user?.email!,
        photoUrl: user?.photoUrl!,
      };
      const postData: IMemoryPost = {
        author: postAuthor,
        tags: data.tags,
        memoryMessage: data.message,
        memoryPhotoUrl: data.image,
        memoryTitle: data.title,
      };
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
