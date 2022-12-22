import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { deleteMessage } from "../../store/slices/chat/profile.slice";

const MessagesComponent = () => {
  const messages = useAppSelector((state) => state.chat.profile.messages);
  const uid = useAppSelector((state) => state.auth.user.uid);
  const currentChat = useAppSelector((state) => state.chat.profile.currentChat);

  const dispatch = useAppDispatch();

  const isEmptyMessages = messages.length < 1;
  const isEmptyCurrentChat = !currentChat;

  const isCurrentUser = (userId: string) => userId === uid;
  const setClasses = (classIsCurrUser: string, classIsAnyUser: string, userId: string) =>
    isCurrentUser(userId) ? classIsCurrUser : classIsAnyUser;

  const makePathImgLoad = (name: string): string => require(`../../assets/img/chat/${name}.png`);

  const parseTime = (value: string): string => {
    if (!!value) {
      let getTime = value.split("T")[1];
      let time = getTime.split(":");
      time.pop();
      return time.join(":");
    }
    return value;
  };

  return (
    <>
      {isEmptyMessages && !isEmptyCurrentChat && (
        <div className="h-full flex justify-center items-center">сообщений нет..</div>
      )}
      {!isEmptyMessages && (
        <div className="messages h-full flex flex-col gap-y-3 p-2 relative">
          {messages.map((message, idx) => (
            <div
              key={message.date}
              className={`messages__item w-full flex last:pb-4 ${setClasses(
                "justify-end",
                "justify-start",
                message.uid
              )}`}
            >
              <div className="flex flex-row gap-x-1 items-end">
                <div className={`h-5 w-5 ${setClasses("order-last", "", message.uid)}`}>
                  <img className="w-full h-full" src={makePathImgLoad("user")} alt="'user'" />
                </div>
                <div
                  className={`flex flex-col gap-x-1 bg-[#2525308c] rounded-tl-3xl rounded-tr-3xl p-2
                  ${setClasses("rounded-bl-3xl", "rounded-br-3xl", message.uid)}`}
                >
                  <div
                    className={`text-sm capitalize ${setClasses(
                      "text-right text-sky-400",
                      "text-left text-orange-400",
                      message.uid
                    )}`}
                  >
                    {message.name}
                  </div>
                  <div className="max-w-[200px] min-w-[80px] break-all text-sm">{message.message}</div>
                  <div
                    className={`w-full flex flex-row px-1 h-4 items-center ${setClasses(
                      "justify-between",
                      "justify-end",
                      message.uid
                    )}`}
                  >
                    <button
                      onClick={() => dispatch(deleteMessage(message))}
                      disabled={!isCurrentUser(message.uid)}
                      type="button"
                      className={`messages__delete text-red-700 hover:text-red-500 transition-all duration-300 
                      ${setClasses("order-last", "hidden", message.uid)}`}
                    >
                      <i className="bi bi-trash2-fill"></i>
                    </button>
                    <div className="messages__date text-xs">{parseTime(message.date)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MessagesComponent;
