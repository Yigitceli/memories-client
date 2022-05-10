import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Action } from "history";
import AuthInstance from "../AxiosAuth";
import { IMemory, IMemoryPage, IUserBody } from "../types";
import { RootState } from "./store";

interface IState {
  data: IMemoryPage | null | undefined;
  loading: "pending" | "success" | "rejected" | "idle";
  error: undefined | 404 | 500;
}

const initialState: IState = {
  data: null,
  loading: "idle",
  error: undefined,
};

export const makeComment = createAsyncThunk<
  IMemory,
  { comment: string; memory: IMemoryPage },
  { rejectValue: 404 | 500 | undefined }
>("memories/getMemories", async ({ comment, memory }, { rejectWithValue }) => {
  try {
    const response = await AuthInstance.post(`/memory/${memory?._id}/comment`, {
      comment,
    });
    const data = response.data.payload as IMemory;
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

export const fetchMemory = createAsyncThunk<
  IMemoryPage,
  { id: string },
  { rejectValue: 404 | 500 | undefined }
>("memoryPageSlice/fetchMemory", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://yigit-memories-backend.herokuapp.com/api/memory/${id}`
    );
    const data: IMemoryPage = response.data.payload;
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

const memorySlice = createSlice({
  name: "memories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMemory.pending, (state, action) => {
      state.loading = "pending";
      state.data = null;
      state.error = undefined;
    });
    builder.addCase(
      fetchMemory.fulfilled,
      (state, action: PayloadAction<IMemoryPage>) => {
        state.data = action.payload;
        state.loading = "idle";
        state.error = undefined;
      }
    );
    builder.addCase(
      fetchMemory.rejected,
      (state, action: PayloadAction<404 | 500 | undefined>) => {
        state.data = null;
        state.loading = "rejected";
        state.error = action.payload;
      }
    );
    builder.addCase(
      makeComment.fulfilled,
      (state, action: PayloadAction<IMemory>) => {
        if (state.data) {
          const comments = [...action.payload.comments];
          state.data.comments = comments.reverse();
        }
      }
    );
  },
});

export default memorySlice.reducer;
export const {} = memorySlice.actions;
