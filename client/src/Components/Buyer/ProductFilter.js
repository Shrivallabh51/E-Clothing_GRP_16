import React, { useState } from "react";

const ProductSearchForm = () => {
  const [price, setPrice] = useState(270);
  const maxPrice = 1000;

  return (
    <div
      className="container bg-filter "
      style={{
        maxWidth: "75vw",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "40px",
      }}
    >
      <form>
        <div className="row mb-3">
          <div className="col-md">
            <label htmlFor="searchProduct" className="form-label text-white">
              Search Product
            </label>
            <input
              type="text"
              className="form-control"
              id="searchProduct"
              placeholder="Enter product name"
            />
          </div>
          <div className="col-md">
            <label htmlFor="selectCategory" className="form-label text-white">
              Select Category
            </label>
            <select className="form-select" id="selectCategory">
              <option value="all">all</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          {/*
          <div className="col-md">
            <label htmlFor="selectCompany" className="form-label text-white">
              Select Company
            </label>
            <select className="form-select" id="selectCompany">
              <option value="all">all</option>
             
            </select>
          </div>
          */}
          <div className="col-md">
            <label htmlFor="sortBy" className="form-label text-white">
              Sort By
            </label>
            <select className="form-select" id="sortBy">
              <option value="a-z">a-z</option>
              {/* Add more sorting options as needed */}
            </select>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-6 col-lg-3">
            <label className="form-label text-white">Select Price</label>
            <div className="d-flex align-items-center">
              <input
                type="range"
                className="form-range"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                max={maxPrice}
                style={{ color: "#ff66b2" }}
              />
              <span className="text-white ms-2">${price}.00</span>
            </div>
            <div
              className="text-white mt-1 d-flex justify-content-between"
              style={{ fontSize: "12px" }}
            >
              <span>0</span>
              <span>Max : ${maxPrice}.00</span>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="form-check mt-4"></div>
          </div>
          <div className="col-md-6 col-lg-3 mt-3 mt-lg-0">
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                backgroundColor: "#ff66b2",
                border: "none",
                color: "#000",
              }}
            >
              SEARCH
            </button>
          </div>
          <div className="col-md-6 col-lg-3 mt-3 mt-lg-0">
            <button
              type="reset"
              className="btn btn-warning w-100"
              style={{
                backgroundColor: "#ffa64d",
                border: "none",
                color: "#000",
              }}
            >
              RESET
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductSearchForm;
