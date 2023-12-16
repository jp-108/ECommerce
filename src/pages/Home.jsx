import React, { useEffect, useState } from "react";
import Category from "../components/Cards/Category";
import Carousel from "../components/Carousel/Carousel";
import ProductCard from "../components/Cards/ProductCard";
import ExploreCard from "../components/Cards/ExploreCard";
import Services from "../components/Services";

function Home() {
  const [category, setCategory] = useState([]);
  const [topSeller, setTopSeller] = useState([]);

  const images = [
    {
      src: "src/assets/hero1.png",
      title: "Men's Special",
      offer: "20% - 50% off",
    },
    {
      src: "src/assets/hero2.png",
      title: "Kid's Special",
      offer: "25% - 45% off",
    },
    {
      src: "src/assets/hero3.png",
      title: "Women's Special",
      offer: "20% - 40% off",
    },
  ];


  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then((res) => res.json())
      .then((res) => setCategory(res));

    fetch("https://dummyjson.com/products?limit=6")
      .then((res) => res.json())
      .then((res) => setTopSeller(res.products));
  }, []);

  return (
    <>
      <div>
        <Carousel images={images} timeDuration={3000} />
      </div>
      <h2 className='flex my-14 pt-8 justify-center font-bold text-slate-950 text-4xl'>Top Categories</h2>
      <div className='m-2 flex xl:flex-nowrap flex-wrap justify-center'>
        {category.map((item) => (
          <Category key={item.id} category={item} />
        ))}
      </div>
      <div>
        <h2 className='flex my-12 pt-10 justify-center text-center font-bold text-slate-950 text-4xl'>Explore New arrivals of best categories</h2>
        <ExploreCard />
      </div>

      <div className='bg-blue-950 pb-5'>
        <h2 className='flex my-12 pt-10 justify-center  font-bold text-slate-100 text-4xl'>Top Selling Products</h2>
        <div className='my-12 flex flex-wrap justify-evenly gap-1 '>
          {topSeller.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
      <div className='my-10'>
        <Services />
      </div>
    </>
  );
}

export default Home;
