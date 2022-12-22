import { getTextNeon } from "../../store/slices/shadowSlice";

export interface ITextShadow {
  isNeon: boolean;
  color: string;
  colorShadow: string;
  styleShadow: string;
  isSetColor: boolean;
  activeHover: boolean;
  isHover: boolean;
}

export interface MekaTextShadow {
  color: string;
  textShadow: string;
}

const textShadow = ({
  color,
  colorShadow,
  styleShadow,
  isSetColor,
  isNeon,
  activeHover,
  isHover,
}: ITextShadow): MekaTextShadow => {
  const shadowNeon = getTextNeon(styleShadow, colorShadow);

  if (activeHover) {
    return {
      color: isHover ? color : "",
      textShadow: isNeon && isHover ? shadowNeon : "",
    };
  }

  return {
    color: isSetColor ? color : "",
    textShadow: isNeon ? shadowNeon : "",
  };
};

export default textShadow;
