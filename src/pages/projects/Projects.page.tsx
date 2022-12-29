import React from "react";
import { Link, Outlet } from "react-router-dom";
import PreloadComponent from "../../components/preload/Preload.component";
import { useAppSelector } from "../../hooks/redux";
import { ROUTER_LINKS } from "../../router-links";
import style from "./Projects.module.scss";

const ProjectsPage = () => {
  const isHideLinks = useAppSelector((state) => state.appCommon.projects.isHide);

  const projects = Object.values(ROUTER_LINKS.projects.children);

  const projectIcon = (projectTitle: string) => {
    switch (projectTitle) {
      case ROUTER_LINKS.projects.children.todo.title:
        return "checklist";
      case ROUTER_LINKS.projects.children.shop.title:
        return "shopping_cart_checkout";
      case ROUTER_LINKS.projects.children.chat.title:
        return "chat";
      default:
        return "menu_book";
    }
  };

  return (
    <div className="flex-[1_1_100%] h-full w-full text-white">
      {!isHideLinks && (
        <div
          className={`h-full w-full flex flex-col md:flex-row justify-center items-center 
          gap-y-5 py-4 md:py-0 md:gap-x-10 ${style["projects-items"]}`}
        >
          {projects.map((project) => (
            <Link
              key={project.link}
              className={`flex flex-col gap-y-8 justify-center items-center
              border-solid border border-white rounded-2xl pl-16 pr-9 py-16 relative 
              hover:-translate-x-[25%] md:hover:-translate-x-0 md:hover:-translate-y-10 ${style.shadow} ${style.link}`}
              to={`/projects/${project.link}`}
            >
              <span className={`text-center uppercase text-2xl relative ${style.link__title}`}>{project.title}</span>
              <i className={`material-icons w-[64px] text-center !text-6xl ${style["material-icons"]}`}>
                {projectIcon(project.title)}
              </i>
              <ul className={`${style.link__rings}`}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <div className={`${style.link__bookmark}`}></div>
            </Link>
          ))}
        </div>
      )}
      {isHideLinks && <PreloadComponent />}
      <Outlet />
    </div>
  );
};

export default ProjectsPage;
