import React from "react";
import Product from "../../feature/product/Product";
import { ProductFilter } from "./ProductFilter";

export default function Products() {
  return (
    <main className="ProductPage-Center">
      <ProductFilter />
      <Product />
    </main>
  );
}
