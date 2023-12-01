import React from "react";

function ExploreCard() {
  return (
    <div>
      <div className='flex flex-col items-center lg:flex-wrap lg:flex-row justify-center w-[100%]'>
        <div style={{ backgroundImage: "url(https://source.unsplash.com/random/500x400/?mens-clothes)" }} className='bg-no-repeat bg-cover bg-center lg:bg-left flex flex-col w-[90%] lg:w-[40%] h-96 m-2 brightness-110 hover:brightness-90 '>
          <div className='absolute inset-0 bg-gray-900 bg-opacity-50'>
            <div className='flex flex-col items-center justify-center p-2 text-gray-100'>
              <div className='font-bold text-4xl m-2 mt-[170px] text-center'>
                {" "}
                <a href=''>Man's Collection</a>
              </div>
              <div className=' m-2 text-sm'></div>
            </div>
          </div>
        </div>
        <div style={{ backgroundImage: "url(https://source.unsplash.com/random/500x400/?women-clothes)" }} className='bg-no-repeat bg-cover bg-center lg:bg-left flex flex-col w-[90%] lg:w-[40%] h-96 m-2 brightness-110 hover:brightness-90 '>
          <div className='absolute inset-0 bg-gray-900 bg-opacity-50'>
            <div className='flex flex-col items-center justify-center p-2 text-gray-100'>
              <div className='font-bold text-4xl m-2 mt-[170px] text-center'>
                {" "}
                <a href=''>Women's Collection</a>
              </div>
              <div className=' m-2 text-sm'></div>
            </div>
          </div>
        </div>
        <div style={{ backgroundImage: "url(https://source.unsplash.com/random/500x400/?kids-clothes)" }} className='bg-no-repeat bg-cover bg-center lg:bg-left flex flex-col w-[90%] lg:w-[40%] h-96 m-2 brightness-110 hover:brightness-90 '>
          <div className='absolute inset-0 bg-gray-900 bg-opacity-50'>
            <div className='flex flex-col items-center justify-center p-2 text-gray-100'>
              <div className='font-bold text-4xl m-2 mt-[170px] text-center'>
                {" "}
                <a href=''>Kids's Collection</a>
              </div>
              <div className=' m-2 text-sm'></div>
            </div>
          </div>
        </div>
        <div style={{ backgroundImage: "url(https://source.unsplash.com/random/500x400/?shoes)" }} className='bg-no-repeat bg-cover bg-center lg:bg-left flex flex-col w-[90%] lg:w-[40%] h-96 m-2 brightness-110 hover:brightness-90 '>
          <div className='absolute inset-0 bg-gray-900 bg-opacity-50'>
            <div className='flex flex-col items-center justify-center p-2 text-gray-100'>
              <div className='font-bold text-4xl m-2 mt-[170px] text-center'>
                {" "}
                <a href=''>Shoes</a>
              </div>
              <div className=' m-2 text-sm'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreCard;
