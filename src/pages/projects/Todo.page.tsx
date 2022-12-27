import React, { useEffect } from "react";
import InfoProject from "../../components/about-project/AboutProject.component";
import ProjectMenuComponent, { IPropsMenuProject } from "../../components/project-menu/ProjectMenu.component";
import ModalComponent from "../../components/todo/Modal.component";
import PanelComponent from "../../components/todo/Panel.component";
import PopupComponent from "../../components/todo/Popup.component";
import TableComponent from "../../components/todo/Table.component";
import { URL_GIT_PROJECTS } from "../../environment";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ROUTER_LINKS } from "../../router-links";
import { setHideHeader } from "../../store/slices/header.slice";
import { toggleHideProjects } from "../../store/slices/projects.slice";

const TodoPage = () => {
  const dispatch = useAppDispatch();

  const aboutProject = useAppSelector((state) => state.appCommon.aboutProject.todo);
  const isHideinfo = useAppSelector((state) => state.appCommon.aboutProject.isHide);
  const isHideModal = useAppSelector((state) => state.todo.modal.isHide);
  const isHidePopup = useAppSelector((state) => state.todo.popup.isHide);

  const metaMenu: IPropsMenuProject = {
    link: URL_GIT_PROJECTS.todo,
    title: ROUTER_LINKS.projects.children.todo.title,
  };

  const background = `absolute top-0 left-0 w-full h-full bg-[#29557979] 
  z-20 transition-all duration-300 ease-[cubic-bezier(0.35, 0, 0.25, 1)]`;

  const isHideComponent = (isHide: boolean) => (isHide ? "opacity-0 scale-0" : "opacity-1 scale-1");

  useEffect(() => {
    dispatch(toggleHideProjects(true));
    dispatch(setHideHeader(true));
    return () => {
      dispatch(toggleHideProjects(false));
      dispatch(setHideHeader(false));
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col px-2 lg:px-9 pb-3">
      <ProjectMenuComponent link={metaMenu.link} title={metaMenu.title} />
      <div className="h-full w-full flex flex-col gap-y-2 lg:gap-y-5 relative">
        <div className="flex-auto">
          <PanelComponent />
        </div>
        <div className="flex-auto h-full w-full">
          <TableComponent />
        </div>
        <div className={`${background} ${isHideComponent(isHideModal)}`}>
          <ModalComponent />
        </div>
        <div className={`${background} ${isHideComponent(isHidePopup)}`}>
          <PopupComponent />
        </div>
        <div className={`${background} ${isHideComponent(isHideinfo)}`}>
          <InfoProject about={aboutProject} />
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
