import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCategories } from "../../feature/product/ProductSlice";
import { useDispatch } from "react-redux";
import { updateFilters } from "../../feature/product/ProductSlice";
import { FilterProduct } from "../../feature/product/ProductSlice";

const ProductSearchForm = () => {
  const maxPrice = 1000;
  const dispatch = useDispatch();
  const { categories, filters } = useSelector((store) => store.Product);

  const HandleSubmit = (e) => {
    e.preventDefault();
    // console.log("handleSb");
    // console.log(filters.text);

    // console.log(filters.catId);
    // console.log(filters.sort);
    // console.log(filters.price);
    // console.log(filters.max_price);

    dispatch(FilterProduct());
  };
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const updateFilter = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(updateFilters({ name, value }));
  };

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
              name="text"
              placeholder="Enter product name"
              onChange={(e) => updateFilter(e)}
              value={filters.text}
            />
          </div>
          <div className="col-md">
            <label htmlFor="selectCategory" className="form-label text-white">
              Select Category
            </label>
            <select
              className="form-select"
              id="selectCategory"
              name="category"
              value={filters.catID}
              onChange={(e) => updateFilter(e)}
            >
              <option value={0}>all</option>
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
            <select
              className="form-select"
              id="sortBy"
              name="sort"
              value={filters.sort}
              onChange={(e) => updateFilter(e)}
            >
              <option value="a-z">a-z</option>
              <option value="z-a">z-a</option>
              <option value="price-lowest">price-lowest</option>
              <option value="price-highest">price-highest</option>
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
                name="price"
                value={filters.price}
                onChange={(e) => updateFilter(e)}
                max={maxPrice}
                style={{ color: "#ff66b2" }}
              />
              <span className="text-white ms-2">${filters.price}.00</span>
            </div>
            <div
              className="text-white mt-1 d-flex justify-content-between"
              style={{ fontSize: "12px" }}
            >
              <span>0</span>
              <span>Max : {maxPrice}.00</span>
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
              onClick={(e) => HandleSubmit(e)}
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
