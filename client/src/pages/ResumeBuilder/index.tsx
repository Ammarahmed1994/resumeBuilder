/* eslint-disable @typescript-eslint/no-unused-vars */
import { Redirect } from "react-router-dom";
import { useState } from "react";

import UserProfileComponent from "./ProfileInfo";
import UserEducationComponent from "./EducationInfo";
import UserExperienceComponent from "./ExperienceInfo";

const ResumeBuilder = (): JSX.Element => {
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setRedirect(true);
  };

  return (
    <div style={{ position: `relative` }}>
      <button
        style={{
          padding: `30px`,
          backgroundColor: `black`,
          color: `white`,
          borderRadius: `10%`,
          position: `fixed`,
          top: `10px`,
          right: `10px`,
        }}
        onClick={handleLogout}
      >
        Logout
      </button>

      <div className="flex flex-col items-center justify-center w-screen h-full bg-gray-50 text-gray-700 pb-10">
        <UserProfileComponent />
        <UserEducationComponent />
        <UserExperienceComponent />
      </div>
      {redirect && <Redirect to="/login" />}
    </div>
  );
};

export default ResumeBuilder;
