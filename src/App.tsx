import React from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ProjectPage from "./pages/projects/ProjectsPage";
import ContactsPage from "./pages/contacts/ContactsPage";
import TodoPage from "./pages/projects/todo/TodoPage";
import ShopPage from "./pages/projects/shop/ShopPage";
import ChatPage from "./pages/projects/chat/ChatPage";
import HeaderComponent from "./components/header/HeaderComponent";
import FooterComponent from "./components/footer/FooterComponent";
import { useAppSelector } from "./hooks/redux";
import boxShadow, { IBoxShadow } from "./components/ui/boxShadow";

const App = () => {
  const isHeader = useAppSelector((state) => state.header.isHide);
  const styleShadowMedium = useAppSelector((state) => state.appCommon.shadow.stylesShadow.medium);
  const blueNeon = useAppSelector((state) => state.appCommon.shadow.blueNeon);
  const isNeon = useAppSelector((state) => state.appCommon.neon.value);

  const boxNeon: IBoxShadow = {
    style: styleShadowMedium,
    color: blueNeon,
    isNeon: isNeon,
    activeHover: false,
    isHover: false,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1f2738] relative">
      {!isHeader && (
        <header className="flex-[0_1_80px] h-full flex">
          <div className="min-h-full min-w-full flex-auto">
            <HeaderComponent />
          </div>
        </header>
      )}
      <main
        style={boxShadow(boxNeon)}
        className="flex-auto m-[10px] rounded-[5px] overflow-hidden transition-all duration-500 flex main-bg"
      >
        <div className="min-h-full min-w-full flex-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="projects" element={<ProjectPage />}>
              <Route path="todo" element={<TodoPage />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="chat" element={<ChatPage />} />
            </Route>
            <Route path="contacts" element={<ContactsPage />} />
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
