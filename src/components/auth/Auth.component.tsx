import React, { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import LoadComponent, { MetaLoad } from "../load/Load.component";
import SignInComponent from "./SignIn.component";
import SignUpComponent from "./SignUp.component";

interface InputLength {
  max: number;
  min: number;
}

export interface Sign {
  isHideClose: boolean;
  toggleForm: Function;
  closeProfile: Function;
  input: InputLength;
}

interface AuthProps {
  closeForm: Function;
  isHideBtnCLose: boolean;
}

export const AuthComponent = ({ closeForm, isHideBtnCLose }: AuthProps) => {
  const [isToggleForm, setToggleForm] = useState(true);
  const isLoad = useAppSelector((state) => state.auth.isLoad);
  const styleShadowMedium = useAppSelector((state) => state.appCommon.shadow.stylesShadow.medium);

  const INPUT_LENGTH: InputLength = {
    max: 10,
    min: 4,
  };

  const toggleForm = () => {
    setToggleForm(!isToggleForm);
  };

  const closeProfile = () => {
    closeForm();
  };

  const load: MetaLoad[] = [
    { color: "#ff0000", style: styleShadowMedium, hover: false },
    { color: "#008000", style: styleShadowMedium, hover: false },
    { color: "#0000ff", style: styleShadowMedium, hover: false },
  ];

  return (
    <div className="h-full w-full p-3 overflow-hidden relative">
      {isLoad && (
        <div className="absolute top-0 left-0 h-full w-full bg-[#bdb5b556]">
          <LoadComponent meta={load} />
        </div>
      )}
      {!isToggleForm && (
        <div id="signUp" className="h-full w-full">
          <SignUpComponent
            closeProfile={closeProfile}
            toggleForm={toggleForm}
            isHideClose={isHideBtnCLose}
            input={INPUT_LENGTH}
          />
        </div>
      )}
      {isToggleForm && (
        <div id="signIn" className="h-full w-full">
          <SignInComponent
            closeProfile={closeProfile}
            toggleForm={toggleForm}
            isHideClose={isHideBtnCLose}
            input={INPUT_LENGTH}
          />
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
