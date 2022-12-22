import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import classes from "./ProjectsPage.module.scss";

interface NavItem {
  link: string;
  title: string;
  icon: string;
}

const ProjectsPage: React.FC = () => {
  const isHideLinks = useAppSelector((state) => state.appCommon.projects.isHide);

  const projects: NavItem[] = [
    { link: "todo", title: "todo", icon: "checklist" },
    { link: "shop", title: "shop", icon: "shopping_cart_checkout" },
    { link: "chat", title: "chat", icon: "chat" },
  ];

  const MakeLink = (project: NavItem) => {
    return (
      <Link
        className={`flex flex-col gap-y-8 justify-center items-center
         border-solid border border-white rounded-2xl pl-16 pr-9 py-16 relative 
         hover:-translate-x-[25%] md:hover:-translate-x-0 md:hover:-translate-y-10 ${classes["shadow"]} ${classes["link"]}`}
        to={`/projects/${project.link}`}
      >
        <span className={`text-center uppercase text-2xl relative ${classes["link__title"]}`}>{project.title}</span>
        <i className={`material-icons w-[64px] text-center !text-6xl ${classes["material-icons"]}`}>{project.icon}</i>
        <ul className={`${classes["link__rings"]}`}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div className={`${classes["link__bookmark"]}`}></div>
      </Link>
    );
  };

  return (
    <div className="flex-[1_1_100%] h-full w-full text-white">
      {!isHideLinks && (
        <div
          className={`h-full w-full flex flex-col md:flex-row justify-center items-center gap-y-5 py-4 md:py-0 md:gap-x-10 ${classes["projects-items"]}`}
        >
          {projects.map((project) => (
            <MakeLink icon={project.icon} link={project.link} title={project.title} key={project.link} />
          ))}
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default ProjectsPage;
