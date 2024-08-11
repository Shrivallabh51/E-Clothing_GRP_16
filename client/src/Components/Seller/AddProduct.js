import React, { useEffect } from "react";
import "./ProductForm.css"; // Import the CSS file
import { useSelector, useDispatch } from "react-redux";
import {
  updateProductField,
  setFile,
} from "../../feature/product/ProductSlice";
import { addProductTo } from "../../feature/product/ProductSlice";
//import { ToastContainer, toast } from "react-toastify";

const AddProduct = () => {
  const product = useSelector((store) => store.Product.ProductsToAdd);
  const dispatch = useDispatch();
  const productToEdit = false;

  useEffect(() => {
    if (productToEdit) {
      // You can populate the form with productToEdit data here if needed.
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateProductField({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //fetch api call post method
    dispatch(addProductTo(product));
    //console.log(product);
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
              <input
                type="text"
                className="form-control custom-input"
                name="categorydto.cat_id"
                value={product.categorydto.cat_id}
                onChange={handleChange}
                required
              />
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
                  dispatch(setFile(file));
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">User ID</label>
              <input
                type="text"
                className="form-control custom-input"
                name="userdto.user_Id"
                value={product.userdto.user_Id}
                onChange={handleChange}
                required
              />
            </div>
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
          </div>
          <div className="row">
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
              />
              {/* <button type="submit" className="btn btn-primary"></button> */}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddProduct;
