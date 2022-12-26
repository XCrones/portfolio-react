import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { builderNeonBox } from "../../store/slices/shadow.slice";
import { completeAll, ITasks, setAll } from "../../store/slices/todo/list.slice";
import { IShowModal, showModal } from "../../store/slices/todo/modal.slice";
import style from "./Panel.module.scss";

const PanelComponent = () => {
  const dispatch = useAppDispatch();

  const isNeon = useAppSelector((state) => state.appCommon.neon.value);
  const { list } = useAppSelector((state) => state.todo.list);
  const shadowMedium = useAppSelector((state) => state.appCommon.shadow.stylesShadow.medium);

  const sumTasks = list.length;
  const pctOkTasks = Math.round((100 * list.filter((item: ITasks) => item.status).length) / list.length);
  const sumOkTasks = list.filter((item: ITasks) => item.status).length;
  const pctNokTasks = Math.round((100 * list.filter((item: ITasks) => !item.status).length) / list.length);
  const sumNokTasks = list.filter((item: ITasks) => !item.status).length;

  const colorBlue = "#2284b1";
  const colorRed = "#ec1414";
  const colorGreen = "#15814f";
  const colorPurple = "#800080";

  const createNewTask = (): void => {};

  const deleteAllParams: IShowModal = {
    title: `удалить всё ?`,
    item: {
      id: -1,
      isDeleteAll: true,
    },
  };

  const classesProgress = `flex flex-row justify-between items-center border border-solid 
  border-gray-300 rounded-md px-1 relative overflow-hidden transition-all duretion-200`;

  const classesBtns = `btn-create flex flex-row justify-between items-center h-8 sm:h-10 px-2 
  rounded-lg border border-solid border-gray-400 panel-btn transition-all duretion-200`;

  return (
    <div className="h-full w-full flex flex-col gap-y-2 sm:flex-row sm:gap-x-4 lg:gap-8">
      <div className={`flex-[0_1_50%] flex flex-col gap-y-1 capitalize text-[14px] sm:text-base ${style.progress}`}>
        <div
          onMouseEnter={(event) => {
            const neonText = builderNeonBox(shadowMedium, colorPurple, false, isNeon);
            event.currentTarget.style.boxShadow = neonText.boxShadow;
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.boxShadow = "";
          }}
          className={classesProgress}
        >
          <div
            style={{ width: sumTasks > 0 ? 100 + "%" : 0 + "%", backgroundColor: colorPurple }}
            className="absolute left-0 top-0 h-full z-0 transition-all duration-700"
          ></div>
          <span className="z-10">всего:</span>
          <span className="z-10">{sumTasks}</span>
        </div>
        <div
          onMouseEnter={(event) => {
            const neonText = builderNeonBox(shadowMedium, colorGreen, false, isNeon);
            event.currentTarget.style.boxShadow = neonText.boxShadow;
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.boxShadow = "";
          }}
          className={classesProgress}
        >
          <div
            style={{ width: pctOkTasks > 0 ? pctOkTasks + "%" : 0 + "px", backgroundColor: colorGreen }}
            className="absolute left-0 top-0 h-full z-0 transition-all duration-700"
          ></div>
          <span className="flex-[0_1_25%] z-10">выполнено:</span>
          <span className="flex-auto text-center z-10"> {pctOkTasks > 0 ? pctOkTasks : 0}% </span>
          <span className="flex-[0_1_10%] text-right z-10">{sumOkTasks}</span>
        </div>
        <div
          onMouseEnter={(event) => {
            const neonText = builderNeonBox(shadowMedium, colorRed, false, isNeon);
            event.currentTarget.style.boxShadow = neonText.boxShadow;
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.boxShadow = "";
          }}
          className={classesProgress}
        >
          <div
            style={{ width: pctNokTasks > 0 ? pctNokTasks + "%" : 0 + "px", backgroundColor: colorRed }}
            className="absolute left-0 top-0 h-full z-0 transition-all duration-700"
          ></div>

          <span className="flex-[0_1_25%] z-10">назначено:</span>
          <span className="flex-auto text-center z-10"> {pctNokTasks > 0 ? pctNokTasks : 0}% </span>
          <span className="flex-[0_1_10%] text-right z-10">{sumNokTasks}</span>
        </div>
      </div>
      <div className="flex-[0_1_50%] flex flex-row gap-x-2">
        <div className="flex-[0_1_50%] flex flex-col justify-between gap-y-2">
          <button
            onClick={() => createNewTask()}
            onMouseEnter={(event) => {
              const neonText = builderNeonBox(shadowMedium, colorBlue, false, isNeon);
              event.currentTarget.style.boxShadow = neonText.boxShadow;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.boxShadow = "";
            }}
            style={{ backgroundColor: colorBlue }}
            className={classesBtns}
          >
            <div className="first-letter:uppercase text-xs md:text-base">создать</div>
            <i className="bi bi-plus-square text-sm xl:text-xl"></i>
          </button>
          <button
            onClick={() => dispatch(showModal(deleteAllParams))}
            onMouseEnter={(event) => {
              const neonText = builderNeonBox(shadowMedium, colorRed, false, isNeon);
              event.currentTarget.style.boxShadow = neonText.boxShadow;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.boxShadow = "";
            }}
            style={{ backgroundColor: colorRed }}
            className={classesBtns}
          >
            <div className="first-letter:uppercase text-xs md:text-base">удалить всё</div>
            <i className="bi bi-trash text-sm xl:text-xl"></i>
          </button>
        </div>
        <div className="flex-[0_1_50%] flex flex-col justify-between gap-y-2">
          <button
            onClick={() => dispatch(completeAll())}
            onMouseEnter={(event) => {
              const neonText = builderNeonBox(shadowMedium, colorGreen, false, isNeon);
              event.currentTarget.style.boxShadow = neonText.boxShadow;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.boxShadow = "";
            }}
            style={{ backgroundColor: colorGreen }}
            className={classesBtns}
          >
            <div className="first-letter:uppercase text-xs md:text-base">выполнить всё</div>
            <i className="bi bi-clipboard-check text-sm xl:text-xl"></i>
          </button>
          <button
            onClick={() => dispatch(setAll())}
            onMouseEnter={(event) => {
              const neonText = builderNeonBox(shadowMedium, colorPurple, false, isNeon);
              event.currentTarget.style.boxShadow = neonText.boxShadow;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.boxShadow = "";
            }}
            style={{ backgroundColor: colorPurple }}
            className={classesBtns}
          >
            <div className="first-letter:uppercase text-xs md:text-base">назначить всё</div>
            <i className="bi bi-clipboard2 text-sm xl:text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PanelComponent;
