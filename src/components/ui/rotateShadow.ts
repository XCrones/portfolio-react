import { getTextNeon } from "./../../store/slices/shadowSlice";

export interface IRotateShadow {
  color: string;
  colorShadow: string;
  styleShadow: string;
  isRotate: boolean;
  isNeon: boolean;
  isSetColor: boolean;
  activeHover: boolean;
  isHover: boolean;
}

export interface MakeRotateShadow {
  textShadow: string;
  color: string;
  transform: string;
}

const rotateShadow = ({
  color,
  colorShadow,
  isRotate,
  styleShadow,
  activeHover,
  isHover,
  isNeon,
  isSetColor,
}: IRotateShadow): MakeRotateShadow => {
  const shadowNeon = getTextNeon(styleShadow, colorShadow);

  if (isRotate) {
    return {
      textShadow: isNeon ? shadowNeon : "",
      color: color,
      transform: "rotate(-180deg)",
    };
  } else if (!isRotate && activeHover) {
    return {
      textShadow: isNeon && isHover ? shadowNeon : "",
      color: isSetColor && isHover ? color : "",
      transform: "",
    };
  }

  return {
    textShadow: isNeon ? shadowNeon : "",
    color: isSetColor ? color : "",
    transform: isRotate ? "rotate(-180deg)" : "rotate(0deg)",
  };
};

export default rotateShadow;
