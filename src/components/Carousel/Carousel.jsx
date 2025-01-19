import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Carousel = ({ images, timeDuration }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetAutoplay();
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    resetAutoplay();
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    resetAutoplay();
  };

  const resetAutoplay = () => {
    if (isAutoplay) {
      stopAutoplay();
      startAutoplay();
    }
  };

  const startAutoplay = () => {
    setIsAutoplay(true);
  };

  const stopAutoplay = () => {
    setIsAutoplay(false);
  };

  useEffect(() => {
    let interval;

    if (isAutoplay) {
      interval = setInterval(() => {
        goToNextSlide();
      }, timeDuration);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isAutoplay, currentIndex]);

  return (
    <div className='relative overflow-hidden h-full'>
      <div className='flex transition-transform duration-300 ease-in-out' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div className='min-w-full flex justify-center' key={index}>
            <div className='mx-auto grid grid-cols-1'>
              <div className='relative md:px-40 justify-center col-start-1 md:text-left text-center row-start-1 flex h-full flex-col gap-10 bg-gradient-to-r from-black via-black/30'>
                <h1 className='mt-1 md:text-6xl text-4xl font-semibold text-gray-200'>{image.title}</h1>
                <p className='md:text-4xl leading-4 text-2xl font-medium text-gray-200'>{image.offer}</p>
              </div>
              <div className='grid gap-4 col-start-1 col-end-3 row-start-1'>
                <img src={image.src} alt={`Slide ${index + 1}`} data-aos='fade-left' className='object-center w-screen h-[35rem] ' />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={goToPrevSlide} className='absolute top-1/2 left-2 transform -translate-y-1/2 text-slate-900 hover:bg-gray-200 p-2 rounded-full'>
        <ChevronLeftIcon className='w-6 h-6' />
      </button>
      <button onClick={goToNextSlide} className='absolute top-1/2 right-2 transform -translate-y-1/2 text-slate-900 hover:bg-gray-200 p-2 rounded-full'>
        <ChevronRightIcon className='w-6 h-6' />
      </button>
      <div className='absolute bottom-4 left-0 right-0 flex justify-center space-x-4'>
        {images.map((_, index) => (
          <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full border-2   ${index === currentIndex ? "bg-gray-200" : ""}`} />
        ))}
      </div>
      <div className='relative w-screen bottom-24 flex justify-center z-10'>
        <Link to='/products/all' className='absolute  px-5 bg-slate-500/50 py-1 border-2 animate-bounce rounded-lg shadow-lg shadow-slate-800  text-white'>
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Carousel;
