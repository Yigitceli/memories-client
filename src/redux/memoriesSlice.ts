import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RejectedWithValueActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
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
  async (data: InputData, { rejectWithValue, getState, dispatch }) => {
    try {
      const postData: IMemoryPost = {
        tags: data.tags,
        memoryMessage: data.message,
        memoryPhotoUrl: data.image,
        memoryTitle: data.title,
      };
      const response = await AuthInstance.post("memory", postData);
      dispatch(getMemory());
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

export const getMemory = createAsyncThunk<
  IMemory[] | undefined,
  undefined | number,
  { rejectValue: 404 | 500 | undefined }
>("memories/postMemory", async (page = 0, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/memory?page=${page}`
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
});

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
      getMemory.pending,
      (state, action: PayloadAction<IMemory[] | undefined>) => {
        state.data = null;
        state.loading = "pending";
        state.error = undefined;
      }
    );
    builder.addCase(getMemory.rejected, (state, action) => {
      state.data = null;
      state.loading = "rejected";
      state.error = action.payload;
    });
    builder.addCase(
      getMemory.fulfilled,
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
