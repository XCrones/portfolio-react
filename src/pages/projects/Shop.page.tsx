import React, { useEffect } from "react";
import PopupComponent from "../../components/shop/Popup.component";
import ProductsComponent from "../../components/shop/Products.component";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setHideHeader } from "../../store/slices/header.slice";
import { toggleHideProjects } from "../../store/slices/projects.slice";
import InfoProject from "../../components/about-project/AboutProject.component";
import HeaderComponent from "../../components/shop/Header.component";
import ProjectMenuComponent, { IPropsMenuProject } from "../../components/project-menu/ProjectMenu.component";
import { tryUser } from "../../store/slices/auth.slice";
import { tryProfile } from "../../store/slices/shop/profile.slice";
import { URL_GIT_PROJECTS } from "../../environment";
import { ROUTER_LINKS } from "../../router-links";
import { getAll } from "../../store/slices/shop/products.slice";

const ShopPage = () => {
  const dispatch = useAppDispatch();

  const aboutProject = useAppSelector((state) => state.appCommon.aboutProject.shop);
  const isHideinfo = useAppSelector((state) => state.appCommon.aboutProject.isHide);
  const isHidePopup = useAppSelector((state) => state.shop.popup.isHide);
  const isLoadProducts = useAppSelector((state) => state.shop.products.isLoad);

  const {
    isAuth,
    user: { uid },
  } = useAppSelector((state) => state.auth);

  const metaMenu: IPropsMenuProject = {
    link: URL_GIT_PROJECTS.shop,
    title: ROUTER_LINKS.projects.children.shop.title,
  };

  const background = `absolute top-0 left-0 w-full h-full bg-[#29557979] z-50 transition-all duration-300 ease-show-elem`;
  const isHideComponent = (isHide: boolean) => (isHide ? "opacity-0 scale-0" : "opacity-1 scale-1");

  const fetchProducts = async () => await dispatch(getAll());
  const searchUser = async () => await dispatch(tryUser());
  const searchProfile = async () => await dispatch(tryProfile());

  useEffect(() => {
    fetchProducts();
    searchUser();
    dispatch(toggleHideProjects(true));
    dispatch(setHideHeader(true));
    return () => {
      dispatch(toggleHideProjects(false));
      dispatch(setHideHeader(false));
    };
  }, []);

  useEffect(() => {
    if (!isLoadProducts) {
      searchProfile();
    }
  }, [isAuth, uid, isLoadProducts]);

  return (
    <div className="h-full w-full flex flex-col px-2 pb-3">
      <ProjectMenuComponent link={metaMenu.link} title={metaMenu.title} />
      <div className="flex flex-col relative w-full h-full gap-y-5">
        <div className="h-22 md:h-14">
          <HeaderComponent />
        </div>
        <div className="flex-auto h-full w-full">
          <ProductsComponent />
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

export default ShopPage;
