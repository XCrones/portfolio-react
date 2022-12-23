import { createSlice } from "@reduxjs/toolkit";

export interface IBoxNeon {
  color: string;
  boxShadow: string;
}

export interface ITextNeon {
  color: string;
  textShadow: string;
}

interface IStateInitial {
  greenNeon: string;
  greenShadow: string;
  redNeon: string;
  redShadow: string;
  blueNeon: string;
  blueShadow: string;

  stylesShadow: {
    light: "light";
    medium: "medium";
    hight: "hight";
  };
}

const initialStateValue: IStateInitial = {
  greenNeon: "#00ff84",
  greenShadow: "#0fa",
  redNeon: "#ff2121",
  redShadow: "#ff3c00",
  blueNeon: "#214aff",
  blueShadow: "#0051ff",

  stylesShadow: {
    light: "light",
    medium: "medium",
    hight: "hight",
  },
};

export const ShadowSlice = createSlice({
  name: "shadow",
  initialState: initialStateValue,
  reducers: {},
});

export default ShadowSlice.reducer;

export const textShadowLight = (color: string): string =>
  `0 0 1px ${color}, 0 0 1px ${color}, 0 0 1px ${color}, 0 0 1px ${color}, 0 0 1px ${color}, 0 0 1px ${color}, 0 0 1px ${color}, 0 0 2px ${color}`;

export const textShadowMedium = (color: string): string =>
  `0 0 2px ${color}, 0 0 2px ${color}, 0 0 2px ${color}, 0 0 2px ${color}, 0 0 2px ${color}, 0 0 2px ${color}, 0 0 2px ${color}, 0 0 6px ${color}`;

export const textShadowHight = (color: string): string =>
  `0 0 2px ${color}, 0 0 4px ${color}, 0 0 4px ${color}, 0 0 4px ${color}, 0 0 4px ${color}, 0 0 4px ${color}, 0 0 4px ${color}, 0 0 8px ${color}`;

export const boxShadowLight = (color: string): string =>
  `0 0 0.1rem ${color}, 0 0 0.1rem ${color}, 0 0 0.8rem ${color}, 0 0 0.1rem ${color}, 0 0 0.1rem ${color}`;

export const boxShadowMedium = (color: string): string =>
  `0 0 0.1rem ${color}, 0 0 0.1rem ${color}, 0 0 1rem ${color}, 0 0 0.1rem ${color}, 0 0 1.4rem ${color}`;

export const boxShadowHight = (color: string): string =>
  `0 0 0.1rem ${color}, 0 0 0.1rem ${color}, 0 0 1rem ${color}, 0 0 0.1rem ${color}, 0 0 1.4rem ${color}`;

export const getBoxNeon = (style: string, color: string): string => {
  switch (style) {
    case initialStateValue.stylesShadow.light:
      return boxShadowLight(color);
    case initialStateValue.stylesShadow.medium:
      return boxShadowMedium(color);
    case initialStateValue.stylesShadow.hight:
      return boxShadowHight(color);
    default:
      return "";
  }
};

export const getTextNeon = (style: string, color: string): string => {
  switch (style) {
    case initialStateValue.stylesShadow.light:
      return textShadowLight(color);
    case initialStateValue.stylesShadow.medium:
      return textShadowMedium(color);
    case initialStateValue.stylesShadow.hight:
      return textShadowHight(color);
    default:
      return "";
  }
};

export const builderNeonBox = (
  styleShadow: string,
  color: string,
  isSetColor: boolean,
  isSetShadow: boolean
): IBoxNeon => {
  return {
    color: isSetColor ? color : "",
    boxShadow: isSetShadow ? getBoxNeon(styleShadow, color) : "",
  };
};

export const builderNeonText = (
  styleShadow: string,
  color: string,
  isSetColor: boolean,
  isSetShadow: boolean
): ITextNeon => {
  return {
    color: isSetColor ? color : "",
    textShadow: isSetShadow ? getTextNeon(styleShadow, color) : "",
  };
};
