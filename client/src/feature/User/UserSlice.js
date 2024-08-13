import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Login successful!");
      return data; // This will be the fulfilled payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.isLoggedIn = true;
    },
    logout: (state) => {
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
        state.user = action.payload;
        state.isLoggedIn = true;
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
