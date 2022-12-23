import React, { useEffect } from "react";
import ProjectMenuComponent, { IPropsMenuProject } from "../../../components/project-menu/project-menu.component";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setHideHeader } from "../../../store/slices/header.slice";
import { toggleHideProjects } from "../../../store/slices/projects.slice";
import InfoProject from "../../../components/about-project/about-project.component";
import RoomComponent from "../../../components/chat/room.component";
import AuthComponent from "../../../components/auth/auth.component";
import AddCreateComponent, { IPropsAddCreate, ILengthInput } from "../../../components/chat/add-create.component";
import { hideJoinCreate, tryProfile } from "../../../store/slices/chat/profile.slice";
import { tryUser } from "../../../store/slices/auth.slice";
import { URL_GIT_PROJECTS } from "../../../env";
import { ROUTER_LINKS } from "../../../router-links";

const ChatPage = () => {
  const dispatch = useAppDispatch();

  const aboutProject = useAppSelector((state) => state.appCommon.aboutProject.chat);
  const isHideinfo = useAppSelector((state) => state.appCommon.aboutProject.isHide);
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const {
    isLoad: { profile: isLoadProfile },
    isHide: { create: isHideCreate, join: isHideJoin },
    currentChat,
  } = useAppSelector((state) => state.chat.profile);

  const background = `absolute top-0 left-0 w-full h-full transition-all duration-300 ease-[cubic-bezier(0.35, 0, 0.25, 1)]`;

  const metaMenu: IPropsMenuProject = {
    link: URL_GIT_PROJECTS.chat,
    title: ROUTER_LINKS.projects.children.chat.title,
  };

  const input_length: ILengthInput = {
    max: 20,
    min: 4,
  };

  const createChatProps: IPropsAddCreate = {
    name: "создать",
    input: input_length,
    isCreate: true,
  };

  const joinChatProps: IPropsAddCreate = {
    name: "присоединиться",
    input: input_length,
    isCreate: false,
  };

  const searchUser = async () => {
    await dispatch(tryUser());
  };

  const isHideComponent = (isHide: boolean) => (isHide ? "opacity-0 scale-0" : "opacity-1 scale-1");
  const makePathImgLoad = (name: string): string => require(`../../../assets/img/${name}.svg`);

  useEffect(() => {
    if (isAuth) {
      dispatch(tryProfile());
    }
  }, [isAuth]);

  useEffect(() => {
    dispatch(toggleHideProjects(true));
    dispatch(setHideHeader(true));
    searchUser();
    return () => {
      dispatch(toggleHideProjects(false));
      dispatch(setHideHeader(false));
    };
  }, []);

  useEffect(() => {
    if (currentChat !== undefined) {
      dispatch(hideJoinCreate());
    }
  }, [currentChat]);

  return (
    <div className="h-full w-full flex flex-col px-2 pb-3">
      <ProjectMenuComponent link={metaMenu.link} title={metaMenu.title} />
      <div className="flex flex-row items-center justify-center relative gap-x-2 w-full h-full">
        <div className="flex-grow-0 flex-shrink basis-full sm:basis-[70%] lg:basis-[50%] h-full relative">
          <RoomComponent />
          {isLoadProfile && (
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
              <div className="w-32 h-32 z-[2]">
                <img className="max-h-full max-w-full" src={makePathImgLoad("load-chat")} alt="load" />
              </div>
            </div>
          )}
        </div>
        <div className={`bg-[#29557979] z-50 ${background} ${isHideComponent(isHideinfo)}`}>
          <InfoProject about={aboutProject} />
        </div>
        <div className={`z-10 ${background} ${isHideComponent(isAuth)}`}>
          <div className="h-full flex justify-center items-center">
            <div className="flex-grow-0 flex-shrink basis-full sm:basis-[50%] lg:basis-[30%] bg-[#1d3a52c5] rounded-[6px]">
              <AuthComponent isHideBtnCLose={true} closeForm={() => {}} />
            </div>
          </div>
        </div>
        <div className={`z-10 ${background} ${isHideComponent(isHideCreate)}`}>
          <div className="h-full flex justify-center items-center">
            <div className="flex-grow-0 flex-shrink basis-full sm:basis-2/5 bg-[#1d3a52c5] rounded-[6px]">
              {!isHideCreate && (
                <AddCreateComponent
                  input={createChatProps.input}
                  name={createChatProps.name}
                  isCreate={createChatProps.isCreate}
                />
              )}
            </div>
          </div>
        </div>
        <div className={`z-10 ${background} ${isHideComponent(isHideJoin)}`}>
          <div className="h-full flex justify-center items-center">
            <div className="flex-grow-0 flex-shrink basis-full sm:basis-2/5 bg-[#1d3a52c5] rounded-[6px]">
              {!isHideJoin && (
                <AddCreateComponent
                  input={joinChatProps.input}
                  name={joinChatProps.name}
                  isCreate={joinChatProps.isCreate}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
