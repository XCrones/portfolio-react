import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { builderNeonBox, builderNeonText } from "../../store/slices/shadow.slice";

const style = {
  fontFamily: '"Fjalla One", sans-serif',
};

const PreloadComponent = () => {
  const isNeon = useAppSelector((state) => state.appCommon.neon.value);
  const shadowLight = useAppSelector((state) => state.appCommon.shadow.stylesShadow.light);
  const shadowMedium = useAppSelector((state) => state.appCommon.shadow.stylesShadow.medium);

  const [isHide, setHide] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTitleMove, setTitleMove] = useState(false);

  const title = String(window.location.pathname.replace(/\/projects\//gi, ""));

  const isHideComponent = (isHide: boolean) => (isHide ? "opacity-0 z-[-1]" : "opacity-1");

  const hideComponent = () => {
    setTimeout(() => {
      setHide(true);
    }, 1400);
  };

  const moveUpTitle = () => {
    setTimeout(() => {
      setTitleMove(true);
    }, 200);
  };

  const startProgress = () => {
    setTimeout(() => {
      moveUpTitle();
      setProgress(100);
    }, 400);
  };

  useEffect(() => {
    hideComponent();
    startProgress();
  }, []);

  return (
    <div
      style={style}
      className={`z-50 fixed top-0 left-0 min-h-screen h-full w-full transition-all duration-200 bg-main-bg main-bg 
      ${isHideComponent(isHide)}`}
    >
      <div className="w-full h-full relative">
        <div
          style={{ top: isTitleMove ? "50px" : "50", ...builderNeonText(shadowMedium, "#ffff", true, isNeon) }}
          className={`absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 
                      uppercase text-4xl md:text-6xl tracking-[3px] transition-all easy-[cubic-bezier(0.54,1.65,0.08,0.89)] duration-1000`}
        >
          {title}
        </div>
      </div>
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-64 border border-solid border-emerald-200 rounded-md">
        <div className="relative h-full w-full">
          <div
            style={{ width: `${progress}%`, ...builderNeonBox(shadowLight, "#fff", false, isNeon) }}
            className="h-full w-full bg-cyan-200 rounded-md transition-all duration-700"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PreloadComponent;
