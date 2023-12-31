import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import Logo from "../Logo/Logo";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState(null)
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    try {
      setValidation(null)
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setValidation(error.code);
    }
  };

  return (
    <div className='relative overflow-hidden'>
      <button onClick={() => navigate("/")} className='container absolute flex lg:w-4/5 text-xl gap-1 px-10 py-5 mx-auto'>
        <ChevronDoubleLeftIcon className='w-4 self-center h-4' /> Back
      </button>
      <div className='mx-auto max-w-screen-md py-12 px-4 sm:px-6 md:max-w-screen-xl md:py-20 lg:py-32 md:px-8'>
        <div className='md:pe-8 md:w-1/2 xl:pe-0 xl:w-5/12'>
          {/* <!-- Title --> */}
          <div className='flex justify-center'>
            <Logo />
          </div>
          <div className='mt-5 text-center'>
            <p className='text-gray-600'>
              Don't have an account?
              <Link to='/signup' className='whitespace-nowrap font-semibold text-gray-800 underline underline-offset-4'>
                Sign up here.
              </Link>
            </p>
          </div>

          {/* <!-- End Title --> */}
          {validation && <p className="text-center text-red-500">{validation}</p>}
          {/* <!-- Form --> */}
          <form>
            <div className='mb-4 mt-8'>
              <label htmlFor='hs-hero-email-2' className='block text-sm font-medium dark:text-white'>
                <span className='sr-only'>Email address</span>
              </label>
              <input type='email' id='hs-hero-email-2' onChange={(e) => setEmail(e.target.value)} className='py-3 px-4 block w-full border border-gray-500 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none' placeholder='Email address' />
            </div>

            <div className='mb-4'>
              <label htmlFor='hs-hero-password-2' className='block text-sm font-medium dark:text-white'>
                <span className='sr-only'>Password</span>
              </label>
              <input type='password' id='hs-hero-password-2' onChange={(e) => setPassword(e.target.value)} className='py-3 px-4 block w-full border border-gray-500 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none' placeholder='Password' />
            </div>
            <div className='my-3'>
              <span className='ml-3 text-sm'>
                <p className='inline-block' htmlFor='remember-me'>
                  By signing up you are agreeing to our
                  <a className='underline' href='#'>
                    Terms and Conditions
                  </a>
                </p>
              </span>
            </div>

            <div className='grid'>
              <button onClick={signIn} className='py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                Login
              </button>
            </div>

            <div className='flex mt-4 items-center justify-between'>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input id='remember' aria-describedby='remember' type='checkbox' className='w-4 h-4 border border-gray-500 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' required='' />
                </div>
                <div className='ml-3 text-sm'>
                  <label htmlFor='remember'>Remember me</label>
                </div>
              </div>
              <a href='#' className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'>
                Forgot password?
              </a>
            </div>
          </form>

          <div className='py-6 flex items-center text-sm text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:me-6 after:flex-[1_1_0%] after:border-t after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600'>Or</div>

          <div className='grid'>
            <button type='button' className='py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-500 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none'>
              <svg className='w-4 h-auto' width='46' height='47' viewBox='0 0 46 47' fill='none'>
                <path d='M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z' fill='#4285F4' />
                <path d='M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z' fill='#34A853' />
                <path d='M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z' fill='#FBBC05' />
                <path d='M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z' fill='#EB4335' />
              </svg>
              Login with Google
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block md:absolute md:top-0 md:start-1/2 md:end-0 h-full bg-[url('https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-center bg-cover"></div>
    </div>
  );
}

export default Login;
