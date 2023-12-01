import React from "react";
import Signup from "../components/Authentication/Signup";
function SignupPage() {
  return (
    <>
      <div className='absolute overflow-hidden bg-white w-screen max-h-screen top-0 z-50'>
        <Signup />
      </div>
    </>
  );
}

export default SignupPage;
