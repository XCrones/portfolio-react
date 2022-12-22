import React, { useEffect } from "react";
import PopupComponent from "../../../components/shop/PopupComponent";
import ProductsComponent from "../../../components/shop/ProductsComponent";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setHideHeader } from "../../../store/slices/headerSlice";
import { toggleHideProjects } from "../../../store/slices/projectsSlice";
import InfoProject from "../../../components/aboutProject/AboutProjectComponent";
import HeaderComponent from "../../../components/shop/Header.component";
import ProjectMenuComponent, { IMenuProject } from "../../../components/project-menu/ProjectMenuComponent";
import { tryUser } from "../../../store/slices/auth.slice";
import { tryProfile } from "../../../store/slices/shop/profile.slice";

const ShopPage = () => {
  const metaMenu: IMenuProject = {
    link: "https://github.com/XCrones/portfolio-Vue3/tree/main/src/views/shop",
    title: "shop",
    color: "#00c3ff",
  };

  const aboutProject = useAppSelector((state) => state.appCommon.aboutProject.shop);
  const isHideinfo = useAppSelector((state) => state.appCommon.aboutProject.isHide);
  const isHidePopup = useAppSelector((state) => state.shop.popup.isHide);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const uid = useAppSelector((state) => state.auth.user.uid);

  const dispatch = useAppDispatch();

  const searchUser = async () => {
    await dispatch(tryUser());
  };

  const searchProfile = async () => {
    await dispatch(tryProfile());
  };

  useEffect(() => {
    searchProfile();
  }, [isAuth, uid]);

  useEffect(() => {
    dispatch(toggleHideProjects(true));
    dispatch(setHideHeader(true));
    searchUser();
    return () => {
      dispatch(toggleHideProjects(false));
      dispatch(setHideHeader(false));
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col px-2 pb-3">
      <ProjectMenuComponent color={metaMenu.color} link={metaMenu.link} title={metaMenu.title} />
      <div className="flex flex-col relative w-full h-full gap-y-5">
        <div className="h-22 md:h-14">
          <HeaderComponent />
        </div>
        <div className="flex-auto h-full w-full">
          <ProductsComponent />
        </div>
        <div
          className={`absolute top-0 left-0 w-full h-full bg-[#29557979] z-50 transition-all duration-300 ease-show-elem 
        ${isHidePopup ? "opacity-0 scale-0" : "opacity-1 scale-1"}`}
        >
          <PopupComponent />
        </div>
        <div
          className={`absolute top-0 left-0 w-full h-full bg-[#29557979] z-50 transition-all duration-300 ease-show-elem 
        ${isHideinfo ? "opacity-0 scale-0" : "opacity-1 scale-1"}`}
        >
          <InfoProject about={aboutProject} />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
