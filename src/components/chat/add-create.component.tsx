import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearResponse, createChat, hideJoinCreate, joinChat } from "../../store/slices/chat/profile.slice";
import LoadComponent, { IMetaLoad } from "../load/load.component";

export interface IPropsAddCreate {
  name: string;
  input: ILengthInput;
  isCreate: boolean;
}

export interface ILengthInput {
  max: number;
  min: number;
}

const AddCreateComponent = ({ input, name, isCreate }: IPropsAddCreate) => {
  const dispatch = useAppDispatch();

  const styleShadowMedium = useAppSelector((state) => state.appCommon.shadow.stylesShadow.medium);

  const {
    isLoad: { addCreate: isLoadAddCreate },
    response: responseErr,
    currentChat,
  } = useAppSelector((state) => state.chat.profile);

  const load: IMetaLoad[] = [
    { color: "#ff0000", style: styleShadowMedium, hover: false },
    { color: "#008000", style: styleShadowMedium, hover: false },
    { color: "#0000ff", style: styleShadowMedium, hover: false },
  ];

  const isResponse = responseErr.length > 0;
  const isJoinResponse = responseErr.includes("занято");
  const isCreateResponse = responseErr.includes("не существует");

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: "onBlur",
  });

  const getError = (field: string) => (errors[field]?.message as string) || "Error!";

  const create = () => {
    if (isValid) {
      const tempName = getValues().chatName as string;
      dispatch(createChat(tempName));
    }
  };

  const join = () => {
    if (isValid) {
      const tempName = getValues().chatName as string;
      dispatch(joinChat(tempName));
    }
  };

  const onSubmit = () => {
    if (isValid) {
      if (isCreate) {
        create();
      } else {
        join();
      }
    }
  };

  useEffect(() => {
    if (currentChat !== undefined) {
      reset();
    }
  }, [currentChat]);

  return (
    <form className="h-full w-full flex flex-col justify-center gap-y-3 p-2 relative" onSubmit={handleSubmit(onSubmit)}>
      {isLoadAddCreate && (
        <div className="absolute top-0 left-0 h-full w-full bg-[#bdb5b556] overflow-hidden">
          <LoadComponent meta={load} />
        </div>
      )}
      <h2 className="capitalize text-xl text-center w-full">
        <slot name="nameForm"></slot>
      </h2>
      <div className="flex flex-col gap-y-2">
        <label className="first-letter:uppercase text-sm text-center">имя чата:</label>
        <input
          onFocus={() => dispatch(clearResponse())}
          minLength={input.min}
          maxLength={input.max}
          {...register("chatName", {
            required: "обязательное поле",
            minLength: {
              value: input.min,
              message: `Минимум ${input.min} символов`,
            },
            maxLength: {
              value: input.max,
              message: `Максимум ${input.max} символов`,
            },
          })}
          type="text"
          className="text-black px-2 py-1 rounded-lg overflow-hidden text-sm text-center"
        />

        {errors?.chatName && (
          <div className="text-xs text-white text-center first-letter:uppercase">{getError("chatName")}</div>
        )}

        {isResponse && (
          <div className="text-xs text-white text-center first-letter:uppercase">
            {responseErr}.&nbsp;
            {isCreateResponse && (
              <button
                onClick={() => create()}
                type="button"
                className="btn-iscreate capitalize text-orange-500 hover:text-orange-400"
              >
                создать?
              </button>
            )}
            {isJoinResponse && (
              <button
                onClick={() => join()}
                type="button"
                className="btn-isjoin capitalize text-orange-500 hover:text-orange-400"
              >
                присоединится?
              </button>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-row justify-around gap-x-2 items-center">
        <button
          type="submit"
          className="btn-submit flex flex-row gap-x-2 items-center justify-between bg-green-700 py-1 px-2 hover:bg-green-500 rounded-md transition-all duration-300 w-1/2"
        >
          <div className="capitalize text-xs sm:text-sm">
            <span className="inline-block">{name}</span>
          </div>
          <div className="">
            <i className="bi bi-check-square text-sm sm:text-xl"></i>
          </div>
        </button>
        <button
          onClick={() => dispatch(hideJoinCreate())}
          type="button"
          className="btn-cancel flex flex-row gap-x-2 items-center justify-between bg-red-700 hover:bg-red-500 py-1 px-2 rounded-md transition-all duration-300 w-1/2"
        >
          <div className="capitalize text-xs sm:text-sm">отмена</div>
          <div className="">
            <i className="bi bi-x-square text-sm sm:text-xl"></i>
          </div>
        </button>
      </div>
    </form>
  );
};

export default AddCreateComponent;
