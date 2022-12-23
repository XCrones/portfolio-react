import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { resetResponseErr, userSignIn, IUserData } from "../../store/slices/auth.slice";
import { builderNeonText } from "../../store/slices/shadow.slice";
import { ISign } from "./auth.component";

const SignInComponent = ({ closeProfile, isHideClose, toggleForm, input }: ISign) => {
  const dispatch = useAppDispatch();

  const isNeon = useAppSelector((state) => state.appCommon.neon.value);
  const styleShadowMedium = useAppSelector((state) => state.appCommon.shadow.stylesShadow.medium);

  const { error: responseErr, isAuth } = useAppSelector((state) => state.auth);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const isResponse = () => responseErr.length > 0;
  const getError = (field: string) => (errors[field]?.message as string) || "Error!";

  const onSubmit = async (data: any) => {
    if (isValid) {
      const user: IUserData = {
        email: data["email"] || "",
        password: data["password"] || "",
      };
      await dispatch(userSignIn(user));
      if (isAuth) {
        reset();
      }
    }
  };

  return (
    <form className="h-full w-full flex flex-col justify-center gap-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row justify-between items-center gap-x-1">
        <h2 className="capitalize text-xl text-center flex-auto">вход</h2>
        {!isHideClose && (
          <button
            onClick={() => closeProfile()}
            onMouseEnter={(event) => {
              const neonText = builderNeonText(styleShadowMedium, "#fff", true, isNeon);
              event.currentTarget.style.textShadow = neonText.textShadow;
              event.currentTarget.style.color = neonText.color;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.textShadow = "";
            }}
            type="button"
            className="btn-close text-xl transition-all duration-300"
          >
            <i className="bi bi-arrow-right-square"></i>
          </button>
        )}
      </div>
      <div className="flex flex-col gap-y-1">
        <label className="capitalize text-sm">email: </label>
        <input
          onFocus={() => dispatch(resetResponseErr())}
          minLength={input.min}
          {...register("email", {
            required: "обязательное поле",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "email не валидный",
            },
          })}
          type="email"
          className="text-black px-2 py-1 rounded-lg overflow-hidden text-sm"
        />
        {errors?.email && (
          <div className="text-xs text-white text-center first-letter:uppercase">{getError("email")}</div>
        )}
        {isResponse() && <div className="text-xs text-white text-center first-letter:uppercase">{responseErr}</div>}
      </div>
      <div className="flex flex-col gap-y-1">
        <label className="capitalize text-sm">password: </label>
        <input
          minLength={input.min}
          maxLength={input.max}
          {...register("password", {
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
          type="password"
          className="text-black px-2 py-1 rounded-lg overflow-hidden text-sm"
        />
        {errors?.password && (
          <div className="text-xs text-white text-center first-letter:uppercase">{getError("password")}</div>
        )}
      </div>
      <div className="w-full">
        <button
          disabled={!isValid}
          type="submit"
          className={`btn-submit capitalize w-full p-1 transition-all duration-300 
          ${isValid ? "bg-sky-700 hover:bg-sky-500" : "bg-slate-500 cursor-not-allowed"}`}
        >
          отправить
        </button>
      </div>
      <div className="flex flex-row items-center justify-center gap-x-1">
        <span className="first-letter:uppercase">нет аккаунта?</span>
        <button
          onClick={() => toggleForm()}
          type="button"
          className="btn-toggle flex flex-row gap-x-2 hover:text-sky-500 transition-all duration-300"
        >
          <div className="capitalize">регистрация</div>
          <i className="bi bi-arrow-right-square"></i>
        </button>
      </div>
    </form>
  );
};

export default SignInComponent;
