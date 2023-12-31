import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { getUserData } from "../../Redux-store/authSlice";

const ProfileDropDown = (props) => {
  const [state, setState] = useState(false);
  const profileRef = useRef();
  const userData = useSelector((state) => state.authSlice.userData);
  const dispatch = useDispatch();
  const navigation = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Settings", path: "/" },
  ];

  const logOut = () => {
    dispatch(getUserData({}));
    signOut(auth);
  };

  useEffect(() => {
    const handleDropDown = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setState(false);
    };
    document.addEventListener("click", handleDropDown);
  }, []);

  return (
    <div className={`relative ${props.class}`}>
      <div className='flex items-center space-x-4'>
        <button ref={profileRef} className='w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600' onClick={() => setState(!state)}>
          <img src='https://randomuser.me/api/portraits/men/46.jpg' className='w-full h-full rounded-full' />
        </button>
        <div className='lg:hidden'>
          <span className='block'>{userData.username}</span>
          <span className='block text-sm text-gray-500'>{userData.email}</span>
        </div>
      </div>
      <ul className={`bg-white z-10 top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? "" : "lg:hidden"}`}>
        <li className='hidden lg:block lg:border-b text-gray-600 lg:hover:bg-gray-50 lg:p-2.5'>
          <span className='block font-semibold text-base'>{userData.username}</span>
          <span className='block text-sm text-gray-500'>{userData.email}</span>
        </li>
        {navigation.map((item, idx) => (
          <li key={idx}>
            <Link className='block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5' to={item.path}>
              {item.title}
            </Link>
          </li>
        ))}
        <li>
          <Link onClick={logOut} className='block lg:border-t text-gray-600 lg:hover:bg-gray-50 lg:p-2.5' to='/'>
            Log Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropDown;
