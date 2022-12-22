import { getBoxNeon } from "../../store/slices/shadowSlice";

export interface IBoxShadow {
  color: string;
  style: string;
  isNeon: boolean;
  activeHover: boolean;
  isHover: boolean;
}

export interface MakeBoxShadow {
  boxShadow: string;
}

const boxShadow = ({ color, style, isNeon, activeHover, isHover }: IBoxShadow): MakeBoxShadow => {
  const shadowNeon = getBoxNeon(style, color);

  if (activeHover) {
    return {
      boxShadow: isNeon && isHover ? shadowNeon : "",
    };
  }

  return {
    boxShadow: isNeon ? shadowNeon : "",
  };
};

export default boxShadow;
