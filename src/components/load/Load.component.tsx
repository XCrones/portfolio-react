import React from "react";
import { useAppSelector } from "../../hooks/redux";
import { builderNeonBox } from "../../store/slices/shadow.slice";

export interface IMetaLoad {
  color: string;
  style: string;
  hover: boolean;
}

interface IPropsLoad {
  meta: IMetaLoad[];
}

const LoadComponent = (props: IPropsLoad) => {
  const isNeon = useAppSelector((state) => state.appCommon.neon.value);
  const shadowMedium = useAppSelector((state) => state.appCommon.shadow.stylesShadow.medium);

  const animationStartMs = 500;
  const animationPeriod = 200;

  const timeAnimationMs = (idx: number): string => {
    const time = idx + 1 > 1 ? animationPeriod * idx + animationStartMs : animationStartMs;
    return `${time}ms`;
  };

  return (
    <div className="h-full w-full relative">
      {props.meta.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: item.color,
            animationDuration: timeAnimationMs(idx),
            ...builderNeonBox(shadowMedium, item.color, false, isNeon),
          }}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-[30px] w-[30px] rounded-full animate-load"
        ></div>
      ))}
    </div>
  );
};

export default LoadComponent;
