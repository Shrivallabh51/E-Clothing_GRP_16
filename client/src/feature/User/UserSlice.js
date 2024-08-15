import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react";
import { toast } from "react-toastify";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  isLoggedIn: !!localStorage.getItem("user"),
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const loginUser = createAsyncThunk(
  "User/loginUser",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await fetch("https://localhost:7268/api/Account/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 400) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.message || "Bad Request");
      }

      if (!response.ok) {
        if (response.status === 503) {
          // Server unavailable
          throw new Error(
            "The server is currently unavailable. Please try again later."
          );
        }
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      // console.log(data);
      return data; // This will be the fulfilled payload
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(" The server is currently unavailable");
    }
  }
);

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = {};
      state.isLoggedIn = false;
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        localStorage.setItem("user", JSON.stringify(action.payload));
        // console.log("fullfilled");
        //console.log(JSON.stringify(action.payload));
        state.isLoggedIn = true;
        state.user = action.payload;
        console.log("user" + state.user.username);
        console.log(state.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(`Login failed: ${action.payload}`);
      });
  },
});

export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;
