import React, { useEffect } from "react";
import usePaginator from "../../hooks/paginator";
import { useAppSelector } from "../../hooks/redux";
import { useWindowSize } from "../../hooks/windowResize";
import { builderNeonText } from "../../store/slices/shadow.slice";
import style from "./Home.module.scss";

const HomePage = () => {
  const isNeon = useAppSelector((state) => state.appCommon.neon.value);
  const { aboutMe, skills } = useAppSelector((state) => state.aboutMe);
  const { blueShadow } = useAppSelector((state) => state.appCommon.shadow);
  const shadowLight = useAppSelector((state) => state.appCommon.shadow.stylesShadow.light);

  const { currentData, pages, isCurrentPage, jumpPage, editSumItems } = usePaginator(6, skills);
  const { windowWidth } = useWindowSize();

  const makePathImg = (img: string): string => require(`../../assets/img/skills/${img}.png`);

  const resizePaginator = (width: number) => (width < 640 ? editSumItems(3) : editSumItems(6));

  useEffect(() => {
    resizePaginator(windowWidth);
  }, [windowWidth]);

  return (
    <div className="text-white py-[15px] px-[5px] flex flex-col h-full w-full">
      <h1 className={`${style.title} uppercase text-center text-[35px] md:text-[45px] leading-[40px] py-title py-7`}>
        {aboutMe.title} &nbsp;
        <span
          style={builderNeonText(shadowLight, blueShadow, true, isNeon)}
          className="tracking-[1px] transition-all duration-500"
        >
          {aboutMe.frameWork}
        </span>
      </h1>
      <div className={`flex flex-col md:flex-row flex-[1_1_100%] ${style["about-me"]}`}>
        <div className="flex-[0_1_50%] flex justify-center items-center">
          <div className="w-full lg:max-w-[75%] ml-4">
            <h2 className="py-3 first-letter:uppercase text-xl">{aboutMe.greetings}</h2>
            <h2 className="py-2 first-letter:uppercase text-[14px] md:text-[15px]">{aboutMe.whatIsThis}</h2>
            <div className="flex flex-col ml-3 lg:ml-8">
              {aboutMe.search.map((value, idx) => (
                <div key={idx} className="flex flex-row items-center text-[14px] md:text-base">
                  <h3 className="flex-[0_1_40%]" style={{ color: blueShadow }}>
                    {value.about}
                  </h3>
                  <h3 className="flex-auto">{value.goal}</h3>
                </div>
              ))}
            </div>
            <h2 className="py-4 first-letter:uppercase text-[18px]">{aboutMe.subtitle}</h2>
          </div>
        </div>
        <div className="flex-[0_1_50%] flex flex-col justify-between items-center">
          <h2 className="text-center first-letter:uppercase text-2xl pb-4">навыки</h2>
          <div className="flex-auto flex flex-col flex-nowrap lg:flex-row lg:flex-wrap w-full justify-start pl-2 items-start gap-y-3 lg:gap-y-0">
            {currentData().map((item, idx) => (
              <div key={idx} className="flex flex-row items-center flex-[0_1_50%] md:gap-x-2">
                <div className={`w-[64px] h-[64px] ${style["show-img"]}`}>
                  <img src={makePathImg(item.img)} className="max-w-full max-h-full" alt="item.img" />
                </div>
                <div className="">
                  <h3 className={`text-[15px] first-letter:uppercase ${style["show-title"]}`}>{item.title}</h3>
                  {item.about.map((value: any, index: number) => (
                    <h4 key={index} className={`capitalize text-[13px] ${style["show-text"]}`}>
                      &nbsp; - &nbsp;{value}
                    </h4>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="py-5 lg:py-2 flex flex-row gap-x-1">
            {pages().map((page, idx) => (
              <button
                key={idx}
                onClick={() => jumpPage(idx)}
                className={`border-0 bg-gray-600 w-6 h-6 text-center rounded-full ${
                  isCurrentPage(idx) ? "bg-paginator-select" : ""
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
