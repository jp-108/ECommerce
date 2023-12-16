import React, { useState, useEffect } from "react";

function SearchBar() {
const [serachQuery, setSearchQuery] = useState('')
const [fetchProduct, setFetchProduct] = useState([])

const handleChange = (e) =>{
  let value = e.target.value
  setTimeout(() => {
    setSearchQuery(value)
  }, 1000);
}

  useEffect(()=>{
    fetch(`https://dummyjson.com/products/search?q=${serachQuery}`)
      .then(res=>res.json())
      .then(res=>setFetchProduct(res.products))
  },[serachQuery])

// console.log(serachQuery, fetchProduct)

  return (
    <form className='flex items-center space-x-2 border rounded-md p-2'>
      <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 flex-none text-gray-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
      </svg>
      <input onChange={handleChange} className='w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto' type='search' placeholder='Search' />
    </form>
  );
}

export default SearchBar;
