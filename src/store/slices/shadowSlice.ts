import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
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

  frameworks: {
    react: "react",
    angular: "angular",
    vue: "vue",
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

export const getColorProject = (framework: string): string => {
  switch (framework) {
    case initialStateValue.frameworks.react:
      return initialStateValue.blueShadow;
    case initialStateValue.frameworks.angular:
      return initialStateValue.redShadow;
    case initialStateValue.frameworks.vue:
      return initialStateValue.greenShadow;
    default:
      return "";
  }
};
