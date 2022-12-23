import React, { useEffect } from "react";
import usePaginator from "../../hooks/paginator";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userSignOut } from "../../store/slices/auth.slice";
import { builderNeonText } from "../../store/slices/shadow.slice";
import { slicePrice } from "../../store/slices/shop/cart.slice";
import { showProfile } from "../../store/slices/shop/header.slice";
import { profileSignOut, IPurchaseItem } from "../../store/slices/shop/profile.slice";
import { openPurchase } from "../../store/slices/shop/purchase.slice";
import AuthComponent from "../auth/auth.component";
import PurchaseComponent from "./purchase.component";

const ProfileComponent = () => {
  const dispatch = useAppDispatch();

  const isNeon = useAppSelector((state) => state.appCommon.neon.value);
  const shadowLight = useAppSelector((state) => state.appCommon.shadow.stylesShadow.light);
  const { purchases } = useAppSelector((state) => state.shop.profile.profile);
  const { userName } = useAppSelector((state) => state.auth.user);
  const { isAuth } = useAppSelector((state) => state.auth);
  const isLoadData = useAppSelector((state) => state.shop.profile.isLoad.profile);
  const isHidePurchase = useAppSelector((state) => state.shop.purchase.isHide);

  const { currentData, pages, isCurrentPage, jumpPage, editSumItems } = usePaginator(5, purchases);

  const makePathImgLoad = (name: string): string => require(`../../assets/img/${name}.svg`);

  const totalPrice = (item: IPurchaseItem): number => {
    return item.products.reduce(function (sum, current) {
      return sum + current.price * current.count;
    }, 0);
  };

  const closeProfile = () => dispatch(showProfile());

  const resizePaginator = () => {
    const width = window.innerWidth;
    width < 640 ? editSumItems(6) : editSumItems(5);
  };

  const signOut = async () => {
    await dispatch(profileSignOut());
    await dispatch(userSignOut());
  };

  useEffect(() => {
    resizePaginator();
    window.addEventListener("resize", resizePaginator, true);

    return () => {
      window.removeEventListener("resize", resizePaginator, true);
    };
  }, []);

  return (
    <>
      {isHidePurchase && isAuth && (
        <div className="h-[400px] w-full px-2 py-2 flex flex-col justify-between gap-y-3">
          <div className="flex flex-row justify-between items-center">
            <h3 className="capitalize">{userName}</h3>
            <h3 className="capitalize text-lg">профиль</h3>
            <button
              onClick={() => closeProfile()}
              onMouseEnter={(event) => {
                const neonText = builderNeonText(shadowLight, "#fff", true, isNeon);
                event.currentTarget.style.textShadow = neonText.textShadow;
                event.currentTarget.style.color = neonText.color;
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.textShadow = "";
              }}
              className="btn-close text-xl transition-all duration-300"
            >
              <i className="bi bi-arrow-right-square"></i>
            </button>
          </div>
          <div className="flex-[0_1_100%] flex flex-col gap-y-2 relative">
            {purchases.length < 1 && (
              <div className="h-full flex justify-center items-center">
                {!isLoadData && <span className="first-letter:uppercase">нет покупок..</span>}
                {isLoadData && (
                  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <div className="h-24 w-24">
                      <img className="max-h-full max-w-full" src={makePathImgLoad("load")} alt="load" />
                    </div>
                  </div>
                )}
              </div>
            )}
            {currentData().map((item, idx) => (
              <button
                key={idx}
                onClick={() => dispatch(openPurchase(item))}
                className={`btn-purchase flex flex-row justify-between items-center 
              gap-x-3 py-[10px] px-2 bg-white text-black rounded-md text-xs md:text-base`}
              >
                <div className="">{item.date}</div>
                <div className="font-semibold">{slicePrice(totalPrice(item))}</div>
              </button>
            ))}
          </div>
          <div className="flex flex-row justify-center items-center gap-1">
            {pages().map((page, idx) => (
              <button
                key={idx}
                onClick={() => jumpPage(idx)}
                type="button"
                className={`btn-page border-0 bg-gray-600 w-7 h-7 text-center rounded-sm 
              transition-all duration-300 flex justify-center items-center ${
                isCurrentPage(idx) ? "bg-paginator-select" : ""
              }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <div className="w-full text-center">
            <button
              onClick={() => signOut()}
              type="button"
              className={`btn-signout bg-sky-700 w-full h-7 text-white 
            hover:bg-sky-500 rounded-md transition-all duration-300`}
            >
              выйти
            </button>
          </div>
        </div>
      )}
      {!isHidePurchase && isAuth && (
        <div className="w-full h-[400px]">
          <PurchaseComponent />
        </div>
      )}
      {!isAuth && (
        <div className="w-full h-full">
          <AuthComponent isHideBtnCLose={false} closeForm={closeProfile} />
        </div>
      )}
    </>
  );
};

export default ProfileComponent;
