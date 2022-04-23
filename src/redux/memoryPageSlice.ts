import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Action } from "history";
import AuthInstance from "../AxiosAuth";
import {
  IMemoryPage,
} from "../types";
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

export const fetchMemory = createAsyncThunk<
  IMemoryPage,
  { id: string },
  { rejectValue: 404 | 500 | undefined }
>("memoryPageSlice/fetchMemory", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/memory/${id}`);
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
  },
});

export default memorySlice.reducer;
export const {} = memorySlice.actions;
