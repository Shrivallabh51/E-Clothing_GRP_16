import { useDispatch } from "react-redux";
import { getProducts } from "./ProductSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";

export default function Product() {
  const products = useSelector((store) => store.Product.products);
  const dispatch = useDispatch();

  console.log(products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="my-5 product-margin">
      <div className="row">
        {products.map((product) => (
          <div
            key={product.p_id}
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          >
            <div className="card h-100">
              <Link to={`/products/${product.p_id}`}>
                <div
                  className="card-img-top"
                  style={{
                    width: "100%",
                    height: "180px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={"http://localhost:8090" + product.imageUrl}
                    alt={product.name}
                    className="img-fluid h-100 w-100"
                    style={{
                      objectFit: "cover", // Ensures the image covers the entire area
                      objectPosition: "top", // Ensures the top part of the image is visible
                    }}
                  />
                </div>
              </Link>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.product_Name}</h5>
                <p className="card-text text-muted">{product.description}</p>
                <p className="card-text">${product.price.toFixed(2)}</p>
                <Link href="#" className="btn btn-primary mt-auto">
                  Add to Cart
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
