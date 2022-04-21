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
  undefined,
  InputData,
  { rejectValue: 404 | 500 | undefined; state: RootState }
>(
  "memories/postMemory",
  async (data: InputData, { rejectWithValue, getState, dispatch }) => {
    try {
      const postData: IMemoryPost = {
        tags: data.tags,
        memoryMessage: data.message,
        memoryPhotoUrl: data.image,
        memoryTitle: data.title,
      };
      const response = await AuthInstance.post("memory", postData);
      document.location.reload();
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

export const getMemories = createAsyncThunk<
  IMemory[],
  { page?: number; limit?: number },
  { rejectValue: 404 | 500 | undefined }
>(
  "memories/getMemories",
  async ({ page = 0, limit = 5 }, { rejectWithValue }) => {
    try {
      console.log(page);
      const response = await axios.get(
        `http://localhost:5000/api/memory?page=${page}&limit=${limit}`
      );
      const data: IMemory[] = response.data.payload;
      console.log(data);
      return data;
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
  data: IMemory[] | null | undefined;
  loading: "pending" | "success" | "rejected" | "idle";
  page: number | 0;
  error: undefined | 404 | 500;
}

const initialState: IState = {
  data: null,
  loading: "idle",
  page: 0,
  error: undefined,
};

const memoriesSlice = createSlice({
  name: "memories",
  initialState,
  reducers: {
    pageUp: (state) => {
      state.page++;
    },
    pageDown: (state) => {
      state.page--;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getMemories.pending,
      (state, action: PayloadAction<IMemory[] | undefined>) => {
        state.loading = "pending";
        state.error = undefined;
      }
    );
    builder.addCase(getMemories.rejected, (state, action) => {
      state.loading = "rejected";
      state.error = action.payload;
    });
    builder.addCase(
      getMemories.fulfilled,
      (state, action: PayloadAction<IMemory[] | undefined>) => {
        if (state.data && state.data?.length > 0 && action.payload) {
          state.data = [...state.data, ...action.payload];
        } else {
          state.data = action.payload;
        }
        state.loading = "success";
        state.error = undefined;
      }
    );
  },
});

export default memoriesSlice.reducer;
export const { pageUp, pageDown } = memoriesSlice.actions;
