import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  deletedPID: "",
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  user: JSON.parse(localStorage.getItem("user")),
  isQtyChange: false,
};

export const getCart = createAsyncThunk("Cart/getCart", async (_, thunkAPI) => {
  try {
    // Retrieve the userId from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return thunkAPI.rejectWithValue("User ID not found in localStorage");
    }

    // Make the API call to fetch the cart using the userId
    const response = await fetch(
      `http://localhost:8090/getcart/${user.userId}`
    );
    //console.log("getCart");
    // Return the cart data
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    // Handle errors
    return thunkAPI.rejectWithValue(
      error.response ? error.response.data : error.message
    );
  }
});

export const incProductQty = createAsyncThunk(
  "cart/incProductQty",
  async (p_id, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      console.log("1");
      const response = await fetch(
        `http://localhost:8090/increment?userId=${user.userId}&productId=${p_id}`,
        {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.text();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const decProductQty = createAsyncThunk(
  "cart/decProductQty",
  async (p_id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8090/decrement?userId=${initialState.user.userId}&productId=${p_id}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.text();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "Cart/addToCart",
  async ({ p_id, quantity }, thunkAPI) => {
    try {
      console.log(" before api call addtocart");
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        return thunkAPI.rejectWithValue("User ID not found in localStorage");
      }
      // Make the API call to fetch the cart using the userId
      const response = await fetch(
        `http://localhost:8090/addtocart?userId=${user.userId}&productId=${p_id}&quantity=${quantity}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("addtocart");
      // Return the cart data
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle errors
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  "Cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        return rejectWithValue("User ID not found in localStorage");
      }
      // Make the API call to fetch the cart using the userId
      const response = await fetch(
        `http://localhost:8090/clearCart/${user.userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to clear cart");
      } else {
        const data = await response.text();
        return data;
      }
    } catch (error) {
      console.error("Error details:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {})
      .addCase(getCart.fulfilled, (state, action) => {
        state.carts = action.payload;
        state.ItemDeleted = false;
      })
      .addCase(getCart.rejected, (state, action) => {})
      .addCase(clearCart.pending, (state) => {
        //  console.log("cart clearing pending");
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.carts = [];
      })
      .addCase(clearCart.rejected, (state, action) => {})

      .addCase(incProductQty.pending, (state) => {
        //  console.log("cart clearing pending");
        state.isQtyChange = false;
      })
      .addCase(incProductQty.fulfilled, (state, action) => {
        state.isQtyChange = true;
      })
      .addCase(incProductQty.rejected, (state, action) => {})

      .addCase(decProductQty.pending, (state) => {
        state.isQtyChange = false;
      })
      .addCase(decProductQty.fulfilled, (state, action) => {
        state.isQtyChange = true;
      })
      .addCase(decProductQty.rejected, (state, action) => {});
  },
});

export const {} = CartSlice.actions;
export default CartSlice.reducer;
