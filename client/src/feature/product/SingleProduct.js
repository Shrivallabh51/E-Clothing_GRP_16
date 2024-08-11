// SingleProduct.js

import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleProduct = () => {
  const { id } = useParams();

  const products = useSelector((store) => store.Product.products);
  const product = products.find((p) => p.p_id === Number(id));

  //   console.log(products);
  //   console.log(product);
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={"http://localhost:8090" + product.imageUrl}
            alt={product.product_Name}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h2>{product.product_Name}</h2>
          <p className="text-muted">{product.description}</p>
          <p className="text-primary">${product.price.toFixed(2)}</p>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
