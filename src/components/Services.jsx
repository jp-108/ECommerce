import React from "react";

function Services() {
  return (
    <div>
      <div className='container mx-auto max-w-5xl flex gap-12 flex-wrap items-start justify-center md:justify-between'>
        <div className='grid gap-4 border-2 p-6 m-2 h-72 w-72 justify-items-center text-center md:flex-1'>
          <div className=' rounded-full border-8 border-rose-800 p-4 '>
            <svg stroke='currentColor' fill='currentColor' strokeWidth='' viewBox='0 0 640 512' className='text-3xl h-14 w-14' xmlns='http://www.w3.org/2000/svg'>
              <path d='M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z'></path>
            </svg>
          </div>

          <h3 className='text-2xl font-bold'>Free Shipping</h3>
          <p className='mb-6'>We ship all over India for FREE.</p>
        </div>
        <div className='grid gap-4 border-2 p-6 h-72 w-72 m-2 justify-items-center text-center md:flex-1'>
          <div className=' rounded-full border-8 border-rose-800 p-4 '>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-14 h-14'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
          </div>
          <h3 className='text-2xl font-bold'>Exciting Offer</h3>
          <p>We provide amazing offers & discounts on our products.</p>
        </div>
        <div className='grid gap-4 border-2 h-72 w-72 p-6 m-2 justify-items-center text-center md:flex-1'>
          <div className=' rounded-full border-8 border-rose-800 p-4 '>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-14 h-14'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z'></path>
            </svg>
          </div>
          <h3 className='text-2xl font-bold'>Proven</h3>
          <p>Leading the Smart Home world for 10 year's</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
