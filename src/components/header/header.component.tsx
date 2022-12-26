import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleNeon } from "../../store/slices/neon.slice";
import { builderNeonBox, builderNeonText } from "../../store/slices/shadow.slice";
import NavigationComponent from "./Navigation.component";
import { IProjectItem, URL_FRAMEWORKS } from "../../env";
import style from "./Header.module.scss";

const HeaderComponent = () => {
  const dispatch = useAppDispatch();

  const isNeon = useAppSelector((state) => state.appCommon.neon.value);
  const { frameWork } = useAppSelector((state) => state.aboutMe.aboutMe);

  const { medium: shadowMedium, light: shadowLight } = useAppSelector((state) => state.appCommon.shadow.stylesShadow);
  const { redNeon, greenNeon, blueNeon } = useAppSelector((state) => state.appCommon.shadow);

  const colorBoxNeon = "#00c3ff";

  const [isHamburger, setIsHamburger] = useState(true);

  const projects = Object.values(URL_FRAMEWORKS);

  const transformIcon = (): string => (isNeon ? "lightbulb" : "lightbulb_outline");
  const isCurrFramework = (title: string) => (!!frameWork ? frameWork.includes(title) : false);
  const link = (item: IProjectItem) => (isCurrFramework(item.title) ? undefined : item.link);

  const colorFramework = (framework: string): string => {
    switch (framework) {
      case URL_FRAMEWORKS.react.title:
        return blueNeon;
      case URL_FRAMEWORKS.angular.title:
        return redNeon;
      case URL_FRAMEWORKS.vue.title:
        return greenNeon;
      default:
        return "";
    }
  };

  return (
    <div className="px-2 md:px-3 xl:px-4 h-full w-full relative z-50">
      <div className={`h-full w-full flex flex-row justify-between items-center text-white ${style.fonts}`}>
        <div
          className={`transition-all duration-500 tracking-[1px] text-xl md:text-2xl capitalize px-3 py-[2px] 
          border-solid border-t-2 border-x-2 border-b-2 border-[#00c3ff] rounded-t-lg rounded-b-lg hover:rounded-b-none 
          relative ${style.project}`}
          style={builderNeonBox(shadowLight, "#00c3ff", false, isNeon)}
        >
          <div className={`${style.flicker} transition-all duration-200 ${style.project__title}`}>anydea</div>
          <div
            className={`absolute top-full left-0 w-full flex flex-col gap-y-2 bg-main-bg 
            border-2 border-solid border-[#00c3ff] rounded-bl-lg rounded-br-lg transition-all duration-200 
            ${style["project__items"]}`}
            style={builderNeonBox(shadowLight, colorBoxNeon, false, isNeon)}
          >
            {projects.map((item) => (
              <a
                key={item.title}
                onMouseEnter={(event) => {
                  const neonText = builderNeonText(shadowLight, colorFramework(item.title), true, isNeon);
                  event.currentTarget.style.textShadow = neonText.textShadow;
                  event.currentTarget.style.color = neonText.color;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.textShadow = "";
                  event.currentTarget.style.color = "";
                }}
                className={`text-center transition-all duration-200 
                ${isCurrFramework(item.title) ? "cursor-not-allowed" : ""}`}
                href={link(item)}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
        <div className="flex-auto h-full w-full hidden md:block">
          <NavigationComponent />
        </div>
        <div className="">
          <button
            style={builderNeonText(shadowMedium, "#fff", true, isNeon)}
            onClick={() => dispatch(toggleNeon())}
            className="btn-neon border-[3px] border-white w-[70px] h-9 relative rounded-2xl overflow-hidden"
          >
            <i
              style={{
                fontSize: "25px",
                height: "25px",
                width: "25px",
              }}
              className={`material-icons absolute top-1/2 left-0 -translate-y-1/2 transition-all ease-in duration-150 
              ${!isNeon ? "left-[80%] -translate-x-1/2" : ""}`}
            >
              {transformIcon()}
            </i>
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsHamburger((prev) => !prev)} className="btn-hambr flex flex-col gap-y-2 relative">
            <div
              style={builderNeonBox(shadowLight, colorBoxNeon, false, isNeon)}
              className={`h-1 w-10 bg-white transition-all duration-300 
              ${style["hambuger-line-1"]} ${!isHamburger ? "translate-x-0 translate-y-[12px] -rotate-[45deg]" : ""}`}
            ></div>
            <div
              style={builderNeonBox(shadowLight, colorBoxNeon, false, isNeon)}
              className={`h-1 w-10 bg-white transition-all duration-300  
              ${style["hambuger-line-2"]} ${!isHamburger ? "scale-0" : ""}`}
            ></div>
            <div
              style={builderNeonBox(shadowLight, colorBoxNeon, false, isNeon)}
              className={`h-1 w-10 bg-white transition-all duration-300  
              ${style["hambuger-line-3"]} ${!isHamburger ? "translate-x-0 -translate-y-[12px] rotate-[45deg]" : ""}`}
            ></div>
          </button>
        </div>
      </div>
      <div
        className={`absolute top-full -left-0 -right-0 h-full md:hidden bg-main-bg transition-all duration-[600ms] ease-out ${
          isHamburger ? "top-[-150px]" : "top-[70px]"
        }`}
      >
        <NavigationComponent />
      </div>
    </div>
  );
};

export default HeaderComponent;
