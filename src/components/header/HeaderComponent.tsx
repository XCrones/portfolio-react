import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleNeon } from "../../store/slices/neonSlice";
import boxShadow, { IBoxShadow } from "../ui/boxShadow";
import textShadow, { ITextShadow } from "../ui/textShadow";
import styles from "./HeaderComponent.module.scss";
import NavigationComponent from "./NavigationComponent";

interface IProjectItem {
  title: string;
  link: string;
}

const HeaderComponent = () => {
  const [isHamburger, setIsHamburger] = useState(true);

  const isNeon = useAppSelector((state) => state.appCommon.neon.value);
  const styleShadowMedium = useAppSelector((state) => state.appCommon.shadow.stylesShadow.medium);
  const styleShadowLight = useAppSelector((state) => state.appCommon.shadow.stylesShadow.light);
  const { frameWork } = useAppSelector((state) => state.aboutMe.aboutMe);

  const dispatch = useAppDispatch();

  const textNeonLinks: ITextShadow = {
    color: "#fff",
    colorShadow: "#fff",
    isNeon: isNeon,
    isSetColor: true,
    styleShadow: styleShadowMedium,
    activeHover: false,
    isHover: false,
  };

  const materialIcons = {
    fontSize: "25px",
    height: "25px",
    width: "25px",
  };

  const boxNeon: IBoxShadow = {
    style: styleShadowLight,
    color: "#00c3ff",
    isNeon: isNeon,
    activeHover: false,
    isHover: false,
  };

  const projects: IProjectItem[] = [
    {
      title: "angular",
      link: "https://any-dea-angular.web.app",
    },
    {
      title: "react",
      link: "https://anydea-react.web.app",
    },
    {
      title: "vue",
      link: "https://anydea-vue.web.app/",
    },
  ];

  const transformIcon = (): string => (isNeon ? "lightbulb" : "lightbulb_outline");

  const MakeLink = (props: IProjectItem) => {
    const isCurrFramework = !!frameWork ? frameWork.includes(props.title) : false;
    const link = isCurrFramework ? undefined : props.link;

    return (
      <a
        className={`text-center transition-all duration-200 ${isCurrFramework ? "cursor-not-allowed" : ""}`}
        href={link}
      >
        {props.title}
      </a>
    );
  };

  return (
    <div className="px-2 md:px-3 xl:px-4 h-full w-full relative z-50">
      <div className={`h-full w-full flex flex-row justify-between items-center text-white ${styles["fonts"]}`}>
        <div
          className={`transition-all duration-500 tracking-[1px] text-xl md:text-2xl capitalize px-3 py-[2px] 
          border-solid border-t-2 border-x-2 border-b-2 border-[#00c3ff] rounded-t-lg rounded-b-lg hover:rounded-b-none 
          relative ${styles["project"]}`}
          style={boxShadow(boxNeon)}
        >
          <div className={`${styles["flicker"]} transition-all duration-200 ${styles["project__title"]}`}>anydea</div>
          <div
            className={`absolute top-full left-0 w-full flex flex-col gap-y-2 bg-main-bg 
            border-2 border-solid border-[#00c3ff] rounded-bl-lg rounded-br-lg transition-all duration-200 
            ${styles["project__items"]}`}
            style={boxShadow(boxNeon)}
          >
            {projects.map((item) => (
              <MakeLink link={item.link} title={item.title} key={item.title} />
            ))}
          </div>
        </div>
        <div className="flex-auto h-full w-full hidden md:block">
          <NavigationComponent />
        </div>
        <div className="">
          <button
            style={textShadow(textNeonLinks)}
            onClick={() => dispatch(toggleNeon())}
            className="btn-neon border-[3px] border-white w-[70px] h-9 relative rounded-2xl overflow-hidden"
          >
            <i
              style={materialIcons}
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
              style={boxShadow(boxNeon)}
              className={`h-1 w-10 bg-white transition-all duration-300 
              ${styles["hambuger-line-1"]} ${!isHamburger ? "translate-x-0 translate-y-[12px] -rotate-[45deg]" : ""}`}
            ></div>
            <div
              style={boxShadow(boxNeon)}
              className={`h-1 w-10 bg-white transition-all duration-300  
              ${styles["hambuger-line-2"]} ${!isHamburger ? "scale-0" : ""}`}
            ></div>
            <div
              style={boxShadow(boxNeon)}
              className={`h-1 w-10 bg-white transition-all duration-300  
              ${styles["hambuger-line-3"]} ${!isHamburger ? "translate-x-0 -translate-y-[12px] rotate-[45deg]" : ""}`}
            ></div>
          </button>
        </div>
      </div>
      <div
        className={`absolute top-full -left-0 -right-0 h-full md:hidden bg-[#1f2738] transition-all duration-[600ms] ease-out ${
          isHamburger ? "top-[-150px]" : "top-[70px]"
        }`}
      >
        <NavigationComponent />
      </div>
    </div>
  );
};

export default HeaderComponent;
