import React from "react";
import { useAppSelector } from "../../hooks/redux";
import boxShadow, { IBoxShadow } from "../ui/boxShadow";

export interface MetaLoad {
  color: string;
  style: string;
  hover: boolean;
}

interface LoadProps {
  meta: MetaLoad[];
}

const LoadComponent = (props: LoadProps) => {
  const isNeon = useAppSelector((state) => state.appCommon.neon.value);
  const styleShadowMedium = useAppSelector((state) => state.appCommon.shadow.stylesShadow.medium);

  const animationStartMs = 500;
  const animationPeriod = 200;

  const timeAnimationMs = (idx: number): string => {
    const time = idx + 1 > 1 ? animationPeriod * idx + animationStartMs : animationStartMs;
    return `${time}ms`;
  };

  const defaultSettingNeon = (color: string, isHover: boolean): IBoxShadow => {
    return {
      activeHover: false,
      isNeon: isNeon,
      style: styleShadowMedium,
      color: color,
      isHover: isHover,
    };
  };

  return (
    <div className="h-full w-full relative">
      {props.meta.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: item.color,
            animationDuration: timeAnimationMs(idx),
            ...boxShadow(defaultSettingNeon(item.color, item.hover)),
          }}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-[30px] w-[30px] rounded-full animate-load"
        ></div>
      ))}
    </div>
  );
};

export default LoadComponent;
