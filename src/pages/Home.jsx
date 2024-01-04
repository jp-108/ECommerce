import React, { useEffect, useState } from "react";
import Category from "../components/Cards/Category";
import Carousel from "../components/Carousel/Carousel";
import ProductCard from "../components/Cards/ProductCard";
import ExploreCard from "../components/Cards/ExploreCard";
import Services from "../components/Services";
import hero1 from "../assets/hero1.png"
import hero2 from "../assets/hero2.png"
import hero3 from "../assets/hero3.png"
import { db } from "../config/firebase";
import { collection, onSnapshot, query, limit} from "firebase/firestore";
import CardSkelton from "../components/Cards/CardSkelton";


function Home() {
  const [topSeller, setTopSeller] = useState([]);
  const numberOfSkeletons = 6;

  const images = [
    {
      src: hero1,
      title: "Men's Special",
      offer: "20% - 50% off",
    },
    {
      src: hero2,
      title: "Kid's Special",
      offer: "25% - 45% off",
    },
    {
      src: hero3,
      title: "Women's Special",
      offer: "20% - 40% off",
    },
  ];


  useEffect(() => {
    const q = query(collection(db, 'Products'), limit(6));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTopSeller(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe(); // Cleanup function
  }, []);

  return (
    <>
      <div>
        <Carousel images={images} timeDuration={3000} />
      </div>
      <div>
        <h2 className='flex my-12 pt-10 justify-center text-center font-bold text-slate-950 text-4xl'>Explore New arrivals of best categories</h2>
        <ExploreCard />
      </div>

      <div className='pb-5' style={{backgroundImage:`url("https://images.pexels.com/photos/4790056/pexels-photo-4790056.jpeg?auto=compress&cs=tinysrgb&w=1560&h=750&dpr=1")`}}>
        <div className='flex my-12 py-5 justify-center font-bold text-black bg-white text-4xl'><h2 className="p-2">Top Selling Products</h2></div>
        <div className='my-12 flex flex-wrap justify-evenly gap-1'>
          {topSeller.length===0?Array.from({ length: numberOfSkeletons }, (_, index) => (
        <CardSkelton key={index} />
      )):
          topSeller.map((item) => (
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
