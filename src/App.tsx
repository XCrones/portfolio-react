import React from "react";
import style from "./App.module.scss";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/Home.page";
import ProjectPage from "./pages/projects/Projects.page";
import ContactsPage from "./pages/contacts/Contacts.page";
import TodoPage from "./pages/projects/Todo.page";
import ShopPage from "./pages/projects/Shop.page";
import ChatPage from "./pages/projects/Chat.page";
import HeaderComponent from "./components/header/Header.component";
import FooterComponent from "./components/footer/Footer.component";
import { useAppSelector } from "./hooks/redux";
import { builderNeonBox } from "./store/slices/shadow.slice";
import { ROUTER_LINKS } from "./router-links";

const App = () => {
  const isHeader = useAppSelector((state) => state.header.isHide);
  const shadowLight = useAppSelector((state) => state.appCommon.shadow.stylesShadow.medium);
  const blueNeon = useAppSelector((state) => state.appCommon.shadow.blueNeon);
  const isNeon = useAppSelector((state) => state.appCommon.neon.value);

  return (
    <div className="min-h-screen flex flex-col bg-main-bg relative">
      {!isHeader && (
        <header className="flex-[0_1_80px] h-full flex">
          <div className="min-h-full min-w-full flex-auto">
            <HeaderComponent />
          </div>
        </header>
      )}
      <main
        style={builderNeonBox(shadowLight, blueNeon, false, isNeon)}
        className={`flex-auto m-[10px] rounded-[5px] overflow-hidden transition-all duration-500 flex ${style["main-bg"]}`}
      >
        <div className="min-h-full min-w-full flex-auto">
          <Routes>
            <Route path={ROUTER_LINKS.home.link} element={<HomePage />} />
            <Route path={ROUTER_LINKS.projects.link} element={<ProjectPage />}>
              <Route path={ROUTER_LINKS.projects.children.todo.link} element={<TodoPage />} />
              <Route path={ROUTER_LINKS.projects.children.shop.link} element={<ShopPage />} />
              <Route path={ROUTER_LINKS.projects.children.chat.link} element={<ChatPage />} />
            </Route>
            <Route path={ROUTER_LINKS.contacts.link} element={<ContactsPage />} />
          </Routes>
        </div>
      </main>
      <footer className="flex-[0_1_40px] h-full flex">
        <div className="min-h-full min-w-full flex-auto">
          <FooterComponent />
        </div>
      </footer>
    </div>
  );
};

export default App;
