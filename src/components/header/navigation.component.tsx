import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { ROUTER_LINKS } from "../../router-links";
import { builderNeonText } from "../../store/slices/shadow.slice";

const NavigationComponent = () => {
  const isNeon = useAppSelector((state) => state.appCommon.neon.value);
  const styleShadowLight = useAppSelector((state) => state.appCommon.shadow.stylesShadow.light);
  const { blueNeon } = useAppSelector((state) => state.appCommon.shadow);

  const styleLink = builderNeonText(styleShadowLight, blueNeon, true, isNeon);

  const links = Object.values(ROUTER_LINKS).map((value) => value);

  return (
    <nav className="h-full w-full">
      <ul className="h-full w-full flex flex-row justify-evenly items-center md:text-xl capitalize z-0">
        {links.map((item) => (
          <li key={item.link} className="transition-all duration-500">
            <NavLink
              to={item.link}
              style={({ isActive }) => (isActive ? styleLink : undefined)}
              className={`transition-all duration-500 tracking-[1px] text-white`}
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationComponent;
