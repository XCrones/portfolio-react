import { createSlice } from "@reduxjs/toolkit";

interface ISearch {
  about: string;
  goal: string;
}

interface IAboutMe {
  title: string;
  frameWork: string;
  greetings: string;
  whatIsThis: string;
  search: ISearch[];
  subtitle: string;
}

interface ISkills {
  about: string[];
  img: string;
}

interface IStateInitial {
  aboutMe: IAboutMe;
  skills: ISkills[];
}

const initialStateValue: IStateInitial = {
  aboutMe: {
    title: "frontend developer",
    frameWork: "react",
    greetings: "привет, меня зовут Сергей, я занимаюсь web разработкой.",
    whatIsThis: "данное портфолио демонстрирует мой уровень компетенции в web разработке.",
    search: [
      { about: "моя цель: ", goal: "поиск работы;" },
      { about: "позиция: ", goal: "frontend developer react;" },
    ],
    subtitle: "буду рад вашим предложениям!",
  },
  skills: [
    {
      img: "html",
      about: ["изучил язык разметки HTML", "применял теги и атрибуты", "научился применять семантику"],
    },
    {
      img: "css",
      about: ["изучил каскадные таблицы стилей CSS", "научился стилизовать элементы", "научился применять flexbox"],
    },
    {
      img: "js",
      about: ["изучил язык javascript", "изучил навигацию по DOM", "применял promise, async/await"],
    },
    {
      img: "ts",
      about: ["изучил язык typescript", "научился использовать interfaces", "применял ООП"],
    },
    {
      img: "react",
      about: ["изучил библиотеку React.js", "применял принцип replace components", "научился использовать hooks"],
    },
    {
      img: "redux",
      about: ["изучил state manager Redux", "научился применять reducers", "применял async thunk"],
    },
    {
      img: "angular",
      about: ["изучил framework Angular", "научился внедрять зависимости", "применял services"],
    },
    {
      img: "tailwind",
      about: [
        "изучил css framework TailwindCss",
        "научился применять Transitions/Animation",
        "применял Responsive Design",
      ],
    },
    {
      img: "webpack",
      about: ["изучил основы Webpack", "научился устанавливать loaders/modules", "применял преобразование SASS/SCSS"],
    },
    {
      img: "firebase",
      about: ["изучил сервис Firebase", "научился внедрять Auth", "применял firestore database"],
    },
    {
      img: "git",
      about: ["изучил основы GIT", "применял push, pull", "применял status, add, commit"],
    },
    {
      img: "bem",
      about: ["изучил основы BEM-naming", "научился применять в вёрстке", "применял именование классов"],
    },
    {
      img: "npm",
      about: ["изучил базовые манипуляции NPM", "научился установке/удалению пакетов", "научился обновлеять пакеты"],
    },
    {
      img: "jquery",
      about: ["изучил основы библиотеки JQuery", "научился применять цепочки методов", "научился создавать анимации"],
    },
    {
      img: "ps",
      about: ["базовое понимание редактора", "нарезка элементов", "горячие клавиши"],
    },
    {
      img: "figma",
      about: ["базовое понимание редактора", "свойства элементов", "экспорт"],
    },
  ],
};

export const AboutMeSlice = createSlice({
  name: "aboutMe",
  initialState: initialStateValue,
  reducers: {},
});

export default AboutMeSlice.reducer;
