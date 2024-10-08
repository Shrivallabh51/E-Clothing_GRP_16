import { useDispatch } from "react-redux";
import { getProducts } from "./ProductSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../Cart/CartSlice";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const filteredProducts = useSelector(
    (store) => store.Product.filteredProducts
  );
  const navigate = useNavigate();

  const handleCartChange = async (product) => {
    await dispatch(addToCart({ p_id: product.p_id, quantity: 1 }));

    navigate("/cart", { replace: true }); // Navigate to /cart
    window.scrollTo(0, 0);
  };

  const dispatch = useDispatch();

  // console.log(products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (filteredProducts <= 0) {
    return <h1>Products not found</h1>;
  }

  return (
    <div className="my-5 product-margin">
      <p style={{ textAlign: "left" }}>
        {filteredProducts.length} product selected
      </p>
      <div className="row">
        {filteredProducts.map((product) => (
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
                <p className="card-text">{product.price.toFixed(2)}</p>
                <button
                  href="#"
                  className="btn btn-primary mt-auto"
                  onClick={() => handleCartChange(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
