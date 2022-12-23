import { createSlice } from "@reduxjs/toolkit";
import { IAboutProject } from "../../components/about-project/about-project.component";

interface IStateInitial {
  todo: IAboutProject[];
  shop: IAboutProject[];
  chat: IAboutProject[];
  isHide: boolean;
}

const initialStateValue: IStateInitial = {
  isHide: true,
  todo: [
    {
      nameProject: "список задач",
    },
    {
      title: "стандартный функционал для todo листов",
      subtitle: ["создание", "удаление", "изменение", "статус", "сортировка"],
    },
    {
      title: "валидация форм",
      subtitle: ["react-hook-form", "validator - (max,min)length, require"],
    },
    {
      title: "реализованы приоритеты",
    },
    {
      title: "реализованы категории",
      subtitle: ["добавление(с лимитом 24шт.)"],
    },
    {
      title: "реализованы: пагинация, popup и модальные окна",
    },
    {
      title: "стилизация",
      subtitle: ["tailwindcss"],
    },
    {
      title: "из стороннего",
      subtitle: ["иконки bootstrap", "иконки materialize"],
    },
    {
      title: "что применял",
      subtitle: ["react-hook-form", "redux", "hooks"],
    },
  ],
  shop: [
    {
      nameProject: "fake shop",
    },
    {
      title: "в качестве сервера использовал Firebase",
      subtitle: ["auth-sign (in/up)", "firestore", "listner firestore"],
    },
    {
      title: "основано на Fake Store API",
    },
    {
      title: "валидация форм",
      subtitle: ["react-hook-form", "validator - (max,min)length, require", "email"],
    },
    {
      title: "компоненты магазина",
      subtitle: ["корзина", "аутентификация", "пагинация", "модальные окна", "профиль истории заказов"],
    },
    {
      title: "стилизация",
      subtitle: ["tailwindcss"],
    },
    {
      title: "из стороннего",
      subtitle: ["иконки bootstrap", "иконки materialize"],
    },
    {
      title: "что применял",
      subtitle: ["react-hook-form", "redux", "hooks"],
    },
  ],
  chat: [
    {
      nameProject: "чат",
    },
    {
      title: "в качестве сервера использовал Firebase",
      subtitle: ["auth-sign (in/up)", "firestore", "listner firestore"],
    },
    {
      title: "валидация форм",
      subtitle: ["react-hook-form", "validator - (max,min)length, require"],
    },
    {
      title: "компоненты чата",
      subtitle: ["профиль", "выйти из чата", "создать чат", "присоединится к чату", "удаление сообщений(только своих)"],
    },
    {
      title: "стилизация",
      subtitle: ["tailwindcss"],
    },
    {
      title: "из стороннего",
      subtitle: ["иконки bootstrap"],
    },
    {
      title: "что применял",
      subtitle: ["react-hook-form", "redux", "hooks"],
    },
  ],
};

export const AboutProject = createSlice({
  name: "aboutProject",
  initialState: initialStateValue,
  reducers: {
    toggleHideAboutProject: (state) => {
      state.isHide = !state.isHide;
    },
  },
});

export const { toggleHideAboutProject } = AboutProject.actions;
export default AboutProject.reducer;
