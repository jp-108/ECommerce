import React from "react";
import ProductList from "../components/Product/ProductList";
import { useLocation } from "react-router-dom";

function Products() {
  const location = useLocation();

  return (
    <div className='relative w-full h-full'>
      <ProductList apiUrl={location.search} />
    </div>
  );
}

export default Products;
