import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productAdded: false,
  file: null,
  status: "",
  products: [],
  ProductsToAdd: {
    product_Name: "",
    categorydto: {
      cat_id: "",
    },
    price: 20,
    userdto: {
      user_Id: "",
    },
    description: "",
    stock_Qty: "",
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
      // const fd = new FormData();
      // fd.append("file", initialState.file);
      // console.log("file1");
      // const reqObject = {
      //   method: "POST",
      //   headers: { "Content-Type": "multipart/form-data" },
      //   body: fd,
      // };

      // const response = await fetch(
      //   `http://localhost:8090/uploadproductimg/${51}`,
      //   reqObject
      // );
      // console.log("file2");
      // if (!response.ok) {
      //   throw new Error("Failed to upload image");
      // }

      console.log("Product added:");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const uploadProductImg = createAsyncThunk(
  "Product/uploadProductImg",
  async (product, thunkAPI) => {}
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
    setFile: (state, action) => {
      state.file = action.payload;
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
        // console.log(state.products);
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
      });
  },
});

export const { updateProductField, setFile } = ProductSlice.actions;
export default ProductSlice.reducer;
