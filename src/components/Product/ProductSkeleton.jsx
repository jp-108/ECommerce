import React from "react";

function ProductSkeleton() {
  return (
    <div>
      <div className='lg:w-4/5 animate-pulse mx-auto flex flex-wrap'>
        <div className='lg:w-1/2 h-[26rem] w-full md:h-[34rem]'>
          <div className='md:mx-20 mx-4 h-full bg-slate-400 rounded-lg'></div>
        </div>
        <div className='lg:w-1/2 lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
          ``
          <h2 className='h-5 w-20 bg-slate-400 rounded-lg'></h2>
          <h1 className='h-8 md:w-96 w-80  bg-slate-400 rounded-lg my-1'></h1>
          <div className='flex mt-2 mb-4'>
            <span className=' h-6 w-20 bg-slate-400 rounded-lg '></span>
            <span className='flex ml-3  py-2 border-l-2 h-6 w-20 bg-slate-400 rounded-lg border-gray-200'></span>
          </div>
          <p className='h-5 md:w-96 w-80 bg-slate-400 rounded-lg'></p>
          <div className='flex mt-6 pb-5 border-b-2 border-gray-100 mb-5'>
            <span className='h-6 w-48 bg-slate-400 rounded-lg mr-3'></span>
          </div>
          <div className='flex sm:flex-row flex-col justify-between'>
            <div className='mb-3 h-6 w-20 bg-slate-400 rounded-lg'></div>
            <div className='flex'>
              <button className='flex bg-slate-400  border-0 py-2 px-6 w-44 rounded'></button>
              <button className='rounded-full w-10 h-10 bg-slate-400  ml-4'></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
