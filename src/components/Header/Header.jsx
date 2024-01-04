import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import SearchBar from "../SearchBar/SearchBar";
import Cart from "../Cart/Cart";
import ProfileDropDown from "./ProfileDropDown";
import { auth } from "../../config/firebase";
import { getUserData } from "../../Redux-store/authSlice";

export default function Header() {
  const [menuState, setMenuState] = useState(false);
  const authStatus = useSelector((state) => state.authSlice.authStatus);
  const product = useSelector((state) => state.cartSlice.data);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(getUserData({ uid: user.uid, username: user.displayName, email: user.email }));
      }
    });
  }, []);

  const cartClickHandler = () => {
    setOpen(true);
  };

  const navigation = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "All",
      path: "/products/All",
    },
    {
      title: "Men",
      path: "/products/Mens",
    },
    {
      title: "Women",
      path: "/products/Women",
    },
    {
      title: "Kids",
      path: "/products/Kids",
    },
    {
      title: "Shoes",
      path: "/products/Shoes",
    },
    {
      title: "Accessories",
      path: "/products/Accessories",
    },
    {
      title: "Home & Living",
      path: "/products/Home&Living",
    },
  ];

  const authentication = authStatus ? (
    <ProfileDropDown />
  ) : (
    <Link to='/login' onClick={() => setMenuState(!menuState)} className='relative inline-flex items-center justify-center p-4 px-6 py-2 overflow-hidden font-medium transition duration-300 ease-out border-2 rounded-full shadow-md group'>
      <span className='absolute inset-0 flex items-center justify-center w-full h-full bg-black text-white duration-300 -translate-x-full group-hover:translate-x-0 ease'>
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M14 5l7 7m0 0l-7 7m7-7H3'></path>
        </svg>
      </span>
      <span className='absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease'>Login</span>
      <span className='relative invisible'>Login</span>
    </Link>
  );

  return (
    <nav className='bg-white border-b'>
      <div className='flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8'>
        <div className='flex-none'>
          <Link to='/'>
            <Logo />
          </Link>
        </div>
        <div className='flex-1 flex items-center justify-between'>
          <div className={`bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${menuState ? "" : "hidden"}`}>
            <ul className='mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0'>
              <div className='block lg:hidden'>
                <SearchBar />
              </div>
              {navigation.map((item, idx) => (
                <li key={idx} className='text-gray-600 px-1 whitespace-nowrap hover:text-gray-900'>
                  <Link to={item.path} onClick={() => setMenuState(!menuState)}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className='mt-4 pt-5 border-t lg:hidden'>
              {/* <ProfileDropDown /> */}
              {authentication}
            </div>
          </div>
          <div className='flex-1 flex items-center justify-end space-x-6 sm:space-x-6'>
            <div className='lg:block hidden'>
              <SearchBar />
            </div>
            <div className='relative -top-4 right-0 h-8 w-8'>
              <span className='relative flex top-2 left-6 h-4 w-4'>
                {product.length > 0 && (
                  <>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
                    <span className='relative inline-flex items-center justify-center rounded-full h-4 w-4 border-2 border-red-800 text-sm text-red-500 bg-white'>{product.length}</span>
                  </>
                )}
              </span>
              <ShoppingCartIcon onClick={cartClickHandler} className='cursor-pointer h-auto w-auto text-gray-700' />
            </div>
            <Cart open={open} setOpen={setOpen} />
            <span className='hidden lg:block'>
              {/* <ProfileDropDown  /> */}
              {authentication}
            </span>
            <button className='outline-none text-gray-400 block lg:hidden' onClick={() => setMenuState(!menuState)}>
              {menuState ? (
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              ) : (
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16m-7 6h7' />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
