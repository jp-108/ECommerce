import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <>
      <div className='flex flex-col md:w-48 w-44 h-[19rem] backdrop-blur-sm bg-white/70 border border-black/30 hover:border-black bg-opacity-95'>
        <Link className='relative mx-auto flex w-full h-60 overflow-hidden' to={`/product/${product.id}`}>
          <img className='object-fill w-48' src={product.images ? product.images[0] : ""} alt='product image' />
          <div className='flex py-2 top-0 absolute flex-nowrap items-center'>
            <span className='bg-white/30 backdrop-blur-md flex p-1'>
              <svg aria-hidden='true' className='h-5 w-5 text-teal-700' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
              </svg>
              <span className='rounded text-gray-950 px-2 text-sm font-semibold'>{product.ratings}</span>
            </span>
          </div>
        </Link>
        <div className='flex flex-col justify-stretch mt-4 px-3 pb-2'>
          <Link to='/'>
            <h5 className='text-base text-slate-950'>{product.productName}</h5>
          </Link>
          <div className='mb-1 flex items-center justify-between'>
            <div>
              <span className='text-lg font-bold text-slate-950'>₹{product.price}</span>
              <span className='text-xs p-1 text-slate-950 line-through'>₹{product.price + Math.ceil(product.price / 3.9)}</span>
              <span className='m-1 py-1 text-center text-sm text-red-600 font-medium '>(39% OFF)</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
