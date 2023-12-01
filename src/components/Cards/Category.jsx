import React from "react";

function Category({ category }) {
  // Constructing the background image style
  const backgroundImageStyle = {
    backgroundImage: `url('${category.image}')`,
  };

  return (
    <>
      <div className='relative border border-gray-300 my-2 grid h-60 w-full max-w-[11rem] flex-col items-end justify-center overflow-hidden bg-white bg-clip-border text-center text-gray-700'>
        <div className={`absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none`} style={backgroundImageStyle}>
          <div className='absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50'></div>
        </div>
        <div className='relative px-6 py-5 md:px-12'>
          <h2 className='mb-2 block text-xl font-medium tracking-normal text-white antialiased'>{category.name}</h2>
          <h5 className='block mb-1 text-lg antialiased font-semibold leading-snug tracking-normal text-gray-400'>40% - 50% off</h5>
        </div>
      </div>
    </>
  );
}

export default Category;
