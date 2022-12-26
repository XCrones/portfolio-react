import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userSignOut } from "../../store/slices/auth.slice";
import {
  joinChat,
  outChat,
  profileSignOut,
  pushMessage,
  showCreateChat,
  showJoinChat,
} from "../../store/slices/chat/profile.slice";
import { builderNeonText } from "../../store/slices/shadow.slice";
import MessagesComponent from "./Messages.component";
import style from "./Room.module.scss";

interface ILengthTextArea {
  max: number;
  min: number;
  rows: number;
}

const RoomComponent = () => {
  const dispatch = useAppDispatch();

  const isNeon = useAppSelector((state) => state.appCommon.neon.value);
  const userName = useAppSelector((state) => state.auth.user.userName);
  const shadowLight = useAppSelector((state) => state.appCommon.shadow.stylesShadow.light);

  const {
    chatList,
    currentChat,
    isLoad: { addCreate: isLoadAddCreate, profile: isLoadProfile },
    messages,
  } = useAppSelector((state) => state.chat.profile);

  const textAreaLength: ILengthTextArea = {
    max: 200,
    min: 1,
    rows: 1,
  };

  const isEmptyChatList = chatList.length < 1;
  const isEmptyCurrentChat = !currentChat;

  const [isHideProfile, setHideProfile] = useState(true);

  const {
    reset,
    register,
    handleSubmit,
    formState: { isValid },
    getValues,
  } = useForm({
    mode: "onBlur",
  });

  const toggleProfile = () => setHideProfile(!isHideProfile);

  const makePathImgLoad = (name: string): string => require(`../../assets/img/${name}.svg`);
  const makePathImgIcon = (name: string): string => require(`../../assets/img/chat/${name}.png`);

  const onSubmit = () => {
    if (isValid) {
      const tempMessage: string = getValues()["message"] || "";
      dispatch(pushMessage(tempMessage));
      reset();
    }
  };

  const onSubmitKeyUp = (event: any) => {
    if (event.key === "Enter") {
      if (isValid) {
        const tempMessage: string = getValues()["message"] || "";
        dispatch(pushMessage(tempMessage));
        reset();
      }
    }
  };

  const signOut = async () => {
    await dispatch(profileSignOut());
    await dispatch(userSignOut());
  };

  useEffect(() => {
    const el = document.getElementById("messagesItems");
    if (!!el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (currentChat !== undefined) {
      setHideProfile(true);
    }
  }, [currentChat]);

  return (
    <div className={`h-full flex flex-col ${style.scroll}`}>
      <div className="flex-[0_0_40px] flex flex-row justify-between items-center bg-cyan-800 rounded-tl-lg rounded-tr-lg p-3">
        <div className="relative h-full">
          <button
            onClick={() => toggleProfile()}
            type="button"
            className={`btn-profile min-w-[100px] h-full capitalize py-1 px-2 rounded-t-md bg-sky-700 hover:bg-sky-500 
            transition-all duration-300 ${isHideProfile ? "rounded-b-md" : "bg-sky-600"}`}
          >
            {userName}&nbsp;
            <span className={`inline-block transition-all duration-200 ${!isHideProfile ? "rotate-180" : ""}`}>
              <i className="bi bi-caret-down-fill"></i>
            </span>
          </button>
          <div
            className={`absolute top-full left-0 bg-sky-700 flex flex-col gap-y-1 py-1 z-10 last:rounded-b-lg 
          transition-all duration-100 ease-[cubic-bezier(0.35, 0, 0.25, 1)]
          ${isHideProfile ? "opacity-0 scale-0" : "opacity-1 scale-1"}`}
          >
            <button
              onClick={() => dispatch(showCreateChat())}
              type="button"
              className="btn-create capitalize hover:bg-teal-500 transition-all duration-300 text-left p-1"
            >
              создать
            </button>
            <button
              onClick={() => dispatch(showJoinChat())}
              type="button"
              className="btn-join capitalize hover:bg-teal-500 transition-all duration-300 text-left p-1"
            >
              присоединится
            </button>
            <div className="text-center hover:bg-sky-500 transition-all duration-300">
              <div
                className={`text-center relative flex flex-row gap-x-2 justify-between items-center p-1 ${style.menu}`}
              >
                <div className="capitalize">чаты</div>
                <div className="">
                  <i className="bi bi-caret-right-fill"></i>
                </div>
                {!isEmptyChatList && (
                  <ul
                    className={`absolute top-0 left-full flex flex-col w-full bg-sky-700 capitalize ${style.menu__submenu}`}
                  >
                    {chatList.map((chat, idx) => (
                      <li
                        key={chat}
                        className={`hover:bg-sky-500 flex flex-row justify-between my-1 p-1 ${
                          chat === currentChat ? "'bg-teal-500" : ""
                        }`}
                      >
                        <button
                          disabled={isLoadProfile}
                          onClick={() => dispatch(joinChat(chat))}
                          type="button"
                          className={`btn-join-chat capitalize w-full text-left ${
                            isLoadProfile ? "cursor-not-allowed" : ""
                          }`}
                        >
                          {chat}
                        </button>
                        <div className="flex-[0_1_25%] bg-purple-500 rounded">
                          <button
                            disabled={isLoadProfile}
                            onClick={() => dispatch(outChat(chat))}
                            type="button"
                            className={`btn-out-chat text-red-600 hover:text-red-400 ${
                              isLoadProfile ? "cursor-not-allowed" : ""
                            }`}
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {isEmptyChatList && (
                  <div
                    className={`absolute top-0 left-full w-full whitespace-nowrap bg-sky-700 first-letter:uppercase ${style.menu__submenu}`}
                  >
                    пусто
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => signOut()}
              type="button"
              className="btn-signout capitalize hover:bg-red-500 transition-all duration-300 text-left p-1"
            >
              выйти
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-x-3 items-center justify-center">
          <h3 className="first-letter:uppercase min-w-[50px] text-center">{currentChat}</h3>
          <div className="h-6 w-6">
            <img
              className={`max-h-full max-w-full ${isEmptyCurrentChat ? "grayscale" : ""}`}
              src={makePathImgIcon("icon-room")}
              alt="'chat'"
            />
          </div>
        </div>
      </div>
      <div id="messagesItems" className={`flex-[0_0_365px] overflow-y-auto relative h-full ${style.messages}`}>
        <MessagesComponent />
        {isLoadAddCreate && (
          <div className="z-50 absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="w-32 h-32 z-[2]">
              <img className="max-h-full max-w-full" src={makePathImgLoad("load-chat")} alt="load" />
            </div>
          </div>
        )}
        {isEmptyCurrentChat && (
          <div className="absolute top-0 left-0 w-full h-full bg-[#6964649c] flex justify-center items-center">
            {!isLoadAddCreate && <span className="first-letter:uppercase">чат не выбран</span>}
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-[0_0_64px] flex flex-row gap-x-3 items-center bg-cyan-800 rounded-bl-lg rounded-br-lg overflow-hidden p-2"
      >
        <div className="flex-auto flex w-full">
          <textarea
            onKeyUp={(event) => onSubmitKeyUp(event)}
            disabled={isEmptyCurrentChat}
            rows={textAreaLength.rows}
            minLength={textAreaLength.min}
            maxLength={textAreaLength.max}
            {...register("message", {
              required: true,
              minLength: textAreaLength.min,
              maxLength: textAreaLength.max,
            })}
            className="text-black w-full h-full p-2 rounded-lg resize-none"
          ></textarea>
        </div>
        <button
          disabled={isEmptyCurrentChat}
          onMouseEnter={(event) => {
            const neonText = builderNeonText(shadowLight, "#fff", true, isNeon);
            event.currentTarget.style.textShadow = neonText.textShadow;
            event.currentTarget.style.color = neonText.color;
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.textShadow = "";
          }}
          className={`btn-submit text-2xl transition-all duration-300 ${isEmptyCurrentChat ? "text-slate-400" : ""}`}
          type="submit"
        >
          <i className="bi bi-send-fill"></i>
        </button>
      </form>
    </div>
  );
};

export default RoomComponent;
