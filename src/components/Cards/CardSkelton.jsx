import React from "react";

export default function CardSkelton() {
  return (
    <div>
      <div className='flex animate-pulse m-0.5 flex-col md:w-48 w-44 h-[19rem] border border-black/30 bg-white/80'>
        <div className='bg-black/60 w-full h-56'>
        </div>
        <div className='flex flex-col mt-4 px-1 md:px-3 pb-2'>
          <h5 className='bg-black/60 w-36 h-5 rounded-full'></h5>
          <div className='mb-1 mt-2 bg-black/60 rounded-full h-5'>
          </div>
        </div>
      </div>
    </div>
  );
}
