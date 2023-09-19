import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localstorage";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  user: null,
  errMsg: null,
  userDetails: getUserFromLocalStorage(),
};

const notifyError = (message) => toast.error(message);
const notifySuccess = (message) => toast.success(message);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("auth/login", user);
      return resp?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("auth/register", user);
      return resp?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        notifySuccess(payload?.message);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errMsg = payload;
        notifyError(payload?.message);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userDetails = payload;
        window.location.href = "/";
        addUserToLocalStorage(payload);
        notifySuccess("Login successful");
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errMsg = payload;
        console.log(payload);
        notifyError("Invalid Credentials");
      });
  },
});

export default userSlice.reducer;
