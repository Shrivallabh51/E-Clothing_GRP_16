import React from "react";
import Product from "../../feature/product/Product";
import ProductSearchForm from "./ProductFilter";

export default function Products() {
  return (
    <main className="Product-Page-Center">
      <ProductSearchForm />
      <Product />
    </main>
  );
}
