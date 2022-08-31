/* eslint-disable @typescript-eslint/no-unused-vars */
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const StartPage = (): JSX.Element => {
  const [redirect, setRedirect] = useState<boolean>(false);
  const [redirectValue, setRedirectValue] = useState<string>("");

  const handleLogin = () => {
    setRedirect(true);
    setRedirectValue("login");
  };

  const handleSignup = () => {
    setRedirect(true);
    setRedirectValue("signup");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-50 text-gray-700 -mt-40">
        <div className="flex flex-col bg-white rounded shadow-lg p-12 w-1/2">
          <div className=" text-md text-center w-full mx-auto mb-3">
            Please Login to build your resume, if you don't have an account
            please Signup first
          </div>

          <div className="mx-2 flex">
            <button
              className=" text-white py-2 text-md w-1/3 rounded-3xl mt-2 mx-auto px-4"
              style={{
                backgroundColor: "#DF8A40",
              }}
              onClick={handleLogin}
            >
              Login
            </button>

            <button
              className=" text-white py-2 text-md w-1/3 rounded-3xl mt-2 mx-auto px-4"
              style={{
                backgroundColor: "#DF8A40",
              }}
              onClick={handleSignup}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
      {redirect && <Redirect to={`/${redirectValue}`} />}
    </>
  );
};

export default StartPage;
