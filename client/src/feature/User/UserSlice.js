import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  isLoggedIn: !!localStorage.getItem("user"),
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const loginUser = createAsyncThunk(
  "User/loginUser",
  async ({ userName, password }, thunkAPI) => {
    try {
      const response = await fetch("https://localhost:7268/api/Account/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
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
      const token = data.token; // Extract the token from the response

      // Decode the JWT token to extract claims
      const decodedToken = jwtDecode(token);
      const username = decodedToken.sub; // Assuming 'sub' is the username
      const roleFromToken =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]; // Assuming 'role' is stored
      const userId = decodedToken.userId || decodedToken["userId"] || null;

      const user = { token, username, rId: roleFromToken, userId };
      localStorage.setItem("user", JSON.stringify(user));

      return { token, username, rId: roleFromToken, userId };
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
        state.user = action.payload;
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
