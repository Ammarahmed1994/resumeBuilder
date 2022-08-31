import { Redirect } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthService } from "src/services/auth.service";

const SignUp = (): JSX.Element => {
  const [redirect, setRedirect] = useState<boolean>(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: { username: string; password: string }) => {
    await AuthService.userSignup(data);
    setRedirect(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-50 text-gray-700 ">
        <div className="flex flex-col bg-white rounded shadow-lg p-12 w-1/2">
          <div className=" text-blue-600 font-bold text-2xl mb-2 mx-auto">
            SIGN Up NOW
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-4">
              <h5 className="leading-7 text-sm font-semibold text-gray-600">
                Username
              </h5>
              <input
                type="text"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                {...register("username", { required: true })}
                placeholder="Username"
              />
            </div>

            <div className="relative mb-4">
              <h5 className="leading-7 text-sm font-semibold text-gray-600">
                Password
              </h5>
              <input
                type="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                {...register("password", { required: true })}
                placeholder="Password"
              />
            </div>
            <div className="text-center">
              <input
                type="submit"
                value="Login"
                className="text-white py-2 text-md w-1/3 rounded-3xl mt-2 mx-auto px-4"
                style={{
                  backgroundColor: "#DF8A40",
                }}
              />
            </div>
            <br />
          </form>
        </div>
      </div>
      {redirect && <Redirect to="/login" />}
    </>
  );
};

export default SignUp;
