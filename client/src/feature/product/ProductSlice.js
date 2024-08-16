import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productAdded: false,
  status: "",
  products: [],
  AddedProduct_id: "",
  ProductsToAdd: {
    product_Name: "",
    categorydto: {
      cat_id: "",
    },
    price: 20,
    userdto: {
      user_Id: Number(JSON.parse(localStorage.getItem("user")).userId),
    },
    description: "",
    stock_Qty: "",
  },

  categories: [],
  filteredProducts: [],
  filters: {
    text: "",
    sort: "a-z",
    catId: 0,
    price: 0,
  },
};

export const getProducts = createAsyncThunk(
  "Product/getProducts",
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());

      const resp = await fetch("http://localhost:8090/getproducts");
      const data = await resp.json();
      //console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getCategories = createAsyncThunk(
  "Product/getCateogeries",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8090/getcat");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      //  console.log("getcat");
      //  console.log(data);
      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProductTo = createAsyncThunk(
  "Product/addProductTo",
  async (product, thunkAPI) => {
    try {
      const resp = await fetch("http://localhost:8090/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!resp.ok) {
        throw new Error("Failed to add product");
      }

      const data = await resp.json();
      console.log(data);
      console.log("Product added:");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    updateProductField: (state, action) => {
      const { name, value } = action.payload;

      // Handle nested updates
      if (name.startsWith("categorydto.") || name.startsWith("userdto.")) {
        const [parent, key] = name.split(".");
        state.ProductsToAdd[parent][key] = value;
      } else {
        state.ProductsToAdd[name] = value;
      }
    },

    updateFilters: (state, action) => {
      const { name, value } = action.payload;

      if (name === "category") {
        state.filters.catId = Number(value);
      }
      if (name === "text") {
        state.filters.text = value;
      }
      if (name === "price") {
        state.filters.price = Number(value);
      }
      if (name === "sort") {
        state.filters.sort = value;
      }
    },
    FilterProduct: (state, action) => {
      let filtered = state.products;

      // Filter by text
      if (state.filters.text.trim()) {
        filtered = filtered.filter((product) =>
          product.product_Name
            .toLowerCase()
            .includes(state.filters.text.toLowerCase())
        );
      }

      // Filter by category
      if (state.filters.catId && state.filters.catId !== 0) {
        filtered = filtered.filter(
          (product) => product.categorydto.cat_id === state.filters.catId
        );
      }

      // Filter by price
      if (state.filters.price > 0) {
        filtered = filtered.filter(
          (product) => product.price <= state.filters.price
        );
      }

      // Sort products
      if (state.filters.sort === "price-lowest") {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (state.filters.sort === "price-highest") {
        filtered = filtered.sort((a, b) => b.price - a.price);
      } else if (state.filters.sort === "a-z") {
        filtered = filtered.sort((a, b) =>
          a.product_Name.localeCompare(b.product_Name)
        );
      } else if (state.filters.sort === "z-a") {
        filtered = filtered.sort((a, b) =>
          b.product_Name.localeCompare(a.product_Name)
        );
      }

      console.log("filtered");
      console.log(filtered);
      // Update the filteredProducts in state
      state.filteredProducts = filtered;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.filteredProducts = state.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        //console.log("rej");
        //console.log(action);
        state.isLoading = false;
      });

    builder
      .addCase(addProductTo.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(addProductTo.fulfilled, (state, action) => {
        state.productAdded = true;
        state.AddedProduct_id = action.payload.p_id;
      })
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
        // console.log(action.payload);
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { updateProductField, setFile, updateFilters, FilterProduct } =
  ProductSlice.actions;
export default ProductSlice.reducer;
