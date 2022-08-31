/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserProfileService } from "src/services/userprofile.service";

const userId: any = localStorage.getItem("userId");

const UserProfileComponent = (): JSX.Element => {
  const [profileInformation, setProfileInformation] = useState<any>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { register: register2, handleSubmit: handleSubmit2 } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      const profileResult = await UserProfileService.getUserProfile(userId);
      setProfileInformation(profileResult);
    };
    fetchData();
  }, []);

  const addProfileInfo = async (data: {
    name: string;
    email: string;
    userId: string;
  }) => {
    data.userId = userId;

    const profileResult = await UserProfileService.addProfile(data);
    setProfileInformation(profileResult);
  };

  const updateProfileInfo = async (data: {
    name: string;
    email: string;
    _id: string;
  }) => {
    data._id = profileInformation._id;

    const profileResult = await UserProfileService.updateProfile(data);
    setProfileInformation(profileResult);
  };

  return (
    <>
      <div className="flex flex-col bg-white rounded shadow-lg p-12 w-1/2 mt-10 ">
        <div className=" text-black font-bold text-2xl mb-2  mx-auto">
          User profile info
        </div>

        {profileInformation === null ? (
          <form onSubmit={handleSubmit(addProfileInfo)}>
            <div className="relative mb-4">
              <h5 className="leading-7 text-sm font-semibold text-gray-600">
                Full Name
              </h5>
              <input
                type="text"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                {...register("name", { required: true })}
                placeholder="Name"
              />
            </div>

            <div className="relative mb-4">
              <h5 className="leading-7 text-sm font-semibold text-gray-600">
                Email
              </h5>
              <input
                type="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                {...register("email", { required: true })}
                placeholder="Email"
              />
            </div>
            <div className="text-center">
              <input
                type="submit"
                value="Add Info"
                className="text-white py-2 text-md w-1/2 rounded-3xl mt-2 mx-auto px-4"
                style={{
                  backgroundColor: "#DF8A40",
                }}
              />
            </div>
            <br />
          </form>
        ) : (
          <form onSubmit={handleSubmit2(updateProfileInfo)}>
            <div className="relative mb-4">
              <h5 className="leading-7 text-sm font-semibold text-gray-600">
                Full Name
              </h5>
              <input
                type="text"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                {...register2("name", { required: true })}
                placeholder="Name"
                defaultValue={profileInformation?.name || ""}
              />
            </div>

            <div className="relative mb-4">
              <h5 className="leading-7 text-sm font-semibold text-gray-600">
                Email
              </h5>
              <input
                type="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                {...register2("email", { required: true })}
                placeholder="Email"
                defaultValue={profileInformation?.email || ``}
              />
            </div>
            <div className="text-center">
              <input
                type="submit"
                value="Update Info"
                className="text-white py-2 text-md w-1/2 rounded-3xl mt-2 mx-auto px-4"
                style={{
                  backgroundColor: "#DF8A40",
                }}
              />
            </div>
            <br />
          </form>
        )}
      </div>
    </>
  );
};

export default UserProfileComponent;
