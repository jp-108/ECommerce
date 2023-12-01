import React from "react";
import Login from "../components/Authentication/Login";
function LoginPage() {
  return (
    <>
      <div className='absolute overflow-hidden bg-white w-screen max-h-screen top-0 z-50'>
        <Login />
      </div>
    </>
  );
}

export default LoginPage;
