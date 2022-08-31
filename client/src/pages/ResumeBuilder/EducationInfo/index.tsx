/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserEducationService } from "src/services/userEducation.service";
import moment from "moment";

const userId: any = localStorage.getItem("userId");

const UserEducationComponent = (): JSX.Element => {
  const [educationInformation, setEducationInformation] = useState<any>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { register: register2, handleSubmit: handleSubmit2 } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      const educationResult = await UserEducationService.getUserEducation(
        userId
      );
      setEducationInformation(educationResult);
    };
    fetchData();
  }, []);

  const addEducationInfo = async (data: {
    name: string;
    email: string;
    userId: string;
  }) => {
    data.userId = userId;

    const educationResult = await UserEducationService.addEducation(data);

    setEducationInformation(educationResult);
  };

  const updateEducationInfo = async (data: {
    university: string;
    startDate: string;
    endDate: string;
    _id: string;
  }) => {
    data._id = educationInformation._id;
    data.university = data.university || educationInformation.university;
    data.startDate = data.startDate || educationInformation.startDate;
    data.endDate = data.endDate || educationInformation.endDate;

    const educationResult = await UserEducationService.updateEducation(data);
    setEducationInformation(educationResult);
  };

  return (
    <>
      <div className="flex flex-col bg-white rounded shadow-lg p-12 w-1/2 mt-10 ">
        <div className=" text-black font-bold text-2xl mb-2  mx-auto">
          User Education
        </div>

        {educationInformation === null ? (
          <form onSubmit={handleSubmit(addEducationInfo)}>
            <div className="relative mb-4">
              <h5 className="leading-7 text-sm font-semibold text-gray-600">
                University Name
              </h5>
              <input
                type="text"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                {...register("university", { required: true })}
                placeholder="University"
              />
            </div>

            <div className="relative mb-4">
              <h5 className="leading-7 text-sm font-semibold text-gray-600">
                Start Date
              </h5>
              <input
                type="text"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                {...register("startDate", { required: true })}
                placeholder="Start date"
                defaultValue={educationInformation?.startDate || ""}
              />
            </div>

            <div className="relative mb-4">
              <h5 className="leading-7 text-sm font-semibold text-gray-600">
                End Date
              </h5>
              <input
                type="text"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                {...register("endDate", { required: true })}
                placeholder="End date"
                defaultValue={educationInformation?.endDate || ""}
              />
            </div>

            <div className="text-center">
              <input
                type="submit"
                value="Add Education"
                className="text-white py-2 text-md w-1/2 rounded-3xl mt-2 mx-auto px-4"
                style={{
                  backgroundColor: "#DF8A40",
                }}
              />
            </div>
            <br />
          </form>
        ) : (
          <form onSubmit={handleSubmit2(updateEducationInfo)}>
            <div className="relative mb-4">
              <h5 className="leading-7 text-sm font-semibold text-gray-600">
                University Name
              </h5>
              <input
                type="text"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                {...register2("university", { required: true })}
                placeholder="University Name"
                defaultValue={educationInformation?.university || ""}
              />
            </div>

            <div className="relative mb-4">
              <h5 className="leading-7 text-sm font-semibold text-gray-600">
                Start Date
              </h5>
              <input
                type="text"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                {...register2("startDate", { required: true })}
                placeholder="start date"
                defaultValue={educationInformation?.startDate || ""}
              />
            </div>

            <div className="relative mb-4">
              <h5 className="leading-7 text-sm font-semibold text-gray-600">
                End Date
              </h5>
              <input
                type="text"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                {...register2("endDate", { required: true })}
                placeholder="End date"
                defaultValue={educationInformation?.endDate || ""}
              />
            </div>

            <div className="text-center">
              <input
                type="submit"
                value="Update Education"
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

export default UserEducationComponent;
