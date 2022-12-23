import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ROUTER_LINKS } from "../../router-links";
import { toggleHideAboutProject } from "../../store/slices/about-projects.slice";
import { toggleHideHeader } from "../../store/slices/header.slice";
import { builderNeonBox, builderNeonText } from "../../store/slices/shadow.slice";
import style from "./project-menu.module.scss";

export interface IPropsMenuProject {
  link: string;
  title: string;
}

const ProjectMenuComponent = (metaData: IPropsMenuProject) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const shadowLight = useAppSelector((state) => state.appCommon.shadow.stylesShadow.light);
  const blueNeon = useAppSelector((state) => state.appCommon.shadow.blueNeon);
  const isNeon = useAppSelector((state) => state.appCommon.neon.value);
  const isHideHeader = useAppSelector((state) => state.header.isHide);
  const isHideABout = useAppSelector((state) => state.appCommon.aboutProject.isHide);

  const colorNeonBox = "#00c3ff";

  return (
    <div className="flex flex-row justify-between items-center py-4 px-2">
      <div className="p-1">
        <button
          onClick={() => navigate(ROUTER_LINKS.projects.link)}
          onMouseEnter={(event) => {
            const neonText = builderNeonText(shadowLight, blueNeon, true, isNeon);
            event.currentTarget.style.textShadow = neonText.textShadow;
            event.currentTarget.style.color = neonText.color;
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.textShadow = "";
            event.currentTarget.style.color = "#fff";
          }}
          style={builderNeonBox(shadowLight, colorNeonBox, false, isNeon)}
          className={`btn-back h-[35px] md:h-[50px] w-[50px] md:w-[70px] transition-all duration-300 
          border-2 border-solid border-sky-500 rounded-xl md:rounded-2xl`}
        >
          <i className="bi bi-arrow-left text-2xl md:text-4xl"></i>
        </button>
      </div>
      <div className="uppercase gap-x-1 md:gap-x-3 select-none text-2xl md:text-4xl">
        <span className={`${style.title} inline-block tracking-[2px] pr-1 md:pr-2`}>{metaData.title}</span>
        <button
          onClick={() => dispatch(toggleHideHeader())}
          onMouseEnter={(event) => {
            const neonText = builderNeonText(shadowLight, blueNeon, true, isNeon);
            if (isHideHeader) {
              event.currentTarget.style.textShadow = neonText.textShadow;
              event.currentTarget.style.color = neonText.color;
            }
          }}
          onMouseLeave={(event) => {
            if (isHideHeader) {
              event.currentTarget.style.textShadow = "";
              event.currentTarget.style.color = "";
            }
          }}
          style={{
            transform: !isHideHeader ? "rotate(-180deg)" : "rotate(0deg)",
            ...builderNeonText(shadowLight, blueNeon, !isHideHeader, isNeon && !isHideHeader),
            textShadow: !isHideHeader ? builderNeonText(shadowLight, colorNeonBox, true, isNeon).textShadow : "",
          }}
          className="btn-hide inline-block w-[36px] h-[36px] transition-all duration-300"
        >
          <i className="bi bi-chevron-double-down leading-2"></i>
        </button>
      </div>
      <div className="text-2xl md:text-3xl">
        <button
          onClick={() => dispatch(toggleHideAboutProject())}
          onMouseEnter={(event) => {
            const neonText = builderNeonText(shadowLight, blueNeon, true, isNeon);
            if (isHideABout) {
              event.currentTarget.style.textShadow = neonText.textShadow;
              event.currentTarget.style.color = neonText.color;
            }
          }}
          onMouseLeave={(event) => {
            if (isHideABout) {
              event.currentTarget.style.textShadow = "";
              event.currentTarget.style.color = "";
            }
          }}
          style={{
            transform: !isHideABout ? "rotate(-180deg)" : "rotate(0deg)",
            ...builderNeonText(shadowLight, blueNeon, !isHideABout, isNeon && !isHideABout),
            textShadow: !isHideABout ? builderNeonText(shadowLight, colorNeonBox, true, isNeon).textShadow : "",
          }}
          className="btn-about inline-block w-[30px] h-[30px] transition-all duration-300 leading-4 mr-1 md:mr-2"
        >
          <i className="bi bi-info-circle"></i>
        </button>
        <a
          href={metaData.link}
          onMouseEnter={(event) => {
            const neonText = builderNeonText(shadowLight, blueNeon, true, isNeon);
            event.currentTarget.style.textShadow = neonText.textShadow;
            event.currentTarget.style.color = neonText.color;
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.textShadow = "";
            event.currentTarget.style.color = "#fff";
          }}
          className="inline-block w-[30px] h-[30px] transition-all duration-300 leading-4"
        >
          <i className="bi bi-link-45deg"></i>
        </a>
      </div>
    </div>
  );
};

export default ProjectMenuComponent;
