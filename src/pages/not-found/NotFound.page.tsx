import React from "react";
import { useAppSelector } from "../../hooks/redux";
import style from "./NotFound.module.scss";

const NotFoundPage = () => {
  const isNeon = useAppSelector((state) => state.appCommon.neon.value);

  return (
    <div className="h-full w-full flex flex-col gap-y-2 justify-center items-center text-white">
      <div className={`text-7xl text-code ${isNeon ? style["text-neon-flicker"] : ""}`}>404</div>
      <div className={`uppercase text-5xl text-title  ${isNeon ? style["text-neon-flicker"] : ""}`}>page not found</div>
    </div>
  );
};

export default NotFoundPage;
