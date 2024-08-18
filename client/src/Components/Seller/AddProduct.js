import React, { useEffect, useState } from "react";
import "./ProductForm.css"; // Import the CSS file
import { useSelector, useDispatch } from "react-redux";
import {
  getCategories,
  updateProductField,
} from "../../feature/product/ProductSlice";
import { addProductTo } from "../../feature/product/ProductSlice";
import { toast, ToastContainer } from "react-toastify";
//import { ToastContainer, toast } from "react-toastify";

const AddProduct = () => {
  // const product = useSelector((store) => store.Product.ProductsToAdd);
  const dispatch = useDispatch();

  const [isFormValid, setIsFormValid] = useState(false);

  const { categories, ProductsToAdd: product } = useSelector(
    (store) => store.Product
  );
  // console.log(categories);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const productToEdit = false;
  const [file, setFile] = useState();

  const uploadImage = async (id) => {
    const fd = new FormData();
    fd.append("file", file);
    const reqObject = {
      method: "POST",
      body: fd,
    };
    const response = await fetch(
      `http://localhost:8090/uploadproductimg/${id}`,
      reqObject
    );
    if (!response.ok) {
      throw new Error("Failed to upload image");
    }
    console.log("upload success");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateProductField({ name, value }));

    validateForm({ ...product, [name]: value });
  };

  const validateForm = (product) => {
    const isValid =
      product.product_Name &&
      product.price &&
      product.categorydto.cat_id &&
      product.stock_Qty &&
      product.description &&
      file; // Ensure a file is selected

    console.log(
      product.product_Name &&
        product.price &&
        product.categorydto.cat_id &&
        product.stock_Qty &&
        product.description &&
        file
    );
    setIsFormValid(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedProduct = await dispatch(addProductTo(product));
      //console.log(addedProduct.payload.p_id);

      if (addProductTo.fulfilled.match(addedProduct)) {
        const productId = addedProduct.payload.p_id;
        await uploadImage(productId);
        toast.success("product added successfully");
      }
    } catch (error) {
      console.error("error occurred during adding product", error);
    }
  };

  return (
    <main>
      <div className="container mt-5">
        <h2>{productToEdit ? "Update Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control custom-input"
                name="product_Name"
                value={product.product_Name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control custom-input"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                id="selectCategory"
                name="categorydto.cat_id"
                onChange={handleChange}
              >
                <option>select...</option>
                {/* Add more categories as needed */}
                {categories.map((cat) => {
                  return (
                    <option key={cat.cat_id} value={cat.cat_id}>
                      {cat.cat_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control custom-input"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFile(file);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Stock Qty</label>
              <input
                type="number"
                className="form-control custom-input"
                name="stock_Qty"
                value={product.stock_Qty}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control custom-input"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">
                {productToEdit ? "Update Product" : "Add Product"}
              </label>
              <input
                type="submit"
                className="form-control btn btn-primary"
                value={productToEdit ? "Update Product" : "Add Product"}
                onChange={handleChange}
                required
                disabled={!isFormValid}
              />
              {/* <button type="submit" className="btn btn-primary"></button> */}
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </main>
  );
};

export default AddProduct;
