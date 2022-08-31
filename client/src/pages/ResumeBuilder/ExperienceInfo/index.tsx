/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import Select from "react-select";
import { UserExperienceService } from "src/services/userExperience.service";

const userId: any = localStorage.getItem("userId");

const employmentOptions = [
  {
    value: "Full-Time",
    label: "Full-Time",
  },
  {
    value: "Part-Time",
    label: "Part-Time",
  },
  {
    value: "Contract",
    label: "Contract",
  },
];

const UserExperienceComponent = (): JSX.Element => {
  const [experienceInformation, setExperienceInformation] = useState<any>({});
  const [selectedEmploymentOption, setSelectedEmploymentOption] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { register: register2, handleSubmit: handleSubmit2 } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      const experienceResult = await UserExperienceService.getUserExperience(
        userId
      );
      setExperienceInformation(experienceResult);
    };
    fetchData();
  }, []);

  const addExperienceInfo = async (data: {
    company: string;
    employmentType: string;
    userId: string;
  }) => {
    data.userId = userId;
    data.employmentType = selectedEmploymentOption;

    const experienceResult = await UserExperienceService.addExperience(data);
    setExperienceInformation(experienceResult);
  };

  const updateExperienceInfo = async (data: {
    company: string;
    employmentType: string;
    _id: string;
  }) => {
    data._id = experienceInformation._id;
    data.company = data.company || experienceInformation.company;
    data.employmentType = data.employmentType =
      selectedEmploymentOption || experienceInformation.employmentType;

    const experienceResult = await UserExperienceService.updateExperience(data);
    setExperienceInformation(experienceResult);
  };

  const handleEmploymentChange = (selectedOption: any) => {
    setSelectedEmploymentOption(selectedOption.value);
  };

  return (
    <>
      <div className="flex flex-col bg-white rounded shadow-lg p-12 w-1/2 mt-10 ">
        <div className=" text-black font-bold text-2xl mb-2  mx-auto">
          User Experience
        </div>

        {experienceInformation === null ? (
          <form onSubmit={handleSubmit(addExperienceInfo)}>
            <div className="relative mb-4">
              <h5 className="leading-7 text-sm font-semibold text-gray-600">
                Company Name
              </h5>
              <input
                type="text"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                {...register("company", { required: true })}
                placeholder="Company name"
              />
            </div>

            <div className="relative mb-4">
              <h5 className="leading-7 text-sm font-semibold text-gray-600">
                Employment Type
              </h5>
              <Select
                options={employmentOptions}
                onChange={handleEmploymentChange}
                placeholder="Employment Type"
              />
            </div>

            <div className="text-center">
              <input
                type="submit"
                value="Add Experience"
                className="text-white py-2 text-md w-1/2 rounded-3xl mt-2 mx-auto px-4"
                style={{
                  backgroundColor: "#DF8A40",
                }}
              />
            </div>
            <br />
          </form>
        ) : (
          <form onSubmit={handleSubmit2(updateExperienceInfo)}>
            <div className="relative mb-4">
              <h5 className="leading-7 text-sm font-semibold text-gray-600">
                Company Name
              </h5>
              <input
                type="text"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                {...register2("company", { required: true })}
                placeholder="Company Name"
                defaultValue={experienceInformation?.company || ""}
              />
            </div>

            <div className="relative mb-4">
              <h5 className="leading-7 text-sm font-semibold text-gray-600">
                Employment Type
              </h5>

              <Select
                options={employmentOptions}
                onChange={handleEmploymentChange}
                placeholder="Employment Type"
                defaultValue={experienceInformation?.employmentType || ""}
              />
            </div>

            <div className="text-center">
              <input
                type="submit"
                value="Update Experience"
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

export default UserExperienceComponent;
