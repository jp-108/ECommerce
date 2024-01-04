import React from "react";
import ProductList from "../components/Product/ProductList";
import { useParams } from "react-router-dom";


function Products() {
  const params = useParams()

  return (
    <div className='relative w-full h-full'>
      <ProductList apiUrl={params.category} />
    </div>
  );
}

export default Products;
