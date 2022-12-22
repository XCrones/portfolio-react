import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleHideAboutProject } from "../../store/slices/aboutProjectSlice";
import textShadow, { ITextShadow } from "../ui/textShadow";
import classes from "./AboutProject.module.scss";

export interface IAboutProject {
  title?: string;
  subtitle?: string[];
  nameProject?: string;
}

export interface Info {
  about: IAboutProject[];
}

const AboutProjectComponent = (props: Info) => {
  const isNeon = useAppSelector((state) => state.appCommon.neon.value);
  const styleShadowLight = useAppSelector((state) => state.appCommon.shadow.stylesShadow.light);

  const dispatch = useAppDispatch();

  const [tempData, setTempData] = useState<IAboutProject[]>([]);
  const [nameProject, setNameProject] = useState<string>("undefined");
  const [isHoverBtn, setIsHoverBtn] = useState(false);

  const deleteNameProject = (arr: IAboutProject[]) => {
    let tempIndex = arr.findIndex((value) => typeof value["nameProject"] !== "undefined");
    setNameProject(tempIndex === -1 ? "undefined" : String(props.about[tempIndex].nameProject));
    if (tempIndex !== -1) {
      const arr: IAboutProject[] = [...props.about];
      arr.splice(tempIndex, 1);
      setTempData(arr);
    }
  };

  const textNeonBtn: ITextShadow = {
    color: "#fff",
    colorShadow: "#fff",
    isNeon: isNeon,
    isSetColor: true,
    styleShadow: styleShadowLight,
    activeHover: true,
    isHover: isHoverBtn,
  };

  useEffect(() => {
    deleteNameProject(props.about);
    return () => {};
  }, []);

  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full sm:w-3/5 lg:w-2/5 xl:w-2/5 bg-[rgba(31,39,56,0.98)] rounded-2xl">
      <div className="h-full w-full flex flex-col p-2 gap-y-1">
        <div className="flex flex-row">
          <div className="flex-auto h-full w-full text-center first-letter:uppercase text-sm sm:text-base">
            представляю вам проект:
            <div className="underline underline-offset-4 block sm:inline-block">"{nameProject}"</div>
          </div>
          <div className="flex-[0_1_40px]">
            <button
              onMouseEnter={() => setIsHoverBtn(true)}
              onMouseLeave={() => setIsHoverBtn(false)}
              style={textShadow(textNeonBtn)}
              onClick={() => dispatch(toggleHideAboutProject())}
              type="button"
              className="w-full h-full flex justify-center items-center transition-all duration-500 text-2xl"
            >
              <i className="bi bi-x-octagon"></i>
            </button>
          </div>
        </div>
        <div className={classes["fonts"]}>
          {tempData.map((value, idx) => (
            <div key={idx} className="">
              <div className="flex flex-row pl-1 gap-x-1 items-center">
                <div className="text-xs">
                  <i className="bi bi-circle-fill text-sky-500"></i>
                </div>
                <div className="first-letter:uppercase text-[15px] sm:text-[16px]">
                  {value.title}
                  {value.subtitle && <span className="">&nbsp;:</span>}
                  {!value.subtitle && <span className="">.</span>}
                </div>
              </div>
              <div className="leading-4 flex flex-col gap-y-0.5">
                {value.subtitle?.map((subtitle, index) => (
                  <div key={index} className="flex flex-row pl-5 gap-x-1 items-center">
                    <div className="text-xs">
                      <i className="bi bi-circle-fill text-green-500"></i>
                    </div>
                    <div className="flex-auto text-[15px] sm:text-[16px]">{subtitle}&nbsp;;</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutProjectComponent;
