import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleHideAboutProject } from "../../store/slices/aboutProjectSlice";
import { toggleHideHeader } from "../../store/slices/headerSlice";
import boxShadow, { IBoxShadow } from "../ui/boxShadow";
import rotateShadow, { IRotateShadow } from "../ui/rotateShadow";
import textShadow, { ITextShadow } from "../ui/textShadow";
import classes from "./ProjectMenu.module.scss";

export interface IMenuProject {
  link: string;
  title: string;
  color: string;
}

const ProjectMenuComponent = (metaData: IMenuProject) => {
  const styleShadowLight = useAppSelector((state) => state.appCommon.shadow.stylesShadow.light);
  const blueNeon = useAppSelector((state) => state.appCommon.shadow.blueNeon);
  const isNeon = useAppSelector((state) => state.appCommon.neon.value);
  const isHideHeader = useAppSelector((state) => state.header.isHide);
  const isHideABout = useAppSelector((state) => state.appCommon.aboutProject.isHide);

  const [isHoverNavBack, setIsHoverNavBack] = useState(false);
  const [isHoverHeader, setIsHoverHeader] = useState(false);
  const [isHoverAbout, setIsHoverAbout] = useState(false);
  const [isHoverLink, setIsHoverLink] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const boxNeon: IBoxShadow = {
    style: styleShadowLight,
    color: metaData.color,
    isNeon: isNeon,
    activeHover: false,
    isHover: false,
  };

  const textNeonNavBack: ITextShadow = {
    color: blueNeon,
    colorShadow: metaData.color,
    isNeon: isNeon,
    isSetColor: true,
    styleShadow: styleShadowLight,
    activeHover: true,
    isHover: isHoverNavBack,
  };

  const rotateNeonHeader: IRotateShadow = {
    color: blueNeon,
    colorShadow: metaData.color,
    styleShadow: styleShadowLight,
    isRotate: !isHideHeader,
    isNeon: isNeon,
    activeHover: true,
    isHover: isHoverHeader,
    isSetColor: true,
  };

  const rotateNeonAbout: IRotateShadow = {
    color: blueNeon,
    colorShadow: metaData.color,
    styleShadow: styleShadowLight,
    isRotate: !isHideABout,
    isNeon: isNeon,
    activeHover: true,
    isHover: isHoverAbout,
    isSetColor: true,
  };

  const textNeonLink: ITextShadow = {
    color: blueNeon,
    colorShadow: metaData.color,
    isNeon: isNeon,
    isSetColor: true,
    styleShadow: styleShadowLight,
    activeHover: true,
    isHover: isHoverLink,
  };

  return (
    <div className="flex flex-row justify-between items-center py-4 px-2">
      <div className="p-1">
        <button
          onMouseEnter={() => setIsHoverNavBack(true)}
          onMouseLeave={() => setIsHoverNavBack(false)}
          style={{ ...boxShadow(boxNeon), ...textShadow(textNeonNavBack) }}
          onClick={() => navigate("/projects")}
          className="btn-back h-[35px] md:h-[50px] w-[50px] md:w-[70px] transition-all duration-300 border-2 border-solid border-sky-500 rounded-xl md:rounded-2xl"
        >
          <i className="bi bi-arrow-left text-2xl md:text-4xl"></i>
        </button>
      </div>
      <div className="uppercase gap-x-1 md:gap-x-3 select-none text-2xl md:text-4xl">
        <span className={`${classes["title"]} inline-block tracking-[2px] pr-1 md:pr-2`}>{metaData.title}</span>
        <button
          onMouseEnter={() => setIsHoverHeader(true)}
          onMouseLeave={() => setIsHoverHeader(false)}
          onClick={() => dispatch(toggleHideHeader())}
          style={rotateShadow(rotateNeonHeader)}
          className="btn-hide inline-block w-[36px] h-[36px] transition-all duration-300"
        >
          <i className="bi bi-chevron-double-down leading-2"></i>
        </button>
      </div>
      <div className="text-2xl md:text-3xl">
        <button
          onClick={() => dispatch(toggleHideAboutProject())}
          onMouseEnter={() => setIsHoverAbout(true)}
          onMouseLeave={() => setIsHoverAbout(false)}
          style={rotateShadow(rotateNeonAbout)}
          className="btn-about inline-block w-[30px] h-[30px] transition-all duration-300 leading-4 mr-1 md:mr-2"
        >
          <i className="bi bi-info-circle"></i>
        </button>
        {/*v-textShadow="metaTextShadow" */}
        <a
          onMouseEnter={() => setIsHoverLink(true)}
          onMouseLeave={() => setIsHoverLink(false)}
          style={textShadow(textNeonLink)}
          href={metaData.link}
          className="inline-block w-[30px] h-[30px] transition-all duration-300 leading-4"
        >
          <i className="bi bi-link-45deg"></i>
        </a>
      </div>
    </div>
  );
};

export default ProjectMenuComponent;
