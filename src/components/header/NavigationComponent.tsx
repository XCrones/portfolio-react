import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import textShadow, { ITextShadow } from "../ui/textShadow";

interface INavItem {
  link: string;
  title: string;
}

const NavigationComponent = () => {
  const isNeon = useAppSelector((state) => state.appCommon.neon.value);
  const styleShadowLight = useAppSelector((state) => state.appCommon.shadow.stylesShadow.light);
  const { blueNeon, blueShadow } = useAppSelector((state) => state.appCommon.shadow);

  const textNeon: ITextShadow = {
    color: blueNeon,
    colorShadow: blueShadow,
    isNeon: isNeon,
    isSetColor: true,
    styleShadow: styleShadowLight,
    activeHover: false,
    isHover: false,
  };

  const navigation: INavItem[] = [
    {
      link: "/",
      title: "главная",
    },
    {
      link: "/projects",
      title: "проекты",
    },
    {
      link: "/contacts",
      title: "контакты",
    },
  ];

  const MakeLink = (item: INavItem) => {
    return (
      <li className="transition-all duration-500">
        <NavLink
          to={item.link}
          style={({ isActive }) => (isActive ? textShadow(textNeon) : undefined)}
          className={`transition-all duration-500 tracking-[1px]`}
        >
          {item.title}
        </NavLink>
      </li>
    );
  };

  return (
    <nav className="h-full w-full">
      <ul className="h-full w-full flex flex-row justify-evenly items-center md:text-xl capitalize z-0">
        {navigation.map((item) => (
          <MakeLink link={item.link} title={item.title} key={item.link} />
        ))}
      </ul>
    </nav>
  );
};

export default NavigationComponent;
