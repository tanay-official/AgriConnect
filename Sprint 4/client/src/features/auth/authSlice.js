import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signInAPI = createAsyncThunk(
  "auth/signIn",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/auth/signin",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUpAPI = createAsyncThunk(
  "auth/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/auth/signup",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutAPI = createAsyncThunk(
  "auth/logout",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/auth/logout",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    token: null,
    role: localStorage.getItem("role")
      ? JSON.parse(localStorage.getItem("role"))
      : null,
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.role = action.payload.data.role;
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        localStorage.setItem("role", JSON.stringify(action.payload.data.role));
        state.user = action.payload.data;
      })
      .addCase(signInAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUpAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        localStorage.setItem("isAuthenticated", "true");
        state.role = action.payload.data.role;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        localStorage.setItem("role", JSON.stringify(action.payload.data.role));
        state.user = action.payload.data;
      })
      .addCase(signUpAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAPI.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        state.role = null;
        state.user = null;
      })
      .addCase(logoutAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
