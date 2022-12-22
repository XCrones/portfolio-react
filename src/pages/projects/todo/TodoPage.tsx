import React, { useEffect } from "react";
import InfoProject from "../../../components/aboutProject/AboutProjectComponent";
import ProjectMenuComponent, { IMenuProject } from "../../../components/project-menu/ProjectMenuComponent";
import ModalComponent from "../../../components/todo/ModalComponent";
import PanelComponent from "../../../components/todo/PanelComponent";
import PopupComponent from "../../../components/todo/PopupComponent";
import TableComponent from "../../../components/todo/TableComponent";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setHideHeader } from "../../../store/slices/headerSlice";
import { toggleHideProjects } from "../../../store/slices/projectsSlice";

const TodoPage = () => {
  const dispatch = useAppDispatch();

  const aboutProject = useAppSelector((state) => state.appCommon.aboutProject.todo);
  const isHideinfo = useAppSelector((state) => state.appCommon.aboutProject.isHide);
  const isHideModal = useAppSelector((state) => state.todo.modal.isHide);
  const isHidePopup = useAppSelector((state) => state.todo.popup.isHide);

  const metaMenu: IMenuProject = {
    link: "https://github.com/XCrones/portfolio-Vue3/tree/main/src/views/todo",
    title: "todo",
    color: "#00c3ff",
  };

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
      <ProjectMenuComponent color={metaMenu.color} link={metaMenu.link} title={metaMenu.title} />
      <div className="h-full w-full flex flex-col gap-y-2 lg:gap-y-5 relative">
        <div className="flex-auto">
          <PanelComponent />
        </div>
        <div className="flex-auto h-full w-full">
          <TableComponent />
        </div>
        <div
          className={`absolute top-0 left-0 w-full h-full bg-[#29557979] z-20 transition-all duration-300 ease-[cubic-bezier(0.35, 0, 0.25, 1)] 
          ${isHideModal ? "opacity-0 scale-0" : "opacity-1 scale-1"}`}
        >
          <ModalComponent />
        </div>
        <div
          className={`absolute top-0 left-0 w-full h-full bg-[#29557979] z-20 transition-all duration-300 ease-[cubic-bezier(0.35, 0, 0.25, 1)]
          ${isHidePopup ? "opacity-0 scale-0" : "opacity-1 scale-1"}`}
        >
          <PopupComponent />
        </div>
        <div
          className={`absolute top-0 left-0 w-full h-full bg-[#29557979] z-20 transition-all duration-300 ease-[cubic-bezier(0.35, 0, 0.25, 1)]
          ${isHideinfo ? "opacity-0 scale-0" : "opacity-1 scale-1"}`}
        >
          <InfoProject about={aboutProject} />
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
